import requests
import os
import base64
import json
import time

GITHUB_OWNER = "exfair"
REPO_NAME = "tv"

PLAYLIST_SOURCES = {
    "code/24.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/24tv.m3u8",
        "https://tv.ensonhaber.com/tv24/tv24_1080p.m3u8"
    ],
        "code/ahaber.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/ahaber.m3u8",
        "https://trkvz-live.ercdn.net/ahaberhd/ahaberhd_720p.m3u8?st=wpp-E7bUFcQrR-DqLjyCRA&e=1763002436"
    ],
        "code/apara.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/apara.m3u8",
        "https://trkvz-live.ercdn.net/aparahd/aparahd_720p.m3u8?st=C2hn9uH2Hi3DZ0IsHVS5pQ&e=1763003732"
    ],
        "code/aspor.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/spor/aspor.m3u8",
        "https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/aspor/aspor_1080p.m3u8"
    ],
        "code/atv.m3u8": [
        "https://atv.m3u8",
        "https://trkvz.daioncdn.net/atv/atv_1080p.m3u8?e=1763003853&st=GtY3GQAqyOuhDqHBwAzwSQ&sid=7wq3vas722ps&app=d1ce2d40-5256-4550-b02e-e73c185a314e&ce=3"
    ],
    "code/beinsportshaber.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/spor/bein-sports-haber.m3u8",
        "https://cdn501.canlitv.me/beinsporthaber.m3u8?tkn=XoIWYU_sxNSWSk59-RxnmA&tms=1762971721&hst=www.canlitv.me&ip=95.70.214.132&utkn=26f9e3e90d42f2c2d7045eb19bec7d6c"
    ],
    "code/bloomberght.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/bloomberght.m3u8",
        "https://ciner.daioncdn.net/bloomberght/bloomberght_720p.m3u8"
    ],
    "code/ciftci.m3u8": [
        "https://raw.githubusercontent.com/tecotv2025/tecotv/refs/heads/main/playlist/Ciftci_Tv.m3u8",
        "https://live.artidijitalmedya.com/artidijital_ciftcitv/ciftcitv/chunks.m3u8"
    ],
    "code/cnnturk.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/cnnturk.m3u8",
        "https://live.duhnet.tv//S2/HLS_LIVE/cnnturknp/track_4_1000/playlist.m3u8?&live=true&app=com.cnnturk&st=Xk_Gos9DU76M9i97-LWUgw&e=1762970250"
    ],
    "code/diyanet.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/dini/diyanet-tv.m3u8",
        "https://eustr73.mediatriple.net/videoonlylive/mtikoimxnztxlive/broadcast_5e3bf95a47e07.smil/mt_0.m3u8"
    ],
    "code/dmax.m3u8": [
        "https://dmax.m3u8",
        "https://dogus.daioncdn.net/dmax/dmax_720p.m3u8?token=NlNaQ1pzNEp1eWtwaUk4QmhySEtaVHVUQ0JFNEZVZDhwQVR6VURDVDVLQT0=&sid=7wq56gj3rwyu&app=5a02c599-d17e-4982-9b04-090934d51af7&ce=3"
    ],
    "code/ekol.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/ekol-tv.m3u8",
        "https://ekoltv-live.ercdn.net/ekoltv/ekoltv_1080p.m3u8"
    ],
    "code/haberglobal.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/haberglobal.m3u8",
        "https://ensonhaber-live.ercdn.net/haberglobal/haberglobal_720p.m3u8"
    ],
    "code/haberturk.m3u8": [
        "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/haber/haberturk.m3u8",
        "https://ciner.daioncdn.net/haberturktv/haberturktv_1080p.m3u8?sid=7wjuloyl5m6u&app=c98ab0b0-50cc-495b-bb37-778e91f5ff5b&ce=2"
    ]
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
            return line
    return None

def build_variant_playlist(stream_links):
    """Creates a variant M3U8 playlist from a list of stream links."""
    content = "#EXTM3U\n"
    bandwidth = 8000000
    
    for i, link in enumerate(stream_links):
        name = "Primary" if i == 0 else f"Backup_{i+1}"
        content += f'#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},NAME="{name}"\n'
        content += f"{link}\n"
        bandwidth = max(500000, bandwidth - 2000000)
        
    return content

def get_file_sha(file_path):
    """Gets the current SHA of a file on GitHub."""
    url = API_BASE_URL + file_path
    try:
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 404:
            return None
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
        "message": f"Auto Update: {file_path}",
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

    for output_file_path, source_urls in PLAYLIST_SOURCES.items():
        print(f"Processing: {output_file_path}...")
        extracted_links = [] 
        
        for source_url in source_urls:
            print(f"  > Processing source: {source_url}")
            
            if "raw.githubusercontent.com" in source_url:
                print("    -> GitHub master file detected. Parsing for stream link...")
                m3u8_content = fetch_new_content_from_source(source_url)
                stream_link = extract_stream_link(m3u8_content)
            else:
                
                print("    -> Direct backup link detected. Using URL as-is.")
                stream_link = source_url
            
            if stream_link:
                extracted_links.append(stream_link)
            else:
                print(f"  > Warning: Could not get a valid link from {source_url}.")
        
        if extracted_links:
            final_m3u8_content = build_variant_playlist(extracted_links)
            print(f"  > Creating {output_file_path} with {len(extracted_links)} stream(s).")

            update_github_file(output_file_path, final_m3u8_content)
        else:
            print(f"  > Skipped: No valid links found for {output_file_path}.")
            
        time.sleep(1)

if __name__ == "__main__":
    main()
