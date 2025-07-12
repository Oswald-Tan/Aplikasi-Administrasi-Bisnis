import { Users, BookOpen, GraduationCap, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';

const LoginPortal = () => {
  const loginRoles = [
    {
      title: "Admin Jurusan",
      description:
        "Portal khusus untuk administrator tingkat jurusan dengan akses penuh ke sistem manajemen.",
      icon: <Users className="w-12 h-12" />,
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
      to: "/login/admin-jurusan",
    },
    {
      title: "Admin Prodi",
      description:
        "Dashboard administrasi program studi dengan fitur khusus pengelolaan akademik.",
      icon: <BookOpen className="w-12 h-12" />,
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "from-emerald-600 to-teal-600",
      to: "/login/admin-prodi",
    },
    {
      title: "Dosen",
      description:
        "Akses dosen untuk mengelola mata kuliah, nilai, dan interaksi dengan sistem akademik.",
      icon: <GraduationCap className="w-12 h-12" />,
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
      to: "/login/dosen",
    },
  ];

  return (
    <section id="login" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Portal Login
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih portal sesuai dengan peran Anda untuk mengakses sistem
            administrasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loginRoles.map((role, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${role.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {role.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {role.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {role.description}
                </p>
                <Link
                  to={role.to}
                  className={`w-full bg-gradient-to-r ${role.gradient} hover:${role.hoverGradient} text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group`}
                >
                  {role.title}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoginPortal;
