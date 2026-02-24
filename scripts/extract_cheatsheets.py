import os
import re
from bs4 import BeautifulSoup

TEMP_DIR = "/home/irfanmahir/My Web Sites/temp_cheatsheets"
OUTPUT_DIR = "/home/irfanmahir/My Web Sites/content/cheatsheets"

def html_to_md_table(table):
    rows = []
    for tr in table.find_all('tr'):
        cells = tr.find_all(['th', 'td'])
        if not cells: continue
        
        row_data = []
        for cell in cells:
            codes = cell.find_all('code')
            if codes:
                texts = []
                for child in cell.children:
                    if hasattr(child, 'name') and child.name == 'code':
                        texts.append(f"`{child.get_text(strip=True)}`")
                    else:
                        t = child.get_text(strip=True)
                        if t: texts.append(t)
                row_data.append(' '.join(texts).replace('|', '\\|'))
            else:
                row_data.append(cell.get_text(strip=True).replace('|', '\\|'))
        
        rows.append('| ' + ' | '.join(row_data) + ' |')
    
    if not rows: return ""
    
    headers = rows[0]
    num_cols = headers.count('|') - 1
    separator = '| ' + ' | '.join(['---'] * num_cols) + ' |'
    
    if len(rows) > 1:
        rows.insert(1, separator)
    else:
        rows.append(separator)
        rows.append('| ' + ' | '.join([' '] * num_cols) + ' |')
    
    return '\n'.join(rows)

def extract_content(html_path):
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
        
        main_content = soup.find('div', class_='prose')
        if not main_content: return None

        h1s = main_content.find_all('h1')
        title = "Unknown"
        for h in h1s:
            if h.get_text(strip=True) != '0x3d.site':
                title = h.get_text(strip=True)
                break
        title = re.sub(r'\{.*?\}', '', title).strip()
        
        bq = main_content.find('blockquote')
        description = bq.get_text(strip=True) if bq else ""
        
        category_strong = main_content.find('strong', string=re.compile(r'Category:'))
        category = ""
        if category_strong:
            cat_span = category_strong.find_next('span')
            if cat_span: category = cat_span.get_text(strip=True)
            
        md_content = f"# {title}\n\n"
        if description: md_content += f"> {description}\n\n"
        if category: md_content += f"Category: {category}\n\n"
            
        for node in main_content.find_all(['h2', 'h3', 'h4', 'p', 'table', 'ul', 'pre']):
            if node.name == 'h1' or node.get_text(strip=True) == '0x3d.site': continue
            if node == bq: continue
            
            if node.name in ['h2', 'h3', 'h4']:
                level = '#' * int(node.name[1])
                header_text = re.sub(r'\{.*?\}', '', node.get_text(strip=True)).strip()
                md_content += f"{level} {header_text}\n\n"
            elif node.name == 'table':
                md_content += html_to_md_table(node) + "\n\n"
            elif node.name == 'pre':
                code_text = node.get_text()
                code_tag = node.find('code')
                lang = ""
                if code_tag and code_tag.has_attr('class'):
                    for c in code_tag['class']:
                        if c.startswith('language-'):
                            lang = c.replace('language-', '')
                            break
                md_content += f"```{lang}\n{code_text}\n```\n\n"
            elif node.name == 'p':
                text = node.get_text(strip=True)
                if 'Category:' in text: continue
                if 'is designed for aggregating information' in text: continue
                md_content += text + "\n\n"
            elif node.name == 'ul':
                for li in node.find_all('li'):
                    md_content += f"- {li.get_text(strip=True)}\n"
                md_content += "\n"
                
        return md_content
    except Exception as e:
        print(f"Error processing {html_path}: {e}")
        return None

def main():
    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)
    count = 0
    for filename in os.listdir(TEMP_DIR):
        if filename.endswith('.html') and filename not in ['cheatsheets_archive.html']:
            path = os.path.join(TEMP_DIR, filename)
            md_path = os.path.join(OUTPUT_DIR, filename.replace('.html', '.md'))
            # Only extract if MD doesn't exist or we want to overwrite
            md = extract_content(path)
            if md:
                with open(md_path, 'w', encoding='utf-8') as f: f.write(md)
                count += 1
    print(f"Extracted {count} cheatsheets.")

if __name__ == "__main__":
    main()
