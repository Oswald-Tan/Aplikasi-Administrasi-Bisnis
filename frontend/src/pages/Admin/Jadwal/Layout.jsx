import { useState, useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config";
import Swal from "sweetalert2";
import Button from "../../../components/ui/Button";
import ButtonAction from "../../../components/ui/ButtonAction";
import { HiOutlineCalendar } from "react-icons/hi";
import { RiApps2AddFill } from "react-icons/ri";
import {
  MdEditSquare,
  MdDelete,
  MdSearch,
  MdKeyboardArrowDown,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import ModalEditJadwal from "./ModalEditJadwal";
import ModalSearchJadwal from "./ModalSearchJadwal";

const Layout = () => {
  const [jadwal, setJadwal] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelasId, setSelectedKelasId] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [message, setMessage] = useState("");
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // Tambahkan state untuk initial load
  const { user: authUser } = useSelector((state) => state.auth);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Fungsi untuk membuka modal edit
  const handleEdit = (jadwal) => {
    setSelectedJadwal(jadwal);
    setShowEditModal(true);
  };

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    setMessage("");
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  const prodiAdmin = useMemo(() => {
    return authUser?.prodiAdmin || null;
  }, [authUser]);

  useEffect(() => {
    if (prodiAdmin) {
      getJadwal();
    }
  }, [page, keyword, limit, selectedKelasId, prodiAdmin]);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setKeyword(query);
      setPage(0);
    }, 500);

    setTypingTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [query]);

  const compareKelas = (kelasA, kelasB) => {
    const parseKelas = (kelas) => {
      const parts = kelas.split(" ");
      return {
        angka1: parseInt(parts[0], 10),
        jurusan: parts[1],
        angka2: parseInt(parts[2], 10),
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
      setIsLoadingData(true);
      try {
        const res = await axios.get(`${API_URL}/kelas`, {
          params: {
            prodi: prodiAdmin,
            page: 0,
            limit: 100,
          },
        });

        const kelasData = res.data?.result || res.data || [];
        console.log("Kelas", kelasData);
        setKelasList(kelasData);
      } catch (error) {
        console.error("Error fetching data", error);
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text:
            error.response?.data?.message ||
            "Terjadi kesalahan saat mengambil data kelas",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    if (prodiAdmin) {
      _listDataKelas();
    }
  }, [prodiAdmin]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedKelasId(selectedId);
    setPage(0); // Reset ke halaman pertama saat kelas berubah
    setMessage("");
  };

  const getJadwal = async () => {
    setTableLoading(true);
    setMessage("");

    try {
      const res = await axios.get(`${API_URL}/jadwal-matkul`, {
        params: {
          search: keyword,
          page: page,
          limit: limit,
          kelas: selectedKelasId,
          prodi: prodiAdmin,
        },
      });

      // Jika tidak ada data yang ditemukan
      if (!res.data?.result?.length) {
        setMessage("Tidak ada data yang ditemukan");
        setJadwal([]);
        setPages(0);
        setRows(0);
        return;
      }

      const totalPage = res.data.totalPage || 0;
      const totalRows = res.data.totalRows || 0;
      const currentPage = res.data.page || 0;

      const sortedJadwal = res.data.result.sort((a, b) => {
        return compareKelas(a.Kela.nama_kelas, b.Kela.nama_kelas);
      });

      setJadwal(sortedJadwal);
      setPages(totalPage);
      setRows(totalRows);
      setPage(currentPage);

      setInitialLoad(false); // Set initialLoad ke false setelah data dimuat
    } catch (error) {
      console.error("Error fetching data", error);

      setJadwal([]);
      setPages(0);
      setRows(0);

      // Penanganan error umum
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            `Error: ${error.response.status} - ${
              error.response.data.message || "Unknown error"
            }`
          );
        }
      } else if (error.request) {
        setMessage("Network error: Tidak ada respons dari server");
      } else {
        setMessage("Error: " + error.message);
      }
    } finally {
      setTableLoading(false);
    }
  };

  // Tampilkan loading spinner selama initial load
  if (initialLoad && !authUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/jadwal-matkul/${id}`);
          getJadwal();
          Swal.fire("Dihapus!", "Data berhasil dihapus.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Terjadi kesalahan",
            "error"
          );
        }
      }
    });
  };

  if (initialLoad && !authUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <ModalEditJadwal
        isOpen={showEditModal}
        handleClose={() => setShowEditModal(false)}
        onSuccess={getJadwal}
        jadwalData={selectedJadwal}
      />
      <ModalSearchJadwal
        isOpen={showSearchModal}
        handleClose={() => setShowSearchModal(false)}
      />
      <div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Jadwal Kuliah
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex gap-2">
            <Button
              text="Add Jadwal"
              to={`/add/jadwal`}
              iconPosition="left"
              icon={<RiApps2AddFill />}
              width="min-w-[120px]"
              className="bg-purple-500 hover:bg-purple-600"
            />
            <Button
              text="Lihat Jadwal"
              onClick={handleSearch}
              iconPosition="left"
              icon={<HiOutlineCalendar />}
              width="min-w-[120px]"
              className="bg-teal-500 hover:bg-teal-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="flex gap-2">
              <div className="flex items-center relative">
                <select
                  className="px-4 py-3 border dark:text-white border-gray-300 dark:border-[#3f3f3f] rounded-md text-sm appearance-none pr-8 focus:outline-none bg-white dark:bg-[#282828]"
                  value={selectedKelasId}
                  onChange={handleSelectChange}
                  disabled={tableLoading || isLoadingData}
                >
                  <option value="">Pilih Kelas</option>
                  {kelasList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_kelas}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 text-gray-500 pointer-events-none">
                  <MdKeyboardArrowDown />
                </span>
              </div>
            </div>

            <form onSubmit={searchData} className="w-full">
              <div className="flex items-center relative">
                <input
                  type="text"
                  className="pr-10 pl-4 py-3 border dark:text-white border-gray-300 dark:border-[#3f3f3f] rounded-md w-full text-sm focus:outline-none bg-white dark:bg-[#282828]"
                  placeholder="Cari jadwal..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <MdSearch
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </form>

            <div className="flex gap-2">
              <div className="flex items-center relative">
                <select
                  id="limit"
                  name="limit"
                  className="px-4 py-3 border dark:text-white border-gray-300 dark:border-[#3f3f3f] rounded-md text-sm appearance-none pr-7 focus:outline-none bg-white dark:bg-[#282828]"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(0);
                  }}
                  disabled={tableLoading}
                >
                  <option value="10">10 baris</option>
                  <option value="25">25 baris</option>
                  <option value="50">50 baris</option>
                  <option value="100">100 baris</option>
                </select>
                <span className="absolute right-3 text-gray-500 pointer-events-none">
                  <MdKeyboardArrowDown />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto bg-white dark:bg-[#282828] rounded-xl p-4 shadow-md relative">
          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.includes("Error") ||
                message.includes("Prodi admin tidak ditemukan")
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {message}
            </div>
          )}

          {tableLoading && (
            <div className="absolute inset-0 bg-white dark:bg-[#282828] bg-opacity-80 flex items-center justify-center rounded-xl z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {jadwal.length === 0 && !tableLoading && !message ? (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                Tidak ada data dokumen
              </div>
              <div className="text-sm text-gray-400">
                Belum ada data dokumen
              </div>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-300 dark:divide-[#3f3f3f]">
                <thead>
                  <tr className="text-sm dark:text-white">
                    <th className="px-4 py-3 text-left font-medium">No</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Mata Kuliah
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Kode Mata Kuliah
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Kelas</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Dosen Pengajar
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Hari</th>
                    <th className="px-4 py-3 text-left font-medium">Ruangan</th>
                    <th className="px-4 py-3 text-left font-medium">Jam</th>
                    <th className="px-4 py-3 text-left font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#3f3f3f]">
                  {jadwal.map((item, index) => (
                    <tr
                      key={item.id}
                      className="text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333]"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.Matkul?.mata_kuliah || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.Matkul?.kode_matkul || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.Kela?.nama_kelas || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.Dosen?.fullname || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.hari}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.ruangan}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.jam_matkul}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <ButtonAction
                            onClick={() => handleEdit(item)}
                            icon={<MdEditSquare size={16} />}
                            className="bg-blue-600 hover:bg-blue-700"
                            tooltip="Edit"
                          />
                          <ButtonAction
                            onClick={() => handleDelete(item.id)}
                            icon={<MdDelete size={16} />}
                            className="bg-red-600 hover:bg-red-700"
                            tooltip="Hapus"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {(rows > 0 || pages > 0) && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Show {Math.min(limit, jadwal.length)} dari {rows} data
            </div>

            {pages > 1 && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pages}
                forcePage={page}
                onPageChange={changePage}
                containerClassName="flex items-center gap-1"
                pageLinkClassName="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white" // Tambah dark:text-white di sini
                previousLinkClassName="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white" // Tambah dark:text-white di sini
                nextLinkClassName="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white" // Tambah dark:text-white di sini
                activeLinkClassName="bg-purple-500 text-white border-purple-500"
                disabledLinkClassName="opacity-50 cursor-not-allowed"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
