// src/components/landing/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Transformasi Digital Administrasi",
      subtitle: "Modernisasi proses administratif dengan teknologi terdepan",
      bg: "from-blue-600 to-purple-700"
    },
    {
      title: "Efisiensi Maksimal",
      subtitle: "Otomatisasi workflow untuk produktivitas yang lebih tinggi",
      bg: "from-emerald-600 to-teal-700"
    },
    {
      title: "Kolaborasi Seamless",
      subtitle: "Integrasi perfect antara admin jurusan, prodi, dan dosen",
      bg: "from-orange-600 to-red-700"
    }
  ];

  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`text-center text-white transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Aplikasi Perkantoran Modern
            <span className="block text-3xl md:text-4xl font-medium mt-2 text-blue-200">
              Berbasis Digital
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Untuk Peningkatan Efisiensi Proses Administratif di Jurusan Administrasi Bisnis Politeknik Negeri Manado
          </p>
          <p className="text-lg md:text-xl text-blue-200 mb-12">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('login').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Mulai Sekarang
            </button>
            <button 
              onClick={() => document.getElementById('fitur').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;