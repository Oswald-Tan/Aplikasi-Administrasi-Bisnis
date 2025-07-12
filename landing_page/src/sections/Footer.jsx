// src/components/landing/Footer.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">POLIMDO</h3>
                <p className="text-gray-400 text-sm">Sistem Administrasi Digital</p>
              </div>
            </div>
            <p className="text-gray-400">
              Transformasi digital untuk efisiensi administrasi modern di Jurusan Administrasi Bisnis Politeknik Negeri Manado.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-2 text-gray-400">
              <p>Jurusan Administrasi Bisnis</p>
              <p>Politeknik Negeri Manado</p>
              <p>Manado, Sulawesi Utara</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Sistem</h4>
            <div className="space-y-2 text-gray-400">
              <p>Version 1.0</p>
              <p>© 2025 Politeknik Negeri Manado</p>
              <p>Semua hak dilindungi undang-undang</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Dikembangkan dengan ❤️ untuk kemajuan pendidikan Indonesia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;