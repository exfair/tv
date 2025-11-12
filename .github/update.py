import requests
import os
import base64
import json
import time

GITHUB_OWNER = "exfair"

REPO_NAME = "tv"

PLAYLIST_SOURCES = [

    "https://raw.githubusercontent.com/tecotv2025/tecotv/refs/heads/main/playlist/A_haber.m3u8",
    "https://raw.githubusercontent.com/tecotv2025/tecotv/refs/heads/main/playlist/A_Spor.m3u8",
    "https://raw.githubusercontent.com/UzunMuhalefet/yt-streams/refs/heads/main/TR/spor/bein-sports-haber.m3u8"
]

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")

API_BASE_URL = f"https://api.github.com/repos/{GITHUB_OWNER}/{REPO_NAME}/contents/"

HEADERS = {

    "Authorization": f"token {GITHUB_TOKEN}",

    "Accept": "application/vnd.github.v3+json",

}



def fetch_new_content_from_source(source_url):

    try:

        response = requests.get(source_url, timeout=10)

        response.raise_for_status()

        return response.text

    except requests.RequestException as e:

        print(f"Hata: Kaynak URL ({source_url}) çekilemedi: {e}")

        return None



def get_file_sha(file_path):

    url = API_BASE_URL + file_path

    try:

        response = requests.get(url, headers=HEADERS)

        if response.status_code == 404:

            print(f"Bilgi: {file_path} dosyası repoda bulunamadı. Yeni dosya olarak oluşturulacak.")

            return None

        response.raise_for_status()

        return response.json()["sha"]

    except requests.RequestException as e:

        print(f"Hata: Dosya SHA bilgisi alınamadı {file_path}: {e}")

        return None



def update_github_file(file_path, new_content):

    current_sha = get_file_sha(file_path)

    content_bytes = new_content.encode("utf-8")

    content_base64 = base64.b64encode(content_bytes).decode("utf-8")

    

    url = API_BASE_URL + file_path

    data = {

        "message": f"Otomatik güncelleme: {file_path}",

        "content": content_base64,

        "committer": {"name": "GitHub Actions Bot", "email": "actions@github.com"}

    }

    

    if current_sha:

        data["sha"] = current_sha



    try:

        response = requests.put(url, headers=HEADERS, data=json.dumps(data))

        response.raise_for_status()

        print(f"Başarılı: {file_path} güncellendi.")

    except requests.RequestException as e:

        print(f"Hata: {file_path} güncellenemedi: {e.text}")



def main():

    if not GITHUB_TOKEN:

        print("Hata: GITHUB_TOKEN bulunamadı. Workflow ayarlarınızı kontrol edin.")

        return



    for source_url in PLAYLIST_SOURCES:

        try:

            original_filename = os.path.basename(source_url)

            

            formatted_filename = original_filename.lower().replace("_", "").replace("-", "")

            

            new_file_path = f"code/{formatted_filename}"

            

            print(f"İşleniyor: {source_url} -> {new_file_path}...")

            

            new_content = fetch_new_content_from_source(source_url)

            

            if new_content:

                update_github_file(new_file_path, new_content)

            else:

                print(f"Atlandı: {source_url} adresinden içerik alınamadı.")

        

        except Exception as e:

            print(f"Hata: {source_url} işlenirken bir sorun oluştu: {e}")



        time.sleep(1)



if __name__ == "__main__":

    main()
