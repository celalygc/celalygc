# 📥 SİTEYİ İNDİRME REHBERİ

## YÖNTEM 1: GitHub'a Kaydetme (EN KOLAY) ⭐

### Adımlar:
1. Emergent chat arayüzünde "Save to GitHub" butonuna tıklayın
2. GitHub hesabınızla giriş yapın
3. Repository adı verin: örn. "celal-yagci-website"
4. Push edin
5. Kendi bilgisayarınızda:
   ```bash
   git clone https://github.com/YOUR_USERNAME/celal-yagci-website.git
   cd celal-yagci-website
   ```

## YÖNTEM 2: Manuel İndirme

Emergent'ten dosyaları manuel olarak indirmeniz gerekecek.

### Önemli Dosyalar:

**Frontend Klasörü:**
- /app/frontend/src/
- /app/frontend/public/
- /app/frontend/package.json
- /app/frontend/.env

**Backend Klasörü:**
- /app/backend/server.py
- /app/backend/requirements.txt
- /app/backend/.env

**Konfigürasyon:**
- /app/frontend/tailwind.config.js
- /app/frontend/craco.config.js

## YÖNTEM 3: ZIP Dosyası Oluşturma

Emergent terminalinden tüm projeyi zip'leyebilirsiniz:

```bash
cd /app
tar -czf celal-yagci-site.tar.gz \
  frontend/src \
  frontend/public \
  frontend/package.json \
  frontend/.env \
  frontend/tailwind.config.js \
  frontend/craco.config.js \
  backend/server.py \
  backend/requirements.txt \
  backend/.env \
  KURULUM_REHBERI.md
```

Sonra bu dosyayı indirin.

---

## 🖥️ KENDİ SUNUCUNUZA KURULUM

### ADIM 1: Sunucuya Bağlanın
```bash
ssh kullanici@sunucu-ip
```

### ADIM 2: Gerekli Yazılımları Kurun

**Ubuntu/Debian:**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python
sudo apt-get install python3 python3-pip

# MongoDB
sudo apt-get install mongodb

# Yarn
npm install -g yarn

# Nginx (web server)
sudo apt-get install nginx
```

### ADIM 3: Projeyi Yükleyin
```bash
cd /var/www
sudo mkdir celal-yagci
sudo chown $USER:$USER celal-yagci
cd celal-yagci

# Git ile (Yöntem 1)
git clone https://github.com/YOUR_USERNAME/celal-yagci-website.git .

# Veya dosyaları FTP/SCP ile yükleyin
```

### ADIM 4: Kurulum
```bash
# Frontend
cd frontend
yarn install
yarn build

# Backend
cd ../backend
pip3 install -r requirements.txt
```

### ADIM 5: Environment Variables
```bash
# Backend .env
nano backend/.env
```
Ekleyin:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=celal_yagci_music
```

### ADIM 6: Servisleri Başlatın

**Backend için systemd service:**
```bash
sudo nano /etc/systemd/system/celal-yagci-backend.service
```

İçerik:
```ini
[Unit]
Description=Celal Yagci Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/celal-yagci/backend
ExecStart=/usr/bin/python3 -m uvicorn server:app --host 0.0.0.0 --port 8001
Restart=always

[Install]
WantedBy=multi-user.target
```

Başlat:
```bash
sudo systemctl daemon-reload
sudo systemctl start celal-yagci-backend
sudo systemctl enable celal-yagci-backend
```

### ADIM 7: Nginx Konfigürasyonu
```bash
sudo nano /etc/nginx/sites-available/celal-yagci
```

İçerik:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /var/www/celal-yagci/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
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

Aktif et:
```bash
sudo ln -s /etc/nginx/sites-available/celal-yagci /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### ADIM 8: SSL Sertifikası (Let's Encrypt)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ✅ TEST

Tarayıcınızda:
- http://yourdomain.com

Çalışıyor mu kontrol edin!

---

## 🔧 Sorun Giderme

### Backend çalışmıyor:
```bash
sudo systemctl status celal-yagci-backend
sudo journalctl -u celal-yagci-backend -f
```

### Nginx çalışmıyor:
```bash
sudo nginx -t
sudo systemctl status nginx
```

### MongoDB bağlantı hatası:
```bash
sudo systemctl status mongodb
```

---

## 📊 Maliyet Tahmini

**Shared Hosting:** $5-10/ay
**VPS (DigitalOcean/Linode):** $5-12/ay
**Domain:** $10-15/yıl
**SSL:** Ücretsiz (Let's Encrypt)

**TOPLAM:** ~$10-15/ay

---

## 🆚 Emergent vs Kendi Sunucu

| Özellik | Emergent | Kendi Sunucu |
|---------|----------|--------------|
| Maliyet | $20/ay | $10-15/ay |
| Kurulum | Otomatik | Manuel (2-3 saat) |
| Bakım | Yok | Kendiniz |
| Güncelleme | Otomatik | Manuel |
| Destek | Var | Kendiniz |
| SSL | Otomatik | Manuel |

