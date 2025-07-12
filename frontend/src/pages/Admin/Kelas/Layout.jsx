import { useState, useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config";
import Swal from "sweetalert2";
import Button from "../../../components/ui/Button";
import ButtonAction from "../../../components/ui/ButtonAction";
import { RiApps2AddFill } from "react-icons/ri";
import {
  MdDelete,
} from "react-icons/md";
import ModalAddKelas from "./ModalAddKelas";

const Layout = () => {
  const [kelas, setKelas] = useState([]);
  const [message, setMessage] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // Tambahkan state untuk initial load
  const [showModal, setShowModal] = useState(false);
  const { user: authUser } = useSelector((state) => state.auth);

   const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const prodiAdmin = useMemo(() => {
    return authUser?.prodiAdmin || null;
  }, [authUser]);

 
  useEffect(() => {
    if (prodiAdmin) {
      getKelas();
    }
  }, [prodiAdmin]);

  const getKelas = async () => {
    setTableLoading(true);
    setMessage("");

    try {
      const res = await axios.get(`${API_URL}/kelas`, {
        params: {
          prodi: prodiAdmin,
        },
      });

      // Jika tidak ada data yang ditemukan
      if (!res.data || !res.data.result || res.data.result.length === 0) {
        setMessage("Tidak ada data yang ditemukan");
        return;
      }

      const resultData = res.data.result;

      setKelas(resultData);

      setInitialLoad(false); // Set initialLoad ke false setelah data dimuat
    } catch (error) {
      console.error("Error fetching data", error);

      setKelas([]);

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
          await axios.delete(`${API_URL}/kelas/${id}`);
          getKelas();
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
    <ModalAddKelas
      isOpen={showModal} handleClose={handleCloseModal} onSuccess={getKelas}
    />
      <div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Kelas</h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex gap-2">
            <Button
              text="Add Kelas"
              onClick={handleOpenModal}
              iconPosition="left"
              icon={<RiApps2AddFill />}
              width="min-w-[120px]"
              className="bg-purple-500 hover:bg-purple-600"
            />
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

          {kelas.length === 0 && !tableLoading && !message ? (
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
                    <th className="px-4 py-3 text-left font-medium">Kelas</th>
                    <th className="px-4 py-3 text-left font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-[#3f3f3f]">
                  {kelas.map((kelas, index) => (
                    <tr
                      key={kelas.id}
                      className="text-sm dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333]"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {kelas.nama_kelas}
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <ButtonAction
                            onClick={() => handleDelete(kelas.id)}
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
      </div>
    </>
  );
};

export default Layout;
