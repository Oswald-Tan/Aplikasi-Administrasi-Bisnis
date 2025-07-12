import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const hariOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const jamOptions = [
  "07:45 - 08:35",
  "08:35 - 09:25",
  "09:25 - 10:15",
  "10:45 - 11:35",
  "11:35 - 12:25",
  "12:55 - 13:45",
  "13:45 - 14:35",
  "14:35 - 15:25",
];
const runganOptions = [
  "Ruangan 1",
  "Ruangan 2",
  "Ruangan 3",
  "Ruangan 4",
  "Ruangan 5",
];

const Layout = () => {
  const navigate = useNavigate();
  const [matkul, setMatkul] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const { user: authUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idMatkul: "",
    idKelas: "",
    hari: "",
    ruangan: "",
    jam_matkul: "",
    dosen_pengajar: "",
    prodiAdmin: authUser?.prodiAdmin || "",
  });
  const [msg, setMsg] = useState("");

  const prodiAdmin = useMemo(() => {
    return authUser?.prodiAdmin || null;
  }, [authUser]);

  const _listData = async () => {
    try {
      setLoading(true);

      // Mengambil data mata kuliah, dosen, dan kelas secara paralel
      const [matkulRes, kelasRes, dosenRes] = await Promise.all([
        axios.get(`${API_URL}/matkul`, {
          params: { prodi: prodiAdmin },
        }),
        axios.get(`${API_URL}/kelas`, {
          params: { prodi: prodiAdmin },
        }),
        axios.get(`${API_URL}/dosen`, {
          params: { adminProdi: prodiAdmin },
        }),
      ]);

      setMatkul(matkulRes.data?.result || []);
      setKelas(kelasRes.data?.result || []);
      setDosen(dosenRes.data?.result || []);
    } catch (error) {
      console.error("Error fetching data", error);
      Swal.fire({
        icon: "error",
        title: "Gagal memuat data",
        text: "Terjadi kesalahan saat mengambil data referensi",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prodiAdmin) {
      _listData();
    }
  }, [prodiAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      // Kirim data ke backend
      await axios.post(`${API_URL}/jadwal-matkul`, {
        ...formData,
        prodiAdmin: prodiAdmin,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jadwal berhasil ditambahkan",
      });

      // Reset form
      setFormData({
        idMatkul: "",
        idKelas: "",
        hari: "",
        ruangan: "",
        jam_matkul: "",
        dosen_pengajar: "",
        prodiAdmin: prodiAdmin,
      });

      // Navigasi ke halaman list jadwal
      navigate("/jadwal");
    } catch (error) {
      let errorMsg = "Terjadi kesalahan saat menambahkan jadwal";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      setMsg(errorMsg);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-black-100 dark:text-white mb-4">
        Tambah Jadwal
      </h1>

      <div className="mt-5 overflow-x-auto bg-white dark:bg-[#282828] rounded-xl p-4 shadow-md relative">
        {msg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mata Kuliah */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Mata Kuliah <span className="text-red-500">*</span>
              </label>
              <select
                name="idMatkul"
                value={formData.idMatkul}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Mata Kuliah</option>
                {matkul.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.mata_kuliah}
                  </option>
                ))}
              </select>
            </div>

            {/* Kelas */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Kelas <span className="text-red-500">*</span>
              </label>
              <select
                name="idKelas"
                value={formData.idKelas}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Kelas</option>
                {kelas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_kelas}
                  </option>
                ))}
              </select>
            </div>

            {/* Hari */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Hari <span className="text-red-500">*</span>
              </label>
              <select
                name="hari"
                value={formData.hari}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Hari</option>
                {hariOptions.map((hari, index) => (
                  <option key={index} value={hari}>
                    {hari}
                  </option>
                ))}
              </select>
            </div>

            {/* Ruangan */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Ruangan <span className="text-red-500">*</span>
              </label>
              <select
                name="ruangan"
                value={formData.ruangan}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Ruangan</option>
                {runganOptions.map((ruangan, index) => (
                  <option key={index} value={ruangan}>
                    {ruangan}
                  </option>
                ))}
              </select>
            </div>

            {/* Jam Mata Kuliah (format: HH:mm - HH:mm) */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Jam Mata Kuliah <span className="text-red-500">*</span>
              </label>
              <select
                name="jam_matkul"
                value={formData.jam_matkul}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Jam</option>
                {jamOptions.map((jam_matkul, index) => (
                  <option key={index} value={jam_matkul}>
                    {jam_matkul}
                  </option>
                ))}
              </select>
            </div>

            {/* Dosen Pengajar */}
            <div>
              <label className="block text-sm font-medium dark:text-white mb-1">
                Dosen Pengajar <span className="text-red-500">*</span>
              </label>
              <select
                name="dosen_pengajar"
                value={formData.dosen_pengajar}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              >
                <option value="">Pilih Dosen</option>
                {dosen.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.fullname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Jadwal"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/jadwal")}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 text-sm font-semibold rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Layout;
