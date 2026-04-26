import fitz
import os

pdf_path = r"C:\Users\26645\Desktop\胡思乱想☁\奔鸿公司简介 中英文版本 2025.7.5.pdf"
doc = fitz.open(pdf_path)

all_images = []
for page_num in range(len(doc)):
    page = doc[page_num]
    images = page.get_images(full=True)
    for i, img in enumerate(images):
        all_images.append({
            "page": page_num,
            "index": i,
            "width": img[2],
            "height": img[3],
            "area": img[2] * img[3],
            "xref": img[0]
        })

all_images.sort(key=lambda x: x["area"], reverse=True)
for img in all_images[:15]:
    print(f"Page {img['page']}, {img['width']}x{img['height']}")
doc.close()
