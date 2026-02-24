import os
import re
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

BASE_ARCHIVE_URL = "https://web.archive.org"
INDEX_FILE = "/home/irfanmahir/My Web Sites/temp_cheatsheets/cheatsheets_archive.html"
TEMP_DIR = "/home/irfanmahir/My Web Sites/temp_cheatsheets"

import time

def download_page(name, url):
    print(f"Downloading {name} from {url}...")
    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=30)
            if response.status_code == 200:
                file_path = os.path.join(TEMP_DIR, f"{name}.html")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(response.text)
                time.sleep(3) # Be very gentle
                return True
            elif response.status_code == 429:
                wait = (attempt + 1) * 10
                print(f"Rate limited for {name}, waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"Failed {name} with status {response.status_code}")
        except Exception as e:
            wait = (attempt + 1) * 5
            print(f"Error downloading {name} (attempt {attempt+1}): {e}. Waiting {wait}s...")
            time.sleep(wait)
    return False

def main():
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, "html.parser")
    links = []
    
    # Looking for links like /web/20250905065019/https://0x3d.site/cheatsheets/1password
    for a in soup.find_all("a", href=re.compile(r"/web/.*/https://0x3d\.site/cheatsheets/")):
        href = a["href"]
        name = href.split("/")[-1]
        
        # Skip if already downloaded
        if os.path.exists(os.path.join(TEMP_DIR, f"{name}.html")):
            continue
            
        full_url = BASE_ARCHIVE_URL + href
        links.append((name, full_url))

    print(f"Found {len(links)} new cheatsheet links.")

    with ThreadPoolExecutor(max_workers=1) as executor:
        results = list(executor.map(lambda p: download_page(*p), links))

    print(f"Successful downloads: {sum(results)}/{len(links)}")

if __name__ == "__main__":
    main()
