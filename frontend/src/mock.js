// Updated mock data for Celal Yağcı with real links

export const artistData = {
  name: "Celal Yağcı",
  tagline: "Şarkıcı • Söz Yazarı • Besteci",
  bio: "Müziğe olan tutkum çocukluğumda başladı ve bugün profesyonel bir sanatçı olarak kariyerime devam ediyorum. Her şarkımda duygularımı ve hikayelerimi paylaşıyorum. Müzik benim için sadece bir meslek değil, hayatımın ta kendisi.",
  detailedBio: "2018 yılında müzik kariyerime başladım ve o günden beri dinleyicilerimle duygu dolu şarkılar paylaşıyorum. Pop ve R&B türlerinde eserler vererek, Türk müzik sahnesinde kendime özgün bir yer edinmeye çalışıyorum. Her şarkım, yaşadığım deneyimlerden ve hissettiklerimi yansıtıyor.",
  email: "info@celalyagci.com",
  phone: "+90 555 123 4567",
  socialMedia: {
    spotify: "https://open.spotify.com/intl-tr/artist/5jCFrXh3uTmBkL2TeueJIh",
    appleMusic: "https://music.apple.com/tr/artist/celal-ya%C4%9Fc%C4%B1/1856277822",
    instagram: "https://instagram.com/celalyagci",
    youtube: "https://www.youtube.com/@celalyagci",
    twitter: "https://twitter.com/celalyagci",
    facebook: "https://facebook.com/celalyagci"
  }
};

// Spotify tracks with embed URLs
export const spotifyTracks = [
  {
    id: 1,
    title: "En Popüler Şarkı",
    embedUrl: "https://open.spotify.com/embed/artist/5jCFrXh3uTmBkL2TeueJIh",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop"
  },
  {
    id: 2,
    title: "Son Çıkan Single",
    embedUrl: "https://open.spotify.com/embed/artist/5jCFrXh3uTmBkL2TeueJIh",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop"
  },
  {
    id: 3,
    title: "Tüm Şarkılar",
    embedUrl: "https://open.spotify.com/embed/artist/5jCFrXh3uTmBkL2TeueJIh",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop"
  }
];

// YouTube videos from channel
export const youtubeVideos = [
  {
    id: 1,
    title: "Yeni Klip 2024",
    videoId: "VIDEO_ID_1",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop"
  },
  {
    id: 2,
    title: "Akustik Performans",
    videoId: "VIDEO_ID_2",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop"
  },
  {
    id: 3,
    title: "Stüdyo Kayıt",
    videoId: "VIDEO_ID_3",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop"
  },
  {
    id: 4,
    title: "Canlı Performans",
    videoId: "VIDEO_ID_4",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=450&fit=crop"
  },
  {
    id: 5,
    title: "Behind The Scenes",
    videoId: "VIDEO_ID_5",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=450&fit=crop"
  },
  {
    id: 6,
    title: "Cover Performans",
    videoId: "VIDEO_ID_6",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop"
  }
];

export const albums = [
  {
    id: 1,
    title: "Yeni Albüm",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/5jCFrXh3uTmBkL2TeueJIh",
    appleMusicUrl: "https://music.apple.com/tr/artist/celal-ya%C4%9Fc%C4%B1/1856277822",
    bgColor: "light-pink"
  },
  {
    id: 2,
    title: "İlk Albüm",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/5jCFrXh3uTmBkL2TeueJIh",
    appleMusicUrl: "https://music.apple.com/tr/artist/celal-ya%C4%9Fc%C4%B1/1856277822",
    bgColor: "mid-purple"
  },
  {
    id: 3,
    title: "Akustik EP",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    spotifyUrl: "https://open.spotify.com/intl-tr/artist/5jCFrXh3uTmBkL2TeueJIh",
    appleMusicUrl: "https://music.apple.com/tr/artist/celal-ya%C4%9Fc%C4%B1/1856277822",
    bgColor: "light-yellow"
  }
];

// Streaming Stats
export const streamingStats = [
  {
    id: 1,
    platform: "Spotify",
    metric: "Aylık Dinleyici",
    value: "50,000+",
    icon: "spotify",
    color: "from-green-500 to-green-600"
  },
  {
    id: 2,
    platform: "Apple Music",
    metric: "Toplam Dinlenme",
    value: "1M+",
    icon: "apple",
    color: "from-pink-500 to-red-600"
  },
  {
    id: 3,
    platform: "YouTube",
    metric: "Video İzlenme",
    value: "500K+",
    icon: "youtube",
    color: "from-red-500 to-pink-600"
  },
  {
    id: 4,
    platform: "Tüm Platformlar",
    metric: "Toplam Dinlenme",
    value: "5M+",
    icon: "all",
    color: "from-purple-500 to-cyan-600"
  }
];

// Latest News
export const latestNews = [
  {
    id: 1,
    title: "Yeni Single 'Aşk Hikayesi' Yayında!",
    date: "2024-08-15",
    excerpt: "Celal Yağcı'nın merakla beklenen yeni single'ı tüm dijital platformlarda yayında. Duygusal sözleri ve etkileyici melodisiyle dikkat çekiyor.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: "Spotify Top 50'de!",
    date: "2024-08-10",
    excerpt: "Son çıkan şarkısı Spotify Türkiye Top 50 listesine girmeyi başardı. Dinleyicilerden büyük ilgi görüyor.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "Yeni Albüm Müjdesi",
    date: "2024-08-05",
    excerpt: "Celal Yağcı, 2024 sonunda çıkacak yeni albümü hakkında heyecan verici detaylar paylaştı.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    link: "#"
  }
];

// Timeline
export const timeline = [
  {
    id: 1,
    year: "2024",
    title: "Yeni Single & Albüm",
    description: "Son single'ı büyük başarı elde etti ve yeni albüm çalışmaları devam ediyor."
  },
  {
    id: 2,
    year: "2023",
    title: "İlk Albüm Çıkışı",
    description: "İlk stüdyo albümü yayınlandı ve müzik camiasında büyük yankı uyandırdı."
  },
  {
    id: 3,
    year: "2022",
    title: "İlk EP",
    description: "Müzik kariyerine ilk EP'si ile adım attı."
  },
  {
    id: 4,
    year: "2018",
    title: "Müzik Yolculuğu Başlıyor",
    description: "Profesyonel müzik kariyerine başladı."
  }
];