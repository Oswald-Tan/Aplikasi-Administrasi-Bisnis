import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useSelector } from "react-redux";

const ModalAddJamIstirahat = ({ isOpen, handleClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
   const { user: authUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    jamMulaiIstirahat: "",
    jamSelesaiIstirahat: "",
     prodi: authUser?.prodiAdmin || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create the final data to send
    const jamIstirahatData = {
      jamMulaiIstirahat: formData.jamMulaiIstirahat,
      jamSelesaiIstirahat: formData.jamSelesaiIstirahat,
      prodi: authUser.prodiAdmin,
    };

    try {
      // Add authorization header
      const res = await axios.post(`${API_URL}/jadwal-jam-istirahat`, jamIstirahatData,);

      Swal.fire("Berhasil!", res.data.message, "success");
      onSuccess();
      handleClose();
      // Reset form after success
      setFormData({ jamMulaiIstirahat: "", jamSelesaiIstirahat: "", prodi: authUser?.prodiAdmin || "" });
    } catch (err) {
      // Improved error handling
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Terjadi kesalahan";

      Swal.fire("Gagal!", errorMessage, "error");

      // Log detailed error for debugging
      console.error("Error adding class:", {
        error: err,
        response: err.response,
        request: err.request,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-5">
      <div className="w-full max-w-md bg-white rounded-md p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-[#909090] flex items-center rounded-full text-white transition-all duration-300 ease-in-out hover:bg-[#6b6b6b]"
        >
          <IoIosClose size={28} />
        </button>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Tambah Jam Istirahat</h2>

          <form onSubmit={handleSubmit}>
            {/* Nama Kelas */}
            <div className="mb-4">
              <label className="block text-sm font-medium dark:text-white mb-1">
                Jam Mulai Istirahat <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jamMulaiIstirahat"
                value={formData.jamMulaiIstirahat}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              />
            </div>

             <div className="mb-4">
              <label className="block text-sm font-medium dark:text-white mb-1">
                Jam Selesai Istirahat <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="jamSelesaiIstirahat"
                value={formData.jamSelesaiIstirahat}
                onChange={handleChange}
                className="w-full px-3 py-3 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                required
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="mr-3 px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md shadow hover:bg-gray-50 focus:outline-none"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Tambah Jam Istirahat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ModalAddJamIstirahat.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ModalAddJamIstirahat;
