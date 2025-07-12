import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { TiUser, TiTime } from "react-icons/ti";
import { FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";

const Layout = () => {
  const { nama_kelas } = useParams();
  const [jadwal, setJadwal] = useState({
    senin: [],
    selasa: [],
    rabu: [],
    kamis: [],
    jumat: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const _listData = async () => {
    try {
      setLoading(true);
      const getKelas = await axios.get(`${API_URL}/kelas/${nama_kelas}`);

      if (!getKelas.data.result || getKelas.data.result.length === 0) {
        setError("Kelas tidak ditemukan.");
        setLoading(false);
        return;
      }

      const idKelas = getKelas.data.result[0]?.id;
      const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
      const jadwalData = {
        senin: [],
        selasa: [],
        rabu: [],
        kamis: [],
        jumat: [],
      };

      const requests = days.map((day) =>
        axios.get(`${API_URL}/jadwal-matkul/${day}`, {
          params: { kelas: idKelas },
        })
      );

      const responses = await Promise.all(requests);

      responses.forEach((response, index) => {
        const day = days[index].toLowerCase();
        jadwalData[day] = response.data?.result || [];
      });

      setJadwal(jadwalData);
      setError("");
    } catch (err) {
      setError("Gagal memuat jadwal.");
      console.error("Error fetching schedule data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _listData();
  }, [nama_kelas]);

  const pisahJadwal = (jadwalList) => {
    return {
      beforeFirstBreak: (jadwalList || [])
        .filter((val) => val?.jam_matkul)
        .filter((val) => {
          const [jamMulai] = val.jam_matkul.split(" - ");
          return jamMulai < "10:15";
        })
        .sort((a, b) => a.jam_matkul.localeCompare(b.jam_matkul)),

      betweenBreaks: (jadwalList || [])
        .filter((val) => val?.jam_matkul)
        .filter((val) => {
          const [jamMulai] = val.jam_matkul.split(" - ");
          return jamMulai >= "10:45" && jamMulai < "12:25";
        })
        .sort((a, b) => a.jam_matkul.localeCompare(b.jam_matkul)),

      afterSecondBreak: (jadwalList || [])
        .filter((val) => val?.jam_matkul)
        .filter((val) => {
          const [jamMulai] = val.jam_matkul.split(" - ");
          return jamMulai >= "12:55";
        })
        .sort((a, b) => a.jam_matkul.localeCompare(b.jam_matkul)),
    };
  };

  const renderJadwal = (jadwalList) => {
    if (loading) {
      return (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (!jadwalList || jadwalList.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-400 italic text-sm">Tidak ada jadwal</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {jadwalList.map((val, key) => (
          <div
            key={key}
            className=" bg-white "
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-900">
                  {val.Matkul?.mata_kuliah || "Mata kuliah tidak tersedia"}
                </p>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <TiTime className="mr-1" />
                  <span>{val.jam_matkul || "Jam tidak tersedia"}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <FaChalkboardTeacher className="text-gray-700 mr-1" />
              <p className="text-gray-700">
                {val.Dosen?.fullname || "Dosen tidak tersedia"}
              </p>
            </div>
            <div className="mt-1 flex items-center">
              <HiOfficeBuilding className="text-gray-700 mr-1" />
              <p className="text-sm text-gray-600">
                {val.ruangan || "Ruangan tidak tersedia"}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const hari = [
    { nama: "Senin", data: jadwal.senin },
    { nama: "Selasa", data: jadwal.selasa },
    { nama: "Rabu", data: jadwal.rabu },
    { nama: "Kamis", data: jadwal.kamis },
    { nama: "Jumat", data: jadwal.jumat },
  ];

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Jadwal Kelas {nama_kelas}
        </h1>
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}
        <div className="flex items-center text-sm text-gray-600">
          <FaBook className="mr-2" />
          <span>Jadwal perkuliahan semester ini</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                {hari.map((h) => (
                  <th
                    key={h.nama}
                    className="py-4 px-4 text-center font-semibold text-gray-900 border-r border-gray-200 last:border-r-0"
                  >
                    {h.nama}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Baris Jadwal Pagi */}
              <tr className="border-b border-gray-200">
                {hari.map((h) => (
                  <td
                    key={h.nama}
                    className="py-4 px-4 align-top border-r border-gray-200 last:border-r-0"
                    style={{ minWidth: "250px" }}
                  >
                    {renderJadwal(pisahJadwal(h.data).beforeFirstBreak)}
                  </td>
                ))}
              </tr>

              {/* Baris Istirahat Pagi */}
              <tr className="border-b border-gray-200">
                <td
                  colSpan={5}
                  className="py-3 px-4 bg-blue-50 text-center text-blue-800 font-medium border-r border-blue-100"
                >
                  <div className="flex items-center justify-center">
                    <span className="mx-2">10:15 - 10:45</span>
                    <span className="mx-2">|</span>
                    <span>Istirahat Pagi</span>
                  </div>
                </td>
              </tr>

              {/* Baris Jadwal Siang */}
              <tr className="border-b border-gray-200">
                {hari.map((h) => (
                  <td
                    key={h.nama}
                    className="py-4 px-4 align-top border-r border-gray-200 last:border-r-0"
                    style={{ minWidth: "250px" }}
                  >
                    {renderJadwal(pisahJadwal(h.data).betweenBreaks)}
                  </td>
                ))}
              </tr>

              {/* Baris Istirahat Siang */}
              <tr className="border-b border-gray-200">
                <td
                  colSpan={5}
                  className="py-3 px-4 bg-blue-50 text-center text-blue-800 font-medium border-r border-blue-100"
                >
                  <div className="flex items-center justify-center">
                    <span className="mx-2">12:25 - 12:55</span>
                    <span className="mx-2">|</span>
                    <span>Istirahat Siang</span>
                  </div>
                </td>
              </tr>

              {/* Baris Jadwal Sore */}
              <tr>
                {hari.map((h) => (
                  <td
                    key={h.nama}
                    className="py-4 px-4 align-top border-r border-gray-200 last:border-r-0"
                    style={{ minWidth: "250px" }}
                  >
                    {renderJadwal(pisahJadwal(h.data).afterSecondBreak)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Layout;