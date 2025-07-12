import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../../config";
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

const ModalEditJadwal = ({ isOpen, handleClose, onSuccess, jadwalData }) => {
  const [matkul, setMatkul] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false); // khusus loading data referensi
  const [isSubmitting, setIsSubmitting] = useState(false); // khusus proses submit
  const { user: authUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    idMatkul: "",
    idKelas: "",
    hari: "",
    ruangan: "",
    jam_matkul: "",
    dosen_pengajar: "",
    prodiAdmin: "",
  });

  const prodiAdmin = useMemo(() => {
    return authUser?.prodiAdmin || null;
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setIsLoadingData(true);
      try {
        const [matkulRes, kelasRes, dosenRes] = await Promise.all([
          axios.get(`${API_URL}/matkul`, { params: { prodi: prodiAdmin } }),
          axios.get(`${API_URL}/kelas`, { params: { prodi: prodiAdmin } }),
          axios.get(`${API_URL}/dosen`, { params: { adminProdi: prodiAdmin } }),
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
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [isOpen, prodiAdmin]);

  useEffect(() => {
    if (jadwalData && isOpen) {
      setFormData({
        idMatkul: jadwalData.idMatkul || "",
        idKelas: jadwalData.idKelas || "",
        hari: jadwalData.hari || "",
        ruangan: jadwalData.ruangan || "",
        jam_matkul: jadwalData.jam_matkul || "",
        dosen_pengajar: jadwalData.dosen_pengajar || "",
        prodiAdmin: prodiAdmin,
      });
    }
  }, [jadwalData, isOpen, prodiAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`${API_URL}/jadwal-matkul/${jadwalData.id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jadwal berhasil diperbarui",
      });
      onSuccess();
      handleClose();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Terjadi kesalahan saat memperbarui jadwal";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-5">
      <div className="w-full max-w-2xl bg-white dark:bg-[#282828] rounded-md p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-[#909090] flex items-center rounded-full text-white transition-all duration-300 ease-in-out hover:bg-[#6b6b6b]"
        >
          <IoIosClose size={28} />
        </button>

        <div>
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">Edit Jadwal</h2>

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
                  disabled={isLoadingData || isSubmitting}
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
                  disabled={isLoadingData || isSubmitting}
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
                  disabled={isLoadingData || isSubmitting}
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
                <input
                  type="text"
                  name="ruangan"
                  value={formData.ruangan}
                  onChange={handleChange}
                 className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                  required
                  placeholder="Contoh: A101"
                  disabled={isLoadingData || isSubmitting}
                />
              </div>

              {/* Jam Mata Kuliah */}
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
                  disabled={isLoadingData || isSubmitting}
                >
                  <option value="">Pilih Jam</option>
                  {jamOptions.map((jam, index) => (
                    <option key={index} value={jam}>
                      {jam}
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
                  disabled={isLoadingData || isSubmitting}
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

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="mr-3 px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md shadow hover:bg-gray-50 focus:outline-none dark:text-white dark:bg-[#3f3f3f] dark:border-[#575757]"
                disabled={isSubmitting || isLoadingData}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingData}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ModalEditJadwal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  jadwalData: PropTypes.object.isRequired,
};

export default ModalEditJadwal;