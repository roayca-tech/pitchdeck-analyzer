import zipfile
import xml.etree.ElementTree as ET
import sys

path = r'C:\Users\roayc\OneDrive - merxcorp.com\Documents\GitHub\pitchdeck-analyzer\pitchdeck-analyzer\docs\PDF export Guideline.docx'
try:
    z = zipfile.ZipFile(path)
    xml_content = z.read('word/document.xml')
    root = ET.fromstring(xml_content)
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

    paragraphs = []
    for p in root.iter(f'{{{ns["w"]}}}p'):
        texts = [node.text for node in p.iter(f'{{{ns["w"]}}}t') if node.text]
        if texts:
            paragraphs.append(''.join(texts))

    with open('raw_pdf_guideline.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(paragraphs))
    print("Success")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
