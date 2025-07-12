import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../../config";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  MdOutlineEvent,
  MdEditSquare,
} from "react-icons/md";
import ModalKehadiran from "./ModalKehadiran";
import ButtonAction from "../../../components/ui/ButtonAction";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventIdFromUrl = queryParams.get('eventId');

  const [myEvents, setMyEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendance, setAttendance] = useState(null); // Ubah menjadi objek tunggal
  const [loading, setLoading] = useState(false); // Gunakan satu state loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: authUser } = useSelector((state) => state.auth);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Ambil daftar event untuk dropdown (hanya event yang diikuti dosen)
  const getMyEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/event/my-event`);

      if (res.data && res.data.result && res.data.result.length > 0) {
        setMyEvents(res.data.result);
        
        // Prioritaskan eventId dari URL jika ada
        if (eventIdFromUrl) {
          setSelectedEvent(eventIdFromUrl);
        } else if (!selectedEvent && res.data.result.length > 0) {
          setSelectedEvent(res.data.result[0].id);
        }
      } else {
        setMyEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data kehadiran untuk event yang dipilih
  const getAttendance = async () => {
    if (!selectedEvent) return;
    
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}/attendance/events/${selectedEvent}/attendances`
      );

      if (!res.data.result || res.data.result.length === 0) {
        setAttendance(null);
        return;
      }

      // Cari kehadiran untuk user saat ini
      const userAttendance = res.data.result.find(a => a.user_id === authUser.id);
      setAttendance(userAttendance || null);
    } catch (error) {
      console.error("Error fetching attendance", error);
      setAttendance(null);

      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "Terjadi kesalahan",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Tidak dapat terhubung ke server",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      getMyEvents();
    }
  }, [authUser]);

  useEffect(() => {
    if (selectedEvent) {
      getAttendance();
    }
  }, [selectedEvent]);

  // Format status kehadiran
  const formatStatus = (status) => {
    const statusMap = {
      hadir: { text: "Hadir", className: "bg-green-100 text-green-800" },
      tidak_hadir: {
        text: "Tidak Hadir",
        className: "bg-red-100 text-red-800",
      },
      izin: { text: "Izin", className: "bg-yellow-100 text-yellow-800" },
    };

    return (
      statusMap[status] || {
        text: status,
        className: "bg-gray-100 text-gray-800",
      }
    );
  };

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      {isModalOpen && attendance && (
        <ModalKehadiran
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          data={attendance}
          onSuccess={getAttendance}
        />
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Kehadiran Saya</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-col justify-between sm:flex-row gap-2 w-full">
            {/* Pilih Event - hanya ditampilkan jika tidak ada eventId dari URL */}
            {!eventIdFromUrl && (
              <div className="flex items-center relative w-full md:w-64">
                <select
                  className="pr-10 pl-4 py-3 border dark:text-white border-gray-300 dark:border-[#3f3f3f] rounded-md appearance-none w-full text-sm focus:outline-none bg-white dark:bg-[#282828]"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  disabled={loading || myEvents.length === 0}
                >
                  {myEvents.length === 0 ? (
                    <option value="">Tidak ada event</option>
                  ) : (
                    myEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))
                  )}
                </select>
                <MdOutlineEvent
                  size={20}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <span className="absolute right-3 text-gray-500 pointer-events-none">
                  <MdKeyboardArrowDown />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto bg-white dark:bg-[#282828] rounded-xl p-4 shadow-md relative">
          {loading && (
            <div className="absolute inset-0 bg-white dark:bg-[#282828] bg-opacity-80 flex items-center justify-center rounded-xl z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {!attendance && !loading ? (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                Tidak ada data kehadiran
              </div>
              <div className="text-sm text-gray-400">
                Belum ada data kehadiran untuk event ini
              </div>
            </div>
          ) : attendance ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-[#333333] rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Detail Kehadiran</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <div className="mt-1">
                        {formatStatus(attendance.status).text && (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              formatStatus(attendance.status).className
                            }`}
                          >
                            {formatStatus(attendance.status).text}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Waktu Kehadiran</p>
                      <p className="text-sm font-medium dark:text-white">
                        {attendance.attended_at
                          ? format(
                              new Date(attendance.attended_at),
                              "EEEE, dd MMMM yyyy 'pukul' HH:mm",
                              { locale: id }
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-[#333333] rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Catatan</h3>
                  <div className="mt-1">
                    <p className="text-sm dark:text-white">
                      {attendance.notes || "Tidak ada catatan"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <ButtonAction
                  onClick={handleOpenModal}
                  icon={<MdEditSquare size={16} />}
                  className="bg-blue-600 hover:bg-blue-700"
                  label="Edit Kehadiran"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Layout;