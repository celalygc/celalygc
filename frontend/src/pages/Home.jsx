import React, { useState } from 'react';
import { Music, Calendar, Mail, Instagram, Youtube, Facebook, Twitter, ExternalLink } from 'lucide-react';
import { artistData, albums, events, gallery } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Mesajınız alındı!",
      description: "En kısa sürede size dönüş yapacağım.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">{artistData.name}</h1>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="hover:text-light-pink transition-colors">Hakkımda</a>
            <a href="#music" className="hover:text-light-pink transition-colors">Müzikler</a>
            <a href="#events" className="hover:text-light-pink transition-colors">Konserler</a>
            <a href="#gallery" className="hover:text-light-pink transition-colors">Galeri</a>
            <a href="#contact" className="hover:text-light-pink transition-colors">İletişim</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mid-purple/20 via-black to-black"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            {artistData.name}
          </h2>
          <p className="text-xl md:text-2xl text-light-pink mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {artistData.tagline}
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              className="bg-light-pink text-black hover:bg-light-pink/90 rounded-full px-8 py-6 text-base font-semibold"
              onClick={() => window.open(artistData.socialMedia.spotify, '_blank')}
            >
              <Music className="mr-2" size={20} />
              Spotify'da Dinle
            </Button>
            <Button 
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
              onClick={() => window.open(artistData.socialMedia.appleMusic, '_blank')}
            >
              <Music className="mr-2" size={20} />
              Apple Music
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">Hakkımda</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop" 
                alt="Artist"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                {artistData.bio}
              </p>
              <div className="flex gap-4 mt-8">
                <a href={artistData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                  <Instagram size={28} />
                </a>
                <a href={artistData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                  <Youtube size={28} />
                </a>
                <a href={artistData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                  <Twitter size={28} />
                </a>
                <a href={artistData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                  <Facebook size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Müziklerim</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <Card 
                key={album.id} 
                className="bg-mid-purple/20 border-mid-purple/30 hover:scale-105 transition-transform duration-300 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={album.cover} 
                      alt={album.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button 
                        size="sm" 
                        className="bg-light-pink text-black hover:bg-light-pink/90 rounded-full"
                        onClick={() => window.open(album.spotifyUrl, '_blank')}
                      >
                        Spotify
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-white text-black hover:bg-white/90 rounded-full"
                        onClick={() => window.open(album.appleMusicUrl, '_blank')}
                      >
                        Apple Music
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                    <p className="text-gray-400">{album.year}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Konserler & Etkinlikler</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <Card 
                key={event.id} 
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400 mb-1">{event.venue}, {event.city}</p>
                      <div className="flex items-center gap-2 text-light-pink">
                        <Calendar size={16} />
                        <span>{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - {event.time}</span>
                      </div>
                    </div>
                    <div>
                      {event.status === 'available' ? (
                        <Button 
                          className="bg-light-pink text-black hover:bg-light-pink/90 rounded-full px-6"
                          onClick={() => window.open(event.ticketUrl, '_blank')}
                        >
                          Bilet Al
                          <ExternalLink className="ml-2" size={16} />
                        </Button>
                      ) : (
                        <Button disabled className="rounded-full px-6">
                          Tükendi
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Galeri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((photo) => (
              <div 
                key={photo.id} 
                className="relative overflow-hidden rounded-lg aspect-video group cursor-pointer"
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">İletişim</h2>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">İsim</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Adınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mesajınız</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white min-h-[150px]"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-light-pink text-black hover:bg-light-pink/90 rounded-full py-6 text-base font-semibold"
                >
                  <Mail className="mr-2" size={20} />
                  Gönder
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-2">
                <p className="text-gray-400">veya direkt iletişim:</p>
                <p className="text-light-pink">{artistData.email}</p>
                <p className="text-gray-400">{artistData.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">{artistData.name}</h3>
              <p className="text-gray-400">{artistData.tagline}</p>
            </div>
            <div className="flex gap-6">
              <a href={artistData.socialMedia.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                <Music size={24} />
              </a>
              <a href={artistData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                <Instagram size={24} />
              </a>
              <a href={artistData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                <Youtube size={24} />
              </a>
              <a href={artistData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                <Twitter size={24} />
              </a>
              <a href={artistData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-light-pink transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>© 2024 {artistData.name}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;