// src/components/landing/Stats.jsx
import React from 'react';
import { Globe, Clock, CheckCircle } from 'lucide-react';

const Stats = () => {
  const stats = [
    { number: "99.9%", label: "Uptime Sistem", icon: <Globe className="w-6 h-6" /> },
    { number: "5x", label: "Peningkatan Efisiensi", icon: <Clock className="w-6 h-6" /> },
    { number: "100%", label: "Digitalisasi Proses", icon: <CheckCircle className="w-6 h-6" /> }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;