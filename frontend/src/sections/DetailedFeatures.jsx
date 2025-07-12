// src/components/landing/DetailedFeatures.jsx
import React from 'react';
import { 
  FileText, Users, Calendar, FolderOpen, 
  FileCheck, Bell, BarChart3, Archive, Activity, CheckCircle 
} from 'lucide-react';

const DetailedFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solusi Administrasi Lengkap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 Modul Utama yang Dirancang Khusus untuk Kebutuhan Administrasi Jurusan Modern
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manajemen Surat */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Manajemen Surat</h3>
            </div>
            <p className="text-gray-600 mb-4">Sistem pencatatan dan pelacakan surat masuk & keluar yang terintegrasi</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Input surat masuk & keluar</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Upload file PDF surat</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Nomor surat otomatis</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Status disposisi & persetujuan</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pencarian & cetak bukti surat</li>
            </ul>
          </div>

          {/* Data Pegawai & Mahasiswa */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Data Pegawai & Mahasiswa</h3>
            </div>
            <p className="text-gray-600 mb-4">Pengelolaan data civitas akademik yang komprehensif</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Data dosen & staff (NIP/NIK, jabatan)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Data mahasiswa (NIM, nama, prodi)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Import/export via Excel</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengelompokan berdasarkan prodi</li>
            </ul>
          </div>

          {/* Jadwal & Agenda */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Jadwal & Agenda Kegiatan</h3>
            </div>
            <p className="text-gray-600 mb-4">Pengelolaan jadwal kegiatan jurusan dan rapat terpadu</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Kalender kegiatan interaktif</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengaturan rapat & agenda jurusan</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Undangan kegiatan otomatis</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Notifikasi pengingat</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Rekap kehadiran</li>
            </ul>
          </div>

          {/* Dokumen Digital */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Pengelolaan Dokumen Digital</h3>
            </div>
            <p className="text-gray-600 mb-4">Penyimpanan SOP, form, dan dokumen penting jurusan</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Upload & unduh dokumen</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Klasifikasi (SOP, form, laporan)</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pencarian dokumen cepat</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Hak akses berdasarkan peran</li>
            </ul>
          </div>

          {/* Sistem Pengajuan */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                <FileCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Sistem Pengajuan Administratif</h3>
            </div>
            <p className="text-gray-600 mb-4">Platform pengajuan digital untuk mahasiswa dan dosen</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengajuan surat aktif kuliah</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengajuan cuti kuliah</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengajuan izin kegiatan</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Status & tracking pengajuan</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Tanda tangan digital</li>
            </ul>
          </div>

          {/* Notifikasi Otomatis */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Notifikasi Otomatis</h3>
            </div>
            <p className="text-gray-600 mb-4">Sistem notifikasi real-time untuk informasi terkini</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Email & WhatsApp notifikasi</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pengingat kegiatan & deadline</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Status persetujuan surat</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Notifikasi internal sistem</li>
            </ul>
          </div>
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Dashboard Statistik */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dashboard Statistik</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Ringkasan kegiatan administratif dengan visualisasi data</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Grafik surat masuk/keluar</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Statistik pengajuan bulanan</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Data dosen & mahasiswa aktif</li>
            </ul>
          </div>

          {/* Arsip Digital */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center mr-3">
                <Archive className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Arsip Digital</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Penyimpanan riwayat semua aktivitas administratif</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Arsip surat & dokumen</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Riwayat kegiatan lengkap</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Riwayat pengajuan</li>
            </ul>
          </div>

          {/* Audit Trail */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Audit Trail</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Log aktivitas untuk keamanan dan transparansi sistem</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Tracking semua tindakan user</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Waktu & detail aktivitas</li>
              <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-500 mr-2" />Laporan audit komprehensif</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;