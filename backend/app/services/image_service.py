import os
import base64
from PIL import Image
import io

# Assets dizini
ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "assets")
JCI_LOGO_PATH = os.path.join(ASSETS_DIR, "jci_logo.png")
LOSEV_LOGO_PATH = os.path.join(ASSETS_DIR, "losev_logo.jpg")


def add_logos_to_image(image_bytes: bytes) -> str:
    """
    Görsele JCI (sol alt) ve LÖSEV (sağ alt) logolarını ekler.
    Base64 encoded string döner.
    """
    # Ana görseli aç
    main_image = Image.open(io.BytesIO(image_bytes))
    main_width, main_height = main_image.size
    
    # Logoları yükle
    jci_logo = Image.open(JCI_LOGO_PATH)
    losev_logo = Image.open(LOSEV_LOGO_PATH)
    
    # Logo boyutlandırma (görsel genişliğinin %15'i)
    logo_max_width = int(main_width * 0.15)
    logo_max_height = int(main_height * 0.12)
    
    # JCI logosunu boyutlandır (oranı koru)
    jci_logo = resize_logo(jci_logo, logo_max_width, logo_max_height)
    
    # LÖSEV logosunu boyutlandır (oranı koru)
    losev_logo = resize_logo(losev_logo, logo_max_width, logo_max_height)
    
    # Padding (kenardan uzaklık)
    padding = int(main_width * 0.03)
    
    # JCI logosu - Sol alt köşe
    jci_position = (
        padding,
        main_height - jci_logo.height - padding
    )
    
    # LÖSEV logosu - Sağ alt köşe
    losev_position = (
        main_width - losev_logo.width - padding,
        main_height - losev_logo.height - padding
    )
    
    # RGBA'ya çevir (şeffaflık desteği için)
    if main_image.mode != 'RGBA':
        main_image = main_image.convert('RGBA')
    
    # Logoları yapıştır
    if jci_logo.mode == 'RGBA':
        main_image.paste(jci_logo, jci_position, jci_logo)
    else:
        main_image.paste(jci_logo, jci_position)
    
    if losev_logo.mode == 'RGBA':
        main_image.paste(losev_logo, losev_position, losev_logo)
    else:
        main_image.paste(losev_logo, losev_position)
    
    # RGB'ye geri çevir (PNG kaydetmek için)
    final_image = main_image.convert('RGB')
    
    # Base64'e çevir
    output = io.BytesIO()
    final_image.save(output, format='PNG', quality=95)
    output.seek(0)
    
    base64_string = base64.b64encode(output.getvalue()).decode('utf-8')
    return f"data:image/png;base64,{base64_string}"


def resize_logo(logo: Image.Image, max_width: int, max_height: int) -> Image.Image:
    """
    Logoyu oranını koruyarak maksimum boyutlara sığdırır.
    """
    # Orijinal boyutlar
    orig_width, orig_height = logo.size
    
    # En-boy oranı
    ratio = min(max_width / orig_width, max_height / orig_height)
    
    # Yeni boyutlar
    new_width = int(orig_width * ratio)
    new_height = int(orig_height * ratio)
    
    # Boyutlandır
    return logo.resize((new_width, new_height), Image.Resampling.LANCZOS)
