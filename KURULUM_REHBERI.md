# Celal Yağcı Müzisyen Sitesi - Kurulum Rehberi

## 📋 Gereksinimler

### Yazılımlar:
- Node.js v16+ (https://nodejs.org/)
- Python 3.8+ (https://www.python.org/)
- MongoDB (https://www.mongodb.com/)
- Yarn (npm install -g yarn)

## 📦 Kurulum Adımları

### 1. Frontend Kurulumu
```bash
cd frontend
yarn install
```

### 2. Backend Kurulumu
```bash
cd backend
pip install -r requirements.txt
```

### 3. Environment Variables
Backend için `.env` dosyasını düzenleyin:
```
MONGO_URL=your_mongodb_connection_string
DB_NAME=celal_yagci_music
```

Frontend için `.env` dosyasını düzenleyin:
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4. Servisleri Başlatma

**Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001
```

**Frontend:**
```bash
cd frontend
yarn start
```

Site: http://localhost:3000

## 🚀 Production Deployment

### Frontend Build:
```bash
cd frontend
yarn build
```
Build dosyaları `build/` klasöründe oluşur.

### Nginx Örnek Konfigürasyonu:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /path/to/frontend/build;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Notlar

- MongoDB bağlantı string'inizi güncelleyin
- Production'da environment variables'ı doğru ayarlayın
- SSL sertifikası ekleyin (Let's Encrypt)
- Domain'i .env dosyasında güncelleyin

## 🔗 Bağlantılar

- Spotify: https://open.spotify.com/intl-tr/artist/5jCFrXh3uTmBkL2TeueJIh
- Apple Music: https://music.apple.com/tr/artist/celal-yağcı/1856277822
- Instagram: https://www.instagram.com/celalygc/
- YouTube: https://www.youtube.com/@celalyagci
- TikTok: https://www.tiktok.com/@celalyagcimusic

