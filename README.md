# AI Karakter Oluşturucu

JCI Bahçeşehir ile gerçekleştirdiğimiz Vibe Coding oturumunda geliştirdiğimiz proje - Fotoğrafınızı yükleyin, LÖSEV maskotu ile birlikte özel bir görsel oluşturun!

## Proje Yapısı

```
├── frontend/          # Next.js + React + Tailwind CSS
├── backend/           # FastAPI + Python
│   └── assets/        # Logolar ve maskot görseli
├── jci_logo.png       # JCI logosu
├── losev_logo.jpg     # LÖSEV logosu
└── maskot.jpg         # LÖSEV maskotu
```

## Hızlı Başlangıç (Önerilen)

Her iki sunucuyu tek komutla başlatmak için:

```bash
# İlk kurulum (sadece bir kez)
npm install                    # Root bağımlılıkları (concurrently)
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
cd ../frontend && npm install

# backend/.env dosyasına GEMINI_API_KEY ekle
# API anahtarı al: https://aistudio.google.com/

# Her iki sunucuyu aynı anda başlat
npm run dev
```

Bu komut hem backend (port 8000) hem frontend (port 3000) sunucularını aynı anda başlatır.

### Ayrı Ayrı Başlatma

```bash
# Sadece Frontend
npm run dev:frontend

# Sadece Backend
npm run dev:backend
```

---

## Manuel Kurulum (Alternatif)

### Backend

```bash
cd backend

# Virtual environment oluştur
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# Environment variables
# API anahtarı al: https://aistudio.google.com/
# backend/.env dosyasına GEMINI_API_KEY ekle

# Sunucuyu başlat
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## Kullanım

1. http://localhost:3000 adresine gidin
2. Fotoğrafınızı sürükle-bırak veya tıklayarak yükleyin
3. "Oluştur" butonuna tıklayın
4. Oluşturulan görseli indirin veya yeni bir tane oluşturun

## API Endpoints

- `GET /` - API bilgisi
- `GET /health` - Sağlık kontrolü
- `POST /api/generate` - Görsel oluşturma (multipart/form-data)

## Teknolojiler

- **Frontend:** Next.js 16, React, Tailwind CSS
- **Backend:** FastAPI, Python 3.11+
- **AI:** Google Gemini API
- **Görsel İşleme:** Pillow

## Renk Paleti

| Renk | Hex | Kullanım |
|------|-----|----------|
| Krem Beyazı | `#FFFBF5` | Arka plan |
| Canlı Mercan | `#FF6B6B` | Ana butonlar |
| Sıcak Kehribar | `#FFD93D` | Vurgu |
| Açık Şeftali | `#FFEFD5` | Upload alanı |
| Kömür Grisi | `#2D3436` | Metinler |

