import os
import re
from bs4 import BeautifulSoup

TEMP_DIR = "/home/irfanmahir/My Web Sites/temp_cheatsheets"
DB_FILE = "/home/irfanmahir/My Web Sites/content/db/cheatsheets.md"

def get_meta(slug):
    path = os.path.join(TEMP_DIR, f"{slug}.html")
    if not os.path.exists(path): return None, None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
        main_content = soup.find('div', class_='prose')
        if not main_content: return None, None
        bq = main_content.find('blockquote')
        desc = bq.get_text(strip=True) if bq else ""
        category = ""
        category_strong = main_content.find('strong', string=re.compile(r'Category:'))
        if category_strong:
            cat_span = category_strong.find_next('span')
            if cat_span: category = cat_span.get_text(strip=True)
        return desc, category
    except: return None, None

def main():
    if not os.path.exists(DB_FILE): return
    with open(DB_FILE, 'r', encoding='utf-8') as f: lines = f.readlines()
    new_lines = []
    for line in lines:
        match = re.search(r'- \[(.*?)\]\(cheatsheet\.html\?c=(.*?)\)', line)
        if match:
            name, slug = match.groups()
            desc, cat = get_meta(slug)
            if desc:
                desc = desc.replace('\n', ' ').strip()
                # Check if it already has a description
                if ' - ' in line:
                    base = line.split(' - ')[0]
                    new_lines.append(f"{base} - {desc}\n")
                else:
                    new_lines.append(f"- [{name}](cheatsheet.html?c={slug}) - {desc}\n")
            else: new_lines.append(line)
        else: new_lines.append(line)
    with open(DB_FILE, 'w', encoding='utf-8') as f: f.writelines(new_lines)
    print("Enriched cheatsheets.md.")

if __name__ == "__main__": main()
