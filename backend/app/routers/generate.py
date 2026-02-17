from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel

from app.services.ai_service import generate_with_mascot
from app.services.image_service import add_logos_to_image

router = APIRouter()


class GenerateResponse(BaseModel):
    image_base64: str
    message: str


@router.post("/generate", response_model=GenerateResponse)
async def generate_image(image: UploadFile = File(...)):
    """
    Kullanıcı fotoğrafını alır, maskot ile birleştirir ve logoları ekler.
    """
    # Dosya tipi kontrolü
    allowed_types = ["image/jpeg", "image/png", "image/jpg"]
    if image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Sadece JPG ve PNG formatları desteklenir."
        )
    
    # Dosya boyutu kontrolü (5MB limit)
    contents = await image.read()
    max_size = 5 * 1024 * 1024  # 5MB
    if len(contents) > max_size:
        raise HTTPException(
            status_code=400,
            detail="Dosya boyutu 5MB'dan küçük olmalıdır."
        )
    
    try:
        # AI ile görsel oluştur
        generated_image = await generate_with_mascot(contents)
        
        # Logoları ekle
        final_image = add_logos_to_image(generated_image)
        
        return GenerateResponse(
            image_base64=final_image,
            message="Görsel başarıyla oluşturuldu!"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Görsel oluşturulurken bir hata oluştu: {str(e)}"
        )
