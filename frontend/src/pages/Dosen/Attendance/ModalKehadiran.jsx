import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const ModalKehadiran = ({ isOpen, handleClose, data, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ 
    status: "",
    notes: "" 
  });
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);
  const [canUpdate, setCanUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data && data.event) {
      setFormValues({ 
        status: data.status || "", 
        notes: data.notes || "" 
      });
      const startTime = new Date(data.event.start);
      const endTime = new Date(data.event.end);
      setEventStart(startTime);
      setEventEnd(endTime);

      // Check if event has started and hasn't ended
      const now = new Date();
      const isEventStarted = now >= startTime;
      const isEventEnded = now > endTime;
      
      setCanUpdate(isEventStarted && !isEventEnded);

      if (!isEventStarted) {
        const formattedTime = format(
          startTime,
          "EEEE, dd MMMM yyyy 'pukul' HH:mm",
          { locale: id }
        );
        setErrorMessage(
          `Status kehadiran hanya bisa diupdate setelah ${formattedTime}`
        );
      } else if (isEventEnded) {
        const formattedTime = format(
          endTime,
          "EEEE, dd MMMM yyyy 'pukul' HH:mm",
          { locale: id }
        );
        setErrorMessage(
          `Tidak bisa mengupdate kehadiran karena event sudah berakhir pada ${formattedTime}`
        );
      } else {
        setErrorMessage("");
      }
    } else {
      // Handle case where event data is missing
      setCanUpdate(false);
      setErrorMessage("Data event tidak valid");
    }
  }, [data]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double check update status using state
    if (!canUpdate) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage || "Tidak dapat mengupdate status kehadiran.",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${API_URL}/attendance/${data.id}`, {
        status: formValues.status,
        notes: formValues.notes
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Status kehadiran berhasil diperbarui",
      });
      onSuccess();
      handleClose();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Terjadi kesalahan";
      
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMsg,
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
          <h2 className="text-2xl font-semibold mb-6">Kehadiran</h2>

          {eventStart && eventEnd ? (
            <div className="mb-4 bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Waktu Mulai Event:</strong>{" "}
                {format(eventStart, "EEEE, dd MMMM yyyy 'pukul' HH:mm", { locale: id })}
              </p>
              <p className="text-sm text-blue-800 mt-2">
                <strong>Waktu Selesai Event:</strong>{" "}
                {format(eventEnd, "EEEE, dd MMMM yyyy 'pukul' HH:mm", { locale: id })}
              </p>
            </div>
          ) : (
            <div className="mb-4 bg-red-50 p-3 rounded-md">
              <p className="text-sm text-red-600">
                ⚠️ Informasi waktu event tidak tersedia
              </p>
            </div>
          )}

          {/* Tampilkan pesan error hanya di sini */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Kehadiran <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                  required
                  disabled={loading || !canUpdate}
                >
                  <option value="">Pilih Status</option>
                  <option value="tidak_hadir">Tidak Hadir</option>
                  <option value="hadir">Hadir</option>
                  <option value="izin">Izin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Catatan
                </label>
                <textarea
                  name="notes"
                  value={formValues.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-200 dark:border-[#3f3f3f] dark:bg-[#3f3f3f] bg-[#f3f4f6] sm:text-sm"
                  placeholder="Tambahkan catatan (opsional)"
                  disabled={loading || !canUpdate}
                ></textarea>
              </div>
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
                disabled={loading || !canUpdate}
                className={`px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  loading || !canUpdate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Menyimpan..." : "Update Status"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ModalKehadiran.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default ModalKehadiran;