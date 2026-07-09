from docx import Document
import os
import sys

# Set output encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Get the docx file from the data folder
data_dir = r"D:\cursor\WhenWeTalkAboutDeath_v1.0\data"
for f in os.listdir(data_dir):
    if f.endswith('.docx'):
        docx_path = os.path.join(data_dir, f)
        print(f"Reading: {f}")
        doc = Document(docx_path)
        for p in doc.paragraphs:
            if p.text.strip():
                print(p.text)
        break
