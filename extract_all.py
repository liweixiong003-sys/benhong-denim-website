import fitz
import os

pdf_path = r"C:\Users\26645\Desktop\胡思乱想☁\奔鸿公司简介 中英文版本 2025.7.5.pdf"
out_dir = r"C:\Users\26645\Desktop\胡思乱想☁\benhong-denim-website\assets_temp"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for page_num in [1, 3, 4]:
    page = doc[page_num]
    images = page.get_images(full=True)
    images.sort(key=lambda x: x[2] * x[3], reverse=True)
    for i, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        with open(os.path.join(out_dir, f"p{page_num}_img{i}.jpg"), "wb") as f:
            f.write(image_bytes)
        print(f"p{page_num}_img{i}.jpg: {len(image_bytes)} bytes, {img[2]}x{img[3]}")

doc.close()
