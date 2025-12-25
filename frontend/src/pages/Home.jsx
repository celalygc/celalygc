import React, { useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Music, Play, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { artistData, spotifyTracks, youtubeVideos, albums, streamingStats, latestNews, timeline } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
    <div className="text-teal-400 opacity-40">
      <Music size={20} />
    </div>
  </motion.div>
);

const AnimatedGradientText = ({ children, className = "" }) => (
  <motion.span
    className={`bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent ${className}`}
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden relative">
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-fuchsia-500/20 via-violet-500/20 to-cyan-500/20 animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-2xl border-b border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <motion.h1 
            className="text-xl sm:text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
          </motion.h1>
          <div className="hidden md:flex gap-6 lg:gap-8">
            {['about', 'music', 'videos', 'stats', 'news'].map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className="hover:text-transparent hover:bg-gradient-to-r hover:from-fuchsia-400 hover:to-cyan-400 hover:bg-clip-text transition-all capitalize font-medium text-sm lg:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {item === 'about' ? 'Hakkımda' : 
                 item === 'music' ? 'Müzikler' : 
                 item === 'videos' ? 'Videolar' :
                 item === 'stats' ? 'İstatistikler' : 'Haberler'}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-cyan-600 animate-gradient-xy"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingNote key={i} delay={i * 0.3} duration={4 + i * 0.3} left={10 + i * 10} top={20 + (i % 3) * 20} />
        ))}

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl w-full"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 px-4"
            >
              <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-12 font-semibold text-fuchsia-300 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {artistData.tagline}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold shadow-2xl shadow-fuchsia-500/50 border-2 border-fuchsia-400"
                onClick={() => window.open(artistData.socialMedia.spotify, '_blank', 'noopener,noreferrer')}
              >
                <Music className="mr-2" size={20} />
                Spotify
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold shadow-2xl shadow-cyan-500/50 border-2 border-cyan-400"
                onClick={() => window.open(artistData.socialMedia.appleMusic, '_blank', 'noopener,noreferrer')}
              >
                <Music className="mr-2" size={20} />
                Apple Music
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 sm:w-8 h-10 sm:h-12 border-2 sm:border-3 border-fuchsia-400 rounded-full flex justify-center shadow-lg shadow-fuchsia-500/50">
            <motion.div 
              className="w-1.5 sm:w-2 h-2 sm:h-3 bg-gradient-to-b from-fuchsia-400 to-violet-400 rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-12 sm:mb-16 text-center">
              <AnimatedGradientText>Hakkımda</AnimatedGradientText>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop" 
                  alt="Celal Yağcı"
                  className="rounded-2xl w-full h-[400px] sm:h-[500px] object-cover shadow-2xl relative z-10 border-4 border-fuchsia-500/50"
                />
              </motion.div>
              <div>
                <motion.p 
                  className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {artistData.detailedBio}
                </motion.p>
                
                {/* Timeline */}
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-3 sm:gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                        {item.year}
                      </div>
                      <div>
                        <h4 className="font-bold text-fuchsia-300 text-base sm:text-lg">{item.title}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Social Media Icons */}
                <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
                  {[
                    { icon: FaInstagram, url: artistData.socialMedia.instagram, color: 'from-fuchsia-500 to-pink-600' },
                    { icon: FaYoutube, url: artistData.socialMedia.youtube, color: 'from-red-500 to-pink-600' },
                    { icon: FaTiktok, url: artistData.socialMedia.tiktok, color: 'from-cyan-500 to-blue-600' },
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-3 sm:p-4 bg-gradient-to-br ${social.color} rounded-full shadow-lg`}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon size={24} className="text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Spotify Music Section - REDESIGNED */}
      <section id="music" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/30 via-violet-900/30 to-cyan-900/30"></div>
        
        {/* Floating Vinyl Animation */}
        <motion.div 
          className="absolute top-10 sm:top-20 right-10 sm:right-20"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles size={80} className="sm:w-[120px] sm:h-[120px] text-cyan-500/20" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <motion.div
              className="text-center mb-12 sm:mb-16"
              animate={{
                textShadow: [
                  "0 0 20px rgba(217, 70, 239, 0.5)",
                  "0 0 40px rgba(217, 70, 239, 0.8)",
                  "0 0 20px rgba(217, 70, 239, 0.5)",
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4">
                <AnimatedGradientText>Spotify'da Dinle</AnimatedGradientText>
              </h2>
              <p className="text-fuchsia-300 text-lg sm:text-xl font-semibold">🎵 En sevilen şarkılarım</p>
            </motion.div>
          </AnimatedSection>
          
          {/* 4 Spotify Songs Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {spotifyTracks.map((track, index) => (
              <AnimatedSection key={track.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -20, scale: 1.05 }}
                  className="relative group h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${track.color} rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-slate-800/95 to-fuchsia-900/95 rounded-3xl overflow-hidden backdrop-blur-xl border-2 border-fuchsia-500/50 shadow-2xl h-full flex flex-col">
                    {/* Header with rotating vinyl icon */}
                    <div className="p-6 bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 border-b border-fuchsia-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className={`w-10 h-10 bg-gradient-to-br ${track.color} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <Music size={20} className="text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold">
                            <AnimatedGradientText>{track.title}</AnimatedGradientText>
                          </h3>
                          <p className="text-gray-400 text-xs">{track.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Spotify Embed */}
                    <div className="flex-1 p-4">
                      <iframe 
                        src={track.embedUrl}
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="rounded-2xl shadow-xl"
                        title={track.title}
                      ></iframe>
                    </div>
                    
                    {/* Play Button Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${track.color} rounded-full flex items-center justify-center shadow-2xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Play size={32} className="text-white ml-1" fill="white" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Albums Section */}
          <AnimatedSection>
            <h3 className="text-3xl sm:text-5xl font-bold mt-16 sm:mt-24 mb-8 sm:mb-12 text-center">
              <AnimatedGradientText>Albümler & EP'ler</AnimatedGradientText>
            </h3>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {albums.map((album, index) => (
              <AnimatedSection key={album.id}>
                <motion.div
                  whileHover={{ scale: 1.08, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <Card className="relative bg-gradient-to-br from-slate-800/90 to-fuchsia-900/90 border-2 border-cyan-500/50 overflow-hidden backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <motion.img 
                          src={album.cover} 
                          alt={album.title}
                          className="w-full h-48 sm:h-64 object-cover"
                          whileHover={{ scale: 1.3 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black via-violet-900/80 to-transparent flex items-center justify-center gap-3 sm:gap-4"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 text-white rounded-full font-bold shadow-lg text-xs sm:text-sm"
                            onClick={() => window.open(album.spotifyUrl, '_blank', 'noopener,noreferrer')}
                          >
                            Spotify
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-bold shadow-lg text-xs sm:text-sm"
                            onClick={() => window.open(album.appleMusicUrl, '_blank', 'noopener,noreferrer')}
                          >
                            Apple Music
                          </Button>
                        </motion.div>
                      </div>
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-fuchsia-900/50">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-fuchsia-300">{album.title}</h3>
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
      <section id="videos" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 text-center">
              <AnimatedGradientText>Video Klipler</AnimatedGradientText>
            </h2>
            <p className="text-center text-cyan-300 mb-12 sm:mb-16 text-lg sm:text-xl">YouTube'dan en yeni videolarım</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {youtubeVideos.map((video, index) => (
              <AnimatedSection key={video.id}>
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => window.open(artistData.socialMedia.youtube, '_blank', 'noopener,noreferrer')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-violet-900/50 to-transparent flex items-center justify-center"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    >
                      <motion.div
                        className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Play size={32} className="text-white ml-1 sm:ml-2" fill="white" />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-slate-800/90 to-fuchsia-900/90 border-2 border-cyan-500/30">
                    <h3 className="text-base sm:text-xl font-bold">
                      <AnimatedGradientText>{video.title}</AnimatedGradientText>
                    </h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection>
            <div className="text-center mt-8 sm:mt-12">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold shadow-2xl shadow-red-500/50"
                  onClick={() => window.open(artistData.socialMedia.youtube, '_blank', 'noopener,noreferrer')}
                >
                  <FaYoutube className="mr-2" size={24} />
                  Tüm Videolar
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Streaming Stats Section */}
      <section id="stats" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-cyan-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 text-center">
              <AnimatedGradientText>İstatistikler</AnimatedGradientText>
            </h2>
            <p className="text-center text-violet-300 mb-12 sm:mb-16 text-lg sm:text-xl">Dijital platformlarda başarılarım</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {streamingStats.map((stat, index) => (
              <AnimatedSection key={stat.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                  <Card className="relative bg-gradient-to-br from-slate-800/90 to-fuchsia-900/90 border-2 border-fuchsia-500/50 backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-4 sm:p-8 text-center">
                      <div className={`w-12 h-12 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                        <TrendingUp size={24} className="sm:w-9 sm:h-9 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-300 mb-1 sm:mb-2">{stat.platform}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">{stat.metric}</p>
                      <p className="text-2xl sm:text-4xl font-bold">
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
      <section id="news" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-gradient-to-b from-black via-fuchsia-950/10 to-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 text-center">
              <AnimatedGradientText>Son Haberler</AnimatedGradientText>
            </h2>
            <p className="text-center text-fuchsia-300 mb-12 sm:mb-16 text-lg sm:text-xl">Basında ve sosyal medyada</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((news, index) => (
              <AnimatedSection key={news.id}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative group h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <Card className="relative bg-gradient-to-br from-slate-800/90 to-fuchsia-900/90 border-2 border-cyan-500/50 overflow-hidden backdrop-blur-sm shadow-2xl h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative overflow-hidden h-40 sm:h-48">
                        <motion.img 
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2 sm:mb-3 text-xs sm:text-sm">
                          <Clock size={14} />
                          <span>{new Date(news.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                          <AnimatedGradientText>{news.title}</AnimatedGradientText>
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{news.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 sm:py-12 px-4 sm:px-6 border-t-2 border-fuchsia-500/30 bg-gradient-to-r from-slate-900/60 to-fuchsia-900/40 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                <AnimatedGradientText>{artistData.name}</AnimatedGradientText>
              </h3>
              <p className="text-violet-300 font-semibold text-sm sm:text-base">{artistData.tagline}</p>
            </div>
            
            {/* Enhanced Breathing Social Media Icons */}
            <div className="flex gap-3 sm:gap-4">
              {[
                { icon: Music, url: artistData.socialMedia.spotify, color: 'from-green-400 to-emerald-600', name: 'Spotify' },
                { icon: FaInstagram, url: artistData.socialMedia.instagram, color: 'from-fuchsia-500 to-pink-600', name: 'Instagram' },
                { icon: FaYoutube, url: artistData.socialMedia.youtube, color: 'from-red-500 to-pink-600', name: 'YouTube' },
                { icon: FaTiktok, url: artistData.socialMedia.tiktok, color: 'from-cyan-500 to-blue-600', name: 'TikTok' },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3 sm:p-4 bg-gradient-to-br ${social.color} rounded-full shadow-2xl relative group`}
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0 0 20px rgba(217, 70, 239, 0.3)",
                      "0 0 40px rgba(217, 70, 239, 0.8)",
                      "0 0 20px rgba(217, 70, 239, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.5, 
                    rotate: 360,
                    boxShadow: "0 0 60px rgba(217, 70, 239, 1)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6 text-white relative z-10" />
                  
                  {/* Pulsating Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Tooltip on hover */}
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={{ opacity: 0, y: 5 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {social.name}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>© 2024 {artistData.name}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;