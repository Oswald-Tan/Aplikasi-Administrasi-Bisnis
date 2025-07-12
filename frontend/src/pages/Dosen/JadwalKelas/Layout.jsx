import { useState, useEffect, useMemo } from "react";
import { API_URL } from "../../../config";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const Layout = () => {
  const [kelas, setKelas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const { user: authUser } = useSelector((state) => state.auth);

  const prodiDosen = useMemo(() => {
    return authUser?.prodiDosen || null;
  }, [authUser]);

  useEffect(() => {
    setSearchTerm("");
    setSelectedKelas(null);
  }, []);

  console.log("User", authUser);

  // Fungsi untuk mengurutkan nama kelas
  const compareKelas = (kelasA, kelasB) => {
    // Handle undefined/null values
    if (!kelasA || !kelasB) return 0;

    const parseKelas = (kelas) => {
      if (!kelas) return { angka1: 0, jurusan: "", angka2: 0 };

      const parts = kelas.split(" ");
      return {
        angka1: parseInt(parts[0], 10) || 0,
        jurusan: parts[1] || "",
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
    const controller = new AbortController();

    const _listDataKelas = async () => {
      // Skip API call if prodiDosen is not available
      if (!prodiDosen) {
        setKelas([]);
        setIsLoadingData(false);
        return;
      }

      setIsLoadingData(true);
      try {
        const kelasRes = await axios.get(`${API_URL}/kelas`, {
          params: { prodi: prodiDosen },
          signal: controller.signal,
        });

        const sortedKelas =
          kelasRes.data?.result?.sort((a, b) => {
            return compareKelas(a.nama_kelas, b.nama_kelas);
          }) || [];

        setKelas(sortedKelas);
      } catch (error) {
        // Only log actual errors (not cancellations)
        if (!axios.isCancel(error)) {
          console.error(
            "Error fetching data",
            error.response?.data || error.message
          );
          Swal.fire({
            icon: "error",
            title: "Gagal memuat data",
            text:
              error.response?.data?.message ||
              "Terjadi kesalahan saat mengambil data kelas",
          });
        }
      } finally {
        setIsLoadingData(false);
      }
    };

    _listDataKelas();

    // Cleanup function to cancel ongoing requests
    return () => controller.abort();
  }, [prodiDosen]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const kelasObj = kelas.find((k) => k.id == selectedId);
    setSelectedKelas(kelasObj);
  };

  // Combine selected class and search results
  const allKelas = useMemo(() => {
    // Filter classes based on search term
    const filteredKelas = searchTerm
      ? kelas.filter((k) =>
          k.nama_kelas.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    const results = [];
    if (selectedKelas) results.push(selectedKelas);
    filteredKelas.forEach((k) => {
      if (!selectedKelas || k.id !== selectedKelas.id) results.push(k);
    });
    return results;
  }, [selectedKelas, searchTerm, kelas]);

  return (
    <div className="bg-white dark:bg-[#282828] rounded-md p-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Search Jadwal
        </h2>

        {!prodiDosen ? (
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
            <p className="font-medium">
              Informasi program studi tidak ditemukan
            </p>  
            <p className="text-sm mt-1">
              Silakan hubungi administrator untuk menambahkan program studi pada
              akun Anda.
            </p>
          </div>
        ) : isLoadingData ? (
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
                  className="w-full px-3 py-3 border dark:text-white border-gray-300 dark:border-[#575757] rounded-md focus:outline-none bg-[#f3f4f6] sm:text-sm dark:bg-[#3f3f3f]"
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
                  className="w-full px-3 py-3 border dark:text-white border-gray-300 dark:border-[#575757] rounded-md focus:outline-none bg-[#f3f4f6] sm:text-sm dark:bg-[#3f3f3f]"
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
                      to={`/lihat-jadwal-kelas-dosen/${kelasItem.nama_kelas}`}
                      key={kelasItem.id}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {kelasItem.nama_kelas}
                    </Link>
                  ))}
                </div>
              ) : searchTerm ? (
                <p className="p-3 rounded-md bg-red-100 text-red-700 text-sm mt-4">
                  Kelas tidak ditemukan.
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
