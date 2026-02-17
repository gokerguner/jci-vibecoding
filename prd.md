Harika bir fikir! Sosyal sorumluluk projelerinde teknoloji kullanımı, projenin etkisini ve erişilebilirliğini ciddi oranda artırır. İstediğin bu web uygulaması için modern, hızlı ve şık bir **PRD (Ürün Gereksinim Dokümanı)** hazırladım.

Seçtiğim teknolojiler, Python tabanlı yapay zeka entegrasyonuna en hızlı yanıt verecek ve "database" gerektirmeyecek hafiflikte seçildi.

---

# 📄 PRD: Sosyal Sorumluluk AI Karakter Oluşturucu

## 1. Ürüne Genel Bakış

Bu uygulama, kullanıcıların kendi fotoğraflarını yükleyerek seçili bir yapay zeka karakteriyle yan yana fotoğraflarını oluşturmalarını sağlar. Amaç, sosyal sorumluluk projelerinde farkındalığı artırmak ve kullanıcılar ile proje karakterleri arasında bağ kurmaktır.

## 2. Kullanıcı Akışı (User Flow)

1. **Giriş:** Kullanıcı temiz ve sıcak renkli bir karşılama ekranına gelir.
2. **Yükleme:** Sürükle-bırak veya dosya seçme yöntemiyle fotoğrafını yükler.
3. **Etkileşim:** Fotoğraf yüklendiğinde "Oluştur" butonu aktifleşir.
4. **İşleme:** Python backend, Gemini Nano Banana modeliyle görseli işler.
5. **Sonuç:** Oluşturulan görsel ekranda belirir; "İndir" ve "Yeni Bir Tane Oluştur" seçenekleri sunulur.

---

## 3. Fonksiyonel Gereksinimler

| Özellik | Açıklama |
| --- | --- |
| **Görsel Yükleme** | Kullanıcı `.jpg`, `.png` formatlarında görsel yükleyebilmeli. Sürükle-bırak desteği olmalı. |
| **Dinamik Buton** | "Oluştur" butonu başlangıçta inaktif olmalı, görsel yüklendiği an aktifleşmeli. |
| **AI Entegrasyonu** | Yüklenen görsel Gemini Nano Banana modeliyle birleştirilmeli. |
| **İndirme** | Oluşturulan görseli kullanıcı yerel cihazına kaydedebilmeli. |
| **Sıfırlama** | "Yeni Bir Tane Oluştur" butonu ile tüm state'ler temizlenip başa dönülmeli. |

---

## 4. Teknik Stack (Teknoloji Yığını)

Veritabanı kullanılmayacağı için uygulamayı **Stateless (Durumsuz)** bir mimariyle kurguluyoruz:

* **Frontend:** **Next.js (React)** & **Tailwind CSS**
* *Neden:* Hızlı render, kolay state yönetimi ve görsel odaklı tasarım için ideal.


* **Backend:** **FastAPI (Python)**
* *Neden:* Yapay zeka modülünü (Python) en hızlı şekilde API'ye dönüştüren modern bir kütüphanedir.


* **AI Modülü:** **Gemini Nano / Banana Entegrasyonu**
* *Neden:* İstediğin modelin Python SDK'sı üzerinden görsel işleme süreçleri yönetilecek.


* **Barındırma/Dağıtım:** Vercel (Frontend) ve Hugging Face Spaces veya Render (Backend).

---

## 5. Tasarım ve Renk Paleti (Sıcak Tema)

Sosyal sorumluluk projesinin samimiyetini yansıtmak adına "Güneş Batımı" ve "Sıcak Toprak" tonlarını tercih ettik.

| Element | Renk Adı | Hex Kodu | Görsel Temsil |
| --- | --- | --- | --- |
| **Arka Plan** | Krem Beyazı | `#FFFBF5` | 🤍 |
| **Ana Aksiyon (Buton)** | Canlı Mercan | `#FF6B6B` | ❤️ |
| **İkincil Vurgu** | Sıcak Kehribar | `#FFD93D` | 💛 |
| **Yükleme Alanı** | Açık Şeftali | `#FFEFD5` | 🍑 |
| **Metinler** | Kömür Grisi | `#2D3436` | 🖤 |

---

## 6. Arayüz Taslak Detayları (UI Components)

### **Ana Ekran (Hero Section)**

* **Başlık:** "İyiliğin Bir Parçası Ol" (Örn.)
* **Yükleme Kutusu:** Dotted border (kesikli çizgili), üzerinde "Dosyanı buraya sürükle veya tıkla" ibaresi olan yumuşak köşeli bir kutu.
* **Oluştur Butonu:** Geniş, gölgeli ve yüklenecek görsel yokken yarı saydam (disabled).

### **Sonuç Ekranı**

* **Görsel Alanı:** AI tarafından oluşturulan kare formatlı görsel.
* **Alt Buton Grubu:**
* `İndir`: Mercan rengi, içi dolu buton.
* `Yeni Bir Tane Oluştur`: Outline (sadece çerçeve), daha sade buton.



---

## 7. Uygulama Mimarisi (Görsel Olmayan Şema)

1. **Frontend (Next.js):** Kullanıcıdan görseli alır, Base64 formatına veya bir `FormData` nesnesine çevirir.
2. **API (FastAPI):** Görseli alır, Python üzerinden Gemini Nano Banana modeline gönderir.
3. **AI Layer:** Model, karakter ile kullanıcının fotoğrafını harmanlar.
4. **Response:** Oluşturulan görselin URL'si veya byte verisi Frontend'e geri döner.
5. **UI Update:** "Loading" animasyonu biter ve görsel sergilenir.

---

Bu PRD, yazılımcı bir arkadaşına verdiğinde veya kendin koda dökerken sana kusursuz bir yol haritası sunacaktır.

**Senin için bir sonraki adımda ne yapmamı istersin?**

* Bu projenin **React/Tailwind** arayüz kodlarını mı yazalım?
* Yoksa Python tarafındaki **FastAPI backend yapısını** mı kuralım?