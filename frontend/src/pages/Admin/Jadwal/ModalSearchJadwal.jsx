import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../../config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ModalSearchJadwal = ({ isOpen, handleClose }) => {
  const [kelas, setKelas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const { user: authUser } = useSelector((state) => state.auth);

  const prodiAdmin = useMemo(() => {
    return authUser?.prodiAdmin || null;
  }, [authUser]);

  // Reset state saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedKelas(null);
    }
  }, [isOpen]);

  const compareKelas = (kelasA, kelasB) => {
    // Handle undefined/null values
    if (!kelasA || !kelasB) return 0;
    
    const parseKelas = (kelas) => {
      if (!kelas) return { angka1: 0, jurusan: '', angka2: 0 };
      
      const parts = kelas.split(" ");
      return {
        angka1: parseInt(parts[0], 10) || 0,
        jurusan: parts[1] || '',
        angka2: parseInt(parts[2], 10) || 0,
      };
    };

    const parsedA = parseKelas(kelasA);
    const parsedB = parseKelas(kelasB);

    if (parsedA.angka1 !== parsedB.angka1) {
      return parsedA.angka1 - parsedB.angka1;
    }
    if (parsedA.jurusan !== parsedB.jurusan) {
      return parsedA.jurusan.localeCompare(parsedB.jurusan);
    }
    return parsedA.angka2 - parsedB.angka2;
  };

  useEffect(() => {
    const _listDataKelas = async () => {
      if (!isOpen) return;

      setIsLoadingData(true);
      try {
        const kelasRes = await axios.get(`${API_URL}/kelas`, { 
          params: { prodi: prodiAdmin } 
        });

        const sortedKelas = kelasRes.data?.result.sort((a, b) => {
          return compareKelas(a.nama_kelas, b.nama_kelas);
        });

        setKelas(sortedKelas);
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

    _listDataKelas();
  }, [isOpen, prodiAdmin]);

  // Handle class selection from dropdown
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const kelasObj = kelas.find(k => k.id == selectedId);
    setSelectedKelas(kelasObj);
  };

  // Combine selected class and search results
  const allKelas = useMemo(() => {
    // Filter classes based on search term
    const filteredKelas = searchTerm 
      ? kelas.filter(k => k.nama_kelas.toLowerCase().includes(searchTerm.toLowerCase()))
      : [];

    const results = [];
    if (selectedKelas) results.push(selectedKelas);
    filteredKelas.forEach(k => {
      if (!selectedKelas || k.id !== selectedKelas.id) results.push(k);
    });
    return results;
  }, [selectedKelas, searchTerm, kelas]);

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
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            Search Jadwal
          </h2>

          {isLoadingData ? (
            <div className="flex justify-center items-center py-10">
              <FaSpinner className="animate-spin text-2xl text-indigo-600" />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kelas Dropdown */}
                <div>
                  <label className="block text-sm font-medium dark:text-white mb-1">
                    Pilih Kelas <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="idKelas"
                    value={selectedKelas?.id || ""}
                    onChange={handleSelectChange}
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

                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium dark:text-white mb-1">
                    Cari Kelas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                    placeholder="Cari kelas..."
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="mt-6">
                {allKelas.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {allKelas.map((kelasItem) => (
                      <Link
                        to={`/lihat-jadwal-kelas/${kelasItem.nama_kelas}`}
                        key={kelasItem.id}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {kelasItem.nama_kelas}
                      </Link>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <p className="p-3 rounded-md bg-red-100 text-red-700 text-sm mt-4">Kelas tidak ditemukan.</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ModalSearchJadwal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalSearchJadwal;