// src/components/landing/Header.jsx
import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">POLIMDO</h1>
              <p className="text-sm text-gray-600">
                Sistem Administrasi Digital
              </p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#beranda"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Beranda
            </a>
            <a
              href="#fitur"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Fitur
            </a>
            <Link
              to="/login-choose"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
