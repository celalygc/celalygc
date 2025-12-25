import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Music, Calendar, Mail, Instagram, Youtube, Facebook, Twitter, ExternalLink, Play, Sparkles } from 'lucide-react';
import { artistData, spotifyTracks, youtubeVideos, albums, events, gallery } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const AnimatedSection = ({ children, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingNote = ({ delay = 0, duration = 3 }) => (
  <motion.div
    className="absolute text-light-pink/20"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [-20, 20],
      x: [-10, 10],
      rotate: [0, 360],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Music size={24} />
  </motion.div>
);

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05, color: "#ffd1e7" }}
            transition={{ duration: 0.2 }}
          >
            {artistData.name}
          </motion.h1>
          <div className="hidden md:flex gap-8">
            {['about', 'music', 'videos', 'events', 'gallery', 'contact'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className="hover:text-light-pink transition-colors capitalize"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item === 'about' ? 'Hakkımda' : 
                 item === 'music' ? 'Müzikler' : 
                 item === 'videos' ? 'Videolar' :
                 item === 'events' ? 'Konserler' : 
                 item === 'gallery' ? 'Galeri' : 'İletişim'}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mid-purple/30 via-black to-black animate-gradient"></div>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </motion.div>

        {/* Floating Music Notes */}
        {[...Array(6)].map((_, i) => (
          <FloatingNote key={i} delay={i * 0.5} duration={3 + i * 0.5} />
        ))}

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-6xl md:text-8xl font-bold mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 209, 231, 0.5)",
                  "0 0 40px rgba(255, 209, 231, 0.3)",
                  "0 0 20px rgba(255, 209, 231, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {artistData.name}
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-light-pink mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {artistData.tagline}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-light-pink text-black hover:bg-light-pink/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-light-pink/50"
                onClick={() => window.open(artistData.socialMedia.spotify, '_blank')}
              >
                <Music className="mr-2" size={20} />
                Spotify'da Dinle
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-white/50"
                onClick={() => window.open(artistData.socialMedia.appleMusic, '_blank')}
              >
                <Music className="mr-2" size={20} />
                Apple Music
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-light-pink rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-2 bg-light-pink rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-12 text-center"
              whileHover={{ scale: 1.05, color: "#ffd1e7" }}
            >
              Hakkımda
            </motion.h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop" 
                  alt="Celal Yağcı"
                  className="rounded-lg w-full h-[500px] object-cover shadow-2xl"
                />
              </motion.div>
              <div>
                <motion.p 
                  className="text-lg leading-relaxed text-gray-300 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {artistData.bio}
                </motion.p>
                <div className="flex gap-4 mt-8">
                  {[
                    { icon: Instagram, url: artistData.socialMedia.instagram },
                    { icon: Youtube, url: artistData.socialMedia.youtube },
                    { icon: Twitter, url: artistData.socialMedia.twitter },
                    { icon: Facebook, url: artistData.socialMedia.facebook },
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-light-pink transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon size={28} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Spotify Music Section */}
      <section id="music" className="py-24 px-6 bg-gradient-to-b from-black via-mid-purple/10 to-black relative overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 text-light-pink/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={100} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Spotify'da Dinle
            </motion.h2>
            <p className="text-center text-gray-400 mb-16">En popüler şarkılarımı keşfedin</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {spotifyTracks.map((track, index) => (
              <AnimatedSection key={track.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-light-pink/20"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-light-pink">{track.title}</h3>
                    <iframe 
                      src={track.embedUrl}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen="" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Albums Section */}
          <AnimatedSection>
            <h3 className="text-4xl font-bold mt-20 mb-12 text-center">Albümler & EP'ler</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <AnimatedSection key={album.id}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-mid-purple/20 border-mid-purple/30 overflow-hidden group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img 
                          src={album.cover} 
                          alt={album.title}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                        <p className="text-gray-400">{album.year}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section id="videos" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-4 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Video Klipler
            </motion.h2>
            <p className="text-center text-gray-400 mb-16">YouTube'dan en yeni videolarım</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {youtubeVideos.map((video, index) => (
              <AnimatedSection key={video.id}>
                <motion.div
                  className="relative rounded-lg overflow-hidden cursor-pointer group bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="aspect-video relative">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-light-pink rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play size={32} className="text-black ml-1" fill="black" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{video.title}</h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              className="w-full max-w-5xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <motion.button 
                className="mt-4 px-6 py-3 bg-light-pink text-black rounded-full font-semibold mx-auto block"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedVideo(null)}
              >
                Kapat
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Konserler & Etkinlikler
            </motion.h2>
          </AnimatedSection>
          <div className="space-y-6">
            {events.map((event, index) => (
              <AnimatedSection key={event.id}>
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-light-pink/50">
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
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                className="bg-light-pink text-black hover:bg-light-pink/90 rounded-full px-6"
                                onClick={() => window.open(event.ticketUrl, '_blank')}
                              >
                                Bilet Al
                                <ExternalLink className="ml-2" size={16} />
                              </Button>
                            </motion.div>
                          ) : (
                            <Button disabled className="rounded-full px-6">
                              Tükendi
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-center"
              whileHover={{ scale: 1.05 }}
            >
              Galeri
            </motion.h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((photo, index) => (
              <AnimatedSection key={photo.id}>
                <motion.div 
                  className="relative overflow-hidden rounded-lg aspect-video group cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={photo.url} 
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white/5">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-12 text-center"
              whileHover={{ scale: 1.05 }}
            >
              İletişim
            </motion.h2>
          </AnimatedSection>
          <AnimatedSection>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">İsim</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white focus:border-light-pink"
                      placeholder="Adınız"
                      required
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">E-posta</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white focus:border-light-pink"
                      placeholder="email@example.com"
                      required
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-medium mb-2">Mesajınız</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white min-h-[150px] focus:border-light-pink"
                      placeholder="Mesajınızı buraya yazın..."
                      required
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit" 
                      className="w-full bg-light-pink text-black hover:bg-light-pink/90 rounded-full py-6 text-base font-semibold"
                    >
                      <Mail className="mr-2" size={20} />
                      Gönder
                    </Button>
                  </motion.div>
                </form>
                <div className="mt-8 pt-8 border-t border-white/10 text-center space-y-2">
                  <p className="text-gray-400">veya direkt iletişim:</p>
                  <p className="text-light-pink">{artistData.email}</p>
                  <p className="text-gray-400">{artistData.phone}</p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-12 px-6 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">{artistData.name}</h3>
              <p className="text-gray-400">{artistData.tagline}</p>
            </div>
            <div className="flex gap-6">
              {[
                { icon: Music, url: artistData.socialMedia.spotify },
                { icon: Instagram, url: artistData.socialMedia.instagram },
                { icon: Youtube, url: artistData.socialMedia.youtube },
                { icon: Twitter, url: artistData.socialMedia.twitter },
                { icon: Facebook, url: artistData.socialMedia.facebook },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-light-pink transition-colors"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>© 2024 {artistData.name}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;