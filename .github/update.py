import requests
import os
import base64
import json
import time

GITHUB_OWNER = "exfair"
REPO_NAME = "tv" # (veya tv-streams, reponuzun adı neyse o)

# --- YENİ YAPI (Sözlük) ---
# Anahtar (key): Oluşturulacak son dosya adı (formatlanmış)
# Değer (value): Kaynak linklerin listesi (1. ana, 2. yedek)
PLAYLIST_SOURCES = {
    "code/ahaber.m3u8": [
        "https://raw.githubusercontent.com/tecotv2025/tecotv/refs/heads/main/playlist/A_haber.m3u8",
        "https://trkvz-live.ercdn.net/ahaberhd/ahaberhd_720p.m3u8?st=wpp-E7bUFcQrR-DqLjyCRA&e=1763002436"
    ],
    "code/aspor.m3u8": [
        "https://raw.githubusercontent.com/tecotv2025/tecotv/refs/heads/main/playlist/A_Spor.m3u8",
        "https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/aspor/aspor_1080p.m3u8"
    ],
    "code/beinsportshaber.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/spor/bein-sports-haber.m3u8",
        "https://cdn501.canlitv.me/beinsporthaber.m3u8?tkn=XoIWYU_sxNSWSk59-RxnmA&tms=1762971721&hst=www.canlitv.me&ip=95.70.214.132&utkn=26f9e3e90d42f2c2d7045eb19bec7d6c"
    ]
    # Diğer kanalları da bu formatta ekleyebilirsiniz
}

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
API_BASE_URL = f"https://api.github.com/repos/{GITHUB_OWNER}/{REPO_NAME}/contents/"
HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json",
}

def fetch_new_content_from_source(source_url):
    """Fetches M3U8 content from a source URL."""
    try:
        response = requests.get(source_url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error: Could not fetch source URL ({source_url}): {e}")
        return None

def extract_stream_link(m3u8_content):
    """Extracts the actual stream link (first non-# line) from M3U8 content."""
    if not m3u8_content:
        return None
    for line in m3u8_content.splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            return line # Return the first valid link found
    return None

def build_variant_playlist(stream_links):
    """Creates a variant M3U8 playlist from a list of stream links."""
    content = "#EXTM3U\n"
    bandwidth = 8000000 # 8Mbps (Primary)
    
    for i, link in enumerate(stream_links):
        name = "Primary" if i == 0 else f"Backup_{i+1}"
        content += f'#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},NAME="{name}"\n'
        content += f"{link}\n"
        bandwidth = max(500000, bandwidth - 2000000) # Lower bandwidth for backups
        
    return content

def get_file_sha(file_path):
    """Gets the current SHA of a file on GitHub."""
    url = API_BASE_URL + file_path
    try:
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 404:
            return None # File doesn't exist
        response.raise_for_status()
        return response.json()["sha"]
    except requests.RequestException:
        return None

def update_github_file(file_path, new_content):
    """Updates or creates a file on GitHub."""
    current_sha = get_file_sha(file_path)
    content_bytes = new_content.encode("utf-8")
    content_base64 = base64.b64encode(content_bytes).decode("utf-8")
    
    url = API_BASE_URL + file_path
    data = {
        "message": f"auto update: {file_path}", # English commit message
        "content": content_base64,
        "committer": {"name": "GitHub Actions Bot", "email": "actions@github.com"}
    }
    
    if current_sha:
        data["sha"] = current_sha

    try:
        response = requests.put(url, headers=HEADERS, data=json.dumps(data))
        response.raise_for_status()
        print(f"Success: {file_path} was updated.")
    except requests.RequestException as e:
        print(f"Error: Could not update {file_path}: {e.text}")

def main():
    if not GITHUB_TOKEN:
        print("Error: GITHUB_TOKEN not found. Check your workflow secrets.")
        return

    # Loop through the dictionary
    for output_file_path, source_urls in PLAYLIST_SOURCES.items():
        print(f"Processing: {output_file_path}...")
        extracted_links = [] # To hold the final stream links
        
        # Loop through all sources for this channel (Primary, Backup, etc.)
        for source_url in source_urls:
            print(f"  > Processing source: {source_url}")
            
            # --- YENİ MANTIK BURADA ---
            # Eğer link bir 'raw.githubusercontent' linki ise (yani bizim YouTube M3U8'imiz ise)
            # içeriğini çek ve içindeki linki ayıkla.
            if "raw.githubusercontent.com" in source_url:
                print("    -> GitHub master file detected. Parsing for stream link...")
                m3u8_content = fetch_new_content_from_source(source_url)
                stream_link = extract_stream_link(m3u8_content)
            else:
                # Eğer link 'raw.githubusercontent' DEĞİLSE (örn: trkvz-live... linki)
                # bu linkin KENDİSİNİ doğrudan yedek link olarak kullan.
                print("    -> Direct backup link detected. Using URL as-is.")
                stream_link = source_url
            # --- YENİ MANTIK SONU ---
            
            if stream_link:
                extracted_links.append(stream_link)
            else:
                print(f"  > Warning: Could not get a valid link from {source_url}.")
        
        # 3. Build a new M3U8 file with all extracted links
        if extracted_links:
            final_m3u8_content = build_variant_playlist(extracted_links)
            print(f"  > Creating {output_file_path} with {len(extracted_links)} stream(s).")
            # 4. Write the new file to GitHub
            update_github_file(output_file_path, final_m3u8_content)
        else:
            print(f"  > Skipped: No valid links found for {output_file_path}.")
            
        time.sleep(1) # Be nice to the API

if __name__ == "__main__":
    main()
