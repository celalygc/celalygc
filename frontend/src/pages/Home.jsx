import React, { useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Music, Mail, Instagram, Youtube, Facebook, Twitter, Play, Sparkles, TrendingUp, Newspaper, Clock } from 'lucide-react';
import { artistData, spotifyTracks, youtubeVideos, albums, streamingStats, latestNews, timeline } from '../mock';
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

const FloatingNote = ({ delay = 0, duration = 3, left, top }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${left}%`,
      top: `${top}%`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="text-cyan-400 opacity-40">
      <Music size={24} />
    </div>
  </motion.div>
);

const AnimatedGradientText = ({ children, className = "" }) => (
  <motion.span
    className={`bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${className}`}
    animate={{
      backgroundPosition: ['0%', '200%', '0%'],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    }}
    style={{
      backgroundSize: '200% auto',
    }}
  >
    {children}
  </motion.span>
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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-cyan-900/40 backdrop-blur-xl border-b border-pink-500/30 shadow-lg shadow-pink-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
          </motion.h1>
          <div className="hidden md:flex gap-8">
            {['about', 'music', 'videos', 'stats', 'news', 'contact'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className="hover:text-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-cyan-400 hover:bg-clip-text transition-all capitalize font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {item === 'about' ? 'Hakkımda' : 
                 item === 'music' ? 'Müzikler' : 
                 item === 'videos' ? 'Videolar' :
                 item === 'stats' ? 'İstatistikler' :
                 item === 'news' ? 'Haberler' : 'İletişim'}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 animate-gradient-xy"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingNote key={i} delay={i * 0.3} duration={4 + i * 0.3} left={10 + i * 10} top={20 + (i % 3) * 20} />
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
              className="text-7xl md:text-9xl font-bold mb-6"
            >
              <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-2xl md:text-3xl mb-12 font-semibold text-pink-300"
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
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-10 py-7 text-lg font-bold shadow-2xl shadow-pink-500/50 border-2 border-pink-400"
                onClick={() => window.open(artistData.socialMedia.spotify, '_blank')}
              >
                <Music className="mr-2" size={24} />
                Spotify'da Dinle
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-10 py-7 text-lg font-bold shadow-2xl shadow-cyan-500/50 border-2 border-cyan-400"
                onClick={() => window.open(artistData.socialMedia.appleMusic, '_blank')}
              >
                <Music className="mr-2" size={24} />
                Apple Music
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-3 border-pink-400 rounded-full flex justify-center shadow-lg shadow-pink-500/50">
            <motion.div 
              className="w-2 h-3 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-16 text-center">
              <AnimatedGradientText>Hakkımda</AnimatedGradientText>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop" 
                  alt="Celal Yağcı"
                  className="rounded-2xl w-full h-[500px] object-cover shadow-2xl relative z-10 border-4 border-pink-500/50"
                />
              </motion.div>
              <div>
                <motion.p 
                  className="text-xl leading-relaxed text-gray-200 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {artistData.detailedBio}
                </motion.p>
                
                {/* Timeline */}
                <div className="mt-8 space-y-4">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-bold text-pink-300 text-lg">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-8">
                  {[
                    { icon: Instagram, url: artistData.socialMedia.instagram, color: 'from-pink-500 to-purple-600' },
                    { icon: Youtube, url: artistData.socialMedia.youtube, color: 'from-red-500 to-pink-600' },
                    { icon: Twitter, url: artistData.socialMedia.twitter, color: 'from-cyan-500 to-blue-600' },
                    { icon: Facebook, url: artistData.socialMedia.facebook, color: 'from-blue-500 to-purple-600' },
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-3 bg-gradient-to-br ${social.color} rounded-full shadow-lg`}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon size={28} className="text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Spotify Music Section */}
      <section id="music" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-cyan-900/30"></div>
        <motion.div 
          className="absolute top-20 right-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={120} className="text-cyan-500/20" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-4 text-center">
              <AnimatedGradientText>Spotify'da Dinle</AnimatedGradientText>
            </h2>
            <p className="text-center text-pink-300 mb-16 text-xl">En popüler şarkılarımı keşfedin</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {spotifyTracks.map((track, index) => (
              <AnimatedSection key={track.id}>
                <motion.div
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-900/80 to-pink-900/80 rounded-2xl overflow-hidden backdrop-blur-sm border-2 border-pink-500/50 shadow-2xl">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4">
                        <AnimatedGradientText>{track.title}</AnimatedGradientText>
                      </h3>
                      <iframe 
                        src={track.embedUrl}
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="rounded-xl"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Albums Section */}
          <AnimatedSection>
            <h3 className="text-5xl font-bold mt-24 mb-12 text-center">
              <AnimatedGradientText>Albümler & EP'ler</AnimatedGradientText>
            </h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <AnimatedSection key={album.id}>
                <motion.div
                  whileHover={{ scale: 1.08, rotateY: 10 }}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <Card className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-cyan-500/50 overflow-hidden backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img 
                          src={album.cover} 
                          alt={album.title}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.3 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/80 to-transparent flex items-center justify-center gap-4"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-bold shadow-lg"
                            onClick={() => window.open(album.spotifyUrl, '_blank')}
                          >
                            Spotify
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-bold shadow-lg"
                            onClick={() => window.open(album.appleMusicUrl, '_blank')}
                          >
                            Apple Music
                          </Button>
                        </motion.div>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                        <h3 className="text-2xl font-bold mb-2 text-pink-300">{album.title}</h3>
                        <p className="text-cyan-300 font-semibold">{album.year}</p>
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
      <section id="videos" className="py-24 px-6 relative bg-gradient-to-b from-black via-cyan-950/20 to-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-4 text-center">
              <AnimatedGradientText>Video Klipler</AnimatedGradientText>
            </h2>
            <p className="text-center text-cyan-300 mb-16 text-xl">YouTube'dan en yeni videolarım</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {youtubeVideos.map((video, index) => (
              <AnimatedSection key={video.id}>
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => window.open(artistData.socialMedia.youtube, '_blank')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/50 to-transparent flex items-center justify-center"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    >
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Play size={40} className="text-white ml-2" fill="white" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="relative p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-cyan-500/30">
                    <h3 className="text-xl font-bold">
                      <AnimatedGradientText>{video.title}</AnimatedGradientText>
                    </h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection>
            <div className="text-center mt-12">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full px-10 py-7 text-lg font-bold shadow-2xl shadow-red-500/50"
                  onClick={() => window.open(artistData.socialMedia.youtube, '_blank')}
                >
                  <Youtube className="mr-2" size={24} />
                  Tüm Videolar
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Streaming Stats Section */}
      <section id="stats" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-4 text-center">
              <AnimatedGradientText>İstatistikler</AnimatedGradientText>
            </h2>
            <p className="text-center text-purple-300 mb-16 text-xl">Dijital platformlarda başarılarım</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {streamingStats.map((stat, index) => (
              <AnimatedSection key={stat.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                  <Card className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-pink-500/50 backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                        <TrendingUp size={36} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-300 mb-2">{stat.platform}</h3>
                      <p className="text-sm text-gray-400 mb-3">{stat.metric}</p>
                      <p className="text-4xl font-bold">
                        <AnimatedGradientText>{stat.value}</AnimatedGradientText>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="py-24 px-6 relative bg-gradient-to-b from-black via-pink-950/20 to-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-4 text-center">
              <AnimatedGradientText>Son Haberler</AnimatedGradientText>
            </h2>
            <p className="text-center text-pink-300 mb-16 text-xl">Basında ve sosyal medyada</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <AnimatedSection key={news.id}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <Card className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-cyan-500/50 overflow-hidden backdrop-blur-sm shadow-2xl h-full">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden h-48">
                        <motion.img 
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-cyan-400 mb-3 text-sm">
                          <Clock size={16} />
                          <span>{new Date(news.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">
                          <AnimatedGradientText>{news.title}</AnimatedGradientText>
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{news.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-6xl md:text-7xl font-bold mb-12 text-center">
              <AnimatedGradientText>İletişim</AnimatedGradientText>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-3xl blur-2xl opacity-50"></div>
              <Card className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-2 border-pink-500/50 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-bold mb-2 text-pink-300">İsim</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-black/30 border-2 border-purple-500/50 focus:border-pink-500 text-white text-lg py-6 rounded-xl"
                        placeholder="Adınız"
                        required
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-bold mb-2 text-pink-300">E-posta</label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-black/30 border-2 border-purple-500/50 focus:border-pink-500 text-white text-lg py-6 rounded-xl"
                        placeholder="email@example.com"
                        required
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <label className="block text-sm font-bold mb-2 text-pink-300">Mesajınız</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-black/30 border-2 border-purple-500/50 focus:border-pink-500 text-white min-h-[150px] text-lg rounded-xl"
                        placeholder="Mesajınızı buraya yazın..."
                        required
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:via-purple-700 hover:to-cyan-600 text-white rounded-full py-7 text-lg font-bold shadow-2xl shadow-pink-500/50"
                      >
                        <Mail className="mr-2" size={24} />
                        Gönder
                      </Button>
                    </motion.div>
                  </form>
                  <div className="mt-8 pt-8 border-t border-pink-500/30 text-center space-y-2">
                    <p className="text-cyan-400 font-semibold">veya direkt iletişim:</p>
                    <p className="text-pink-300 font-bold text-lg">{artistData.email}</p>
                    <p className="text-purple-300 font-semibold">{artistData.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-12 px-6 border-t-2 border-pink-500/30 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">
                <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
              </h3>
              <p className="text-purple-300 font-semibold">{artistData.tagline}</p>
            </div>
            <div className="flex gap-4">
              {[
                { icon: Music, url: artistData.socialMedia.spotify, color: 'from-green-500 to-green-600' },
                { icon: Instagram, url: artistData.socialMedia.instagram, color: 'from-pink-500 to-purple-600' },
                { icon: Youtube, url: artistData.socialMedia.youtube, color: 'from-red-500 to-pink-600' },
                { icon: Twitter, url: artistData.socialMedia.twitter, color: 'from-cyan-500 to-blue-600' },
                { icon: Facebook, url: artistData.socialMedia.facebook, color: 'from-blue-500 to-purple-600' },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-4 bg-gradient-to-br ${social.color} rounded-full shadow-lg`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.4, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={24} className="text-white" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© 2024 {artistData.name}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;