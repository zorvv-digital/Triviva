import os
from PIL import Image, ImageDraw, ImageFont

def create_favicon():
    # 512x512 image, dark background
    size = 512
    img = Image.new('RGB', (size, size), color='#111827')
    d = ImageDraw.Draw(img)
    
    # Try to load a nice font, or fallback to default
    try:
        # Windows standard font for a nice bold serif/sans-serif V
        font = ImageFont.truetype("arialbd.ttf", 350)
    except IOError:
        font = ImageFont.load_default()

    # The text we want
    text = "V"
    
    # Get bounding box to center it
    bbox = d.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    
    # Draw the text in white
    x = (size - w) / 2
    y = ((size - h) / 2) - 40 # slightly adjust upwards to visually center
    
    d.text((x, y), text, fill=(255, 255, 255), font=font)
    
    # Save it to the public directory
    public_dir = os.path.join(os.path.dirname(__file__), 'public')
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
        
    img.save(os.path.join(public_dir, 'favicon.ico'))
    img.save(os.path.join(public_dir, 'favicon.png'))
    print("Favicon created successfully.")

if __name__ == "__main__":
    create_favicon()
