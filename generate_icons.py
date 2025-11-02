from PIL import Image, ImageDraw, ImageFont
import os

def create_chess_icon(size):
    # Sötét háttér
    img = Image.new('RGB', (size, size), color='#1a1a2e')
    draw = ImageDraw.Draw(img)
    
    # Sakktábla rajzolása
    square_size = size // 8
    colors = ['#f0d9b5', '#b58863']
    
    for row in range(8):
        for col in range(8):
            color = colors[(row + col) % 2]
            x = col * square_size
            y = row * square_size
            draw.rectangle([x, y, x + square_size, y + square_size], fill=color)
    
    # Keret
    border = max(2, size // 100)
    draw.rectangle([0, 0, size-1, size-1], outline='#0f3460', width=border)
    
    # Király szimbólum középen
    try:
        font_size = size // 2
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    text = "♔"
    
    # Szöveg pozíció (középre)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]
    
    # Árnyék
    draw.text((x+2, y+2), text, font=font, fill='#000000')
    # Fő szöveg
    draw.text((x, y), text, font=font, fill='#ffffff')
    
    return img

# Ikonok generálása
icon_192 = create_chess_icon(192)
icon_192.save('icon-192.png')

icon_512 = create_chess_icon(512)
icon_512.save('icon-512.png')

print("Ikonok generálva!")
