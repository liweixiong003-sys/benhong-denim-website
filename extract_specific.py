import fitz
import os

pdf_path = r"C:\Users\26645\Desktop\胡思乱想☁\奔鸿公司简介 中英文版本 2025.7.5.pdf"
out_dir = r"C:\Users\26645\Desktop\胡思乱想☁\benhong-denim-website\assets"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Mapping page number (0-indexed) to output filename
# Page 4 is index 3 (Ganzhou)
# Page 2 is index 1 (Foshan)
# Page 5 is index 4 (Changxu)
# Page 3 is index 2 (Showroom)
# Page 13 is index 12 (Map)

pages_to_extract = {
    3: "factory_ganzhou.jpg",
    1: "factory_foshan.jpg",
    4: "factory_changxu.jpg",
    2: "showroom.jpg",
    12: "world_map.jpg"
}

for page_num, out_name in pages_to_extract.items():
    page = doc[page_num]
    images = page.get_images(full=True)
    if images:
        # Get the largest image on the page
        images.sort(key=lambda x: x[2] * x[3], reverse=True) # Sort by width * height
        xref = images[0][0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        with open(os.path.join(out_dir, out_name), "wb") as f:
            f.write(image_bytes)
        print(f"Saved {out_name}")
    else:
        print(f"No image found on page {page_num + 1}")

doc.close()
