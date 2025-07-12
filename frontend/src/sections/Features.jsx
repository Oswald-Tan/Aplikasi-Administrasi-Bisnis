// src/components/landing/Features.jsx
import React from 'react';
import { FileText, Users, BarChart3, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Manajemen Surat Digital",
      description: "Sistem pencatatan dan pelacakan surat masuk/keluar dengan nomor otomatis, upload PDF, dan tracking disposisi."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Data Pegawai & Mahasiswa",
      description: "Pengelolaan data civitas akademik lengkap dengan import/export Excel dan pengelompokan berdasarkan prodi."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dashboard & Statistik",
      description: "Dashboard analitik dengan grafik kegiatan, statistik surat, dan monitoring aktivitas administratif real-time."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keamanan Multi-Role",
      description: "Sistem keamanan berlapis dengan kontrol akses berbasis role untuk Admin, Dosen, dan Mahasiswa."
    }
  ];

  return (
    <section id="fitur" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dilengkapi dengan teknologi terdepan untuk mendukung transformasi digital administrasi modern
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-blue-600 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;