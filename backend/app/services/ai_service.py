import os
import base64
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
import io

# .env dosyasını yükle
load_dotenv()

# Gemini API client - lazy initialization
_client = None

# Model isimleri
IMAGE_MODEL = "gemini-3-pro-image-preview"  # Görsel oluşturma ve analiz için
TEXT_MODEL = "gemini-3-pro-preview"  # Diğer detaylar için

def get_client():
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "your_gemini_api_key_here":
            raise ValueError("GEMINI_API_KEY ayarlanmamış! backend/.env dosyasını kontrol edin.")
        _client = genai.Client(api_key=api_key)
    return _client

# Assets dizini
ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "assets")
MASCOT_PATH = os.path.join(ASSETS_DIR, "maskot.jpg")


async def generate_with_mascot(user_image_bytes: bytes) -> bytes:
    """
    Kullanıcı fotoğrafını LÖSEV maskotu ile birleştiren AI görsel oluşturur.
    """
    client = get_client()
    
    # Kullanıcı görselini yükle
    user_image = Image.open(io.BytesIO(user_image_bytes))
    
    # Maskot görselini yükle
    mascot_image = Image.open(MASCOT_PATH)
    
    # Görselleri bytes'a çevir
    user_buffer = io.BytesIO()
    user_image.save(user_buffer, format='PNG')
    user_bytes = user_buffer.getvalue()
    
    mascot_buffer = io.BytesIO()
    mascot_image.save(mascot_buffer, format='PNG')
    mascot_bytes = mascot_buffer.getvalue()
    
    # Prompt - doğru çıktı için detaylı talimatlar
    prompt = """
    Bu iki görseli kullanarak yeni ve yaratıcı bir görsel OLUŞTUR:
    
    1. İlk görsel: Bir kişinin fotoğrafı - bu kişinin yüzünü ve görünümünü koru
    2. İkinci görsel: Turuncu renkli, yeşil gözlü, sarı antenli sevimli bir maskot karakter
    
    OLUŞTURULACAK GÖRSEL:
    - Kişi, şeftali/turuncu renkte bir t-shirt giyiyor olsun
    - T-shirt'ün üzerinde beyaz renkte "LÖSEV" yazısı ve ev ikonu logosu bulunsun
    - Maskot karakter, kişinin omzuna tünemiş veya yanında durur şekilde olsun
    - Kişi ve maskot birbirlerine bakıyor veya kameraya gülümsüyor olsun
    - Arka plan: Sıcak pastel tonlarda (şeftali, krem rengi), balonlar ve konfetiler olsun
    - Atmosfer: Neşeli, umut dolu, samimi bir sosyal sorumluluk projesi havası
    - Görsel kare formatta (1:1) olsun
    - Fotoğrafik gerçekçilik ile 3D animasyon karakteri harmanlansın
    
    ÖNEMLİ: Sadece yan yana yapıştırma YAPMA. Kişiyi ve maskotu aynı sahne içinde, 
    birlikte poz verirken gösteren YENİ bir görsel OLUŞTUR.
    """
    
    try:
        # Gemini 3 Pro Image Preview - Görsel oluşturma için
        response = client.models.generate_content(
            model=IMAGE_MODEL,
            contents=[
                types.Content(
                    role="user",
                    parts=[
                        types.Part.from_text(text=prompt),
                        types.Part.from_bytes(
                            data=user_bytes,
                            mime_type="image/png"
                        ),
                        types.Part.from_bytes(
                            data=mascot_bytes,
                            mime_type="image/png"
                        ),
                    ]
                )
            ],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"]
            )
        )
        
        # Response'dan görseli çıkar
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None and part.inline_data.data:
                    return part.inline_data.data
        
        raise Exception("AI görsel oluşturamadı - response boş")
        
    except Exception as e:
        print(f"Gemini 3 Pro Image Preview hatası: {e}")
        
        # İkinci deneme: Imagen 3
        try:
            return await generate_with_imagen3(client, user_bytes)
        except Exception as e2:
            print(f"Imagen 3 hatası: {e2}")
            raise Exception(f"Görsel oluşturulamadı: {str(e)}")


async def generate_with_imagen3(client, user_image_bytes: bytes) -> bytes:
    """
    Imagen 3 ile görsel oluşturma.
    """
    # Önce Gemini 3 Pro Preview ile kullanıcının özelliklerini analiz et
    analyze_response = client.models.generate_content(
        model=TEXT_MODEL,
        contents=[
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(
                        text="Bu fotoğraftaki kişiyi detaylı tanımla: saç rengi, saç stili, yüz şekli, ten rengi, gözlük var mı, sakal/bıyık var mı. Kısa ve öz cevap ver."
                    ),
                    types.Part.from_bytes(
                        data=user_image_bytes,
                        mime_type="image/png"
                    ),
                ]
            )
        ]
    )
    
    person_description = analyze_response.text if analyze_response.text else "orta yaşlı bir erkek"
    
    # Imagen 3 ile görsel oluştur
    imagen_prompt = f"""
    Fotoğrafik kalitede bir görsel oluştur:
    
    - Ana karakter: {person_description}
    - Turuncu/şeftali rengi LÖSEV t-shirt giyiyor, üzerinde beyaz "LÖSEV" logosu var
    - Omzunda veya yanında turuncu renkli, yeşil gözlü, sarı antenli, beyaz saçlı sevimli 3D animasyon maskot karakteri var
    - Kişi ve maskot mutlu, gülümseyen
    - Arka plan: Sıcak pastel tonlar, şeftali rengi, balonlar ve konfetiler
    - Kare format (1:1)
    - Sosyal sorumluluk projesi atmosferi, neşeli ve umut dolu
    """
    
    imagen_response = client.models.generate_images(
        model="imagen-3.0-generate-002",
        prompt=imagen_prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio="1:1",
            person_generation="ALLOW_ADULT"
        )
    )
    
    if imagen_response.generated_images:
        return imagen_response.generated_images[0].image.image_bytes
    
    raise Exception("Imagen 3 görsel üretemedi")
