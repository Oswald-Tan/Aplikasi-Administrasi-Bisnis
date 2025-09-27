import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import { IoIosClose } from "react-icons/io";

const ModalUploadCSV = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setMessage("");
        setUploadResult(null);
      } else {
        setMessage("Hanya file CSV yang diperbolehkan");
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Pilih file CSV terlebih dahulu");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/mahasiswa/upload-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResult(response.data);

      if (response.data.errors && response.data.errors.length > 0) {
        Swal.fire({
          title: "Upload Selesai",
          html: `
            <div>
              <p><strong>${response.data.message}</strong></p>
              <p>Berhasil: ${response.data.success?.length || 0} data</p>
              <p>Gagal: ${response.data.errors.length} data</p>
              ${
                response.data.errors.length > 0
                  ? `
                <details style="margin-top: 10px;">
                  <summary>Detail Error (max 10):</summary>
                  <ul style="text-align: left; margin-top: 10px;">
                    ${response.data.errors
                      .map((error) => `<li>${error}</li>`)
                      .join("")}
                  </ul>
                </details>
              `
                  : ""
              }
            </div>
          `,
          icon: response.data.errors.length > 0 ? "warning" : "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Berhasil!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      if (response.data.success && response.data.success.length > 0) {
        onSuccess(); // Refresh data
        handleClose();
      }
    } catch (error) {
      console.error("Upload error:", error);
      let errorMsg = "Terjadi kesalahan saat upload";

      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
        if (error.response.data.errors) {
          errorMsg += `<br><small>${error.response.data.errors.join(
            ", "
          )}</small>`;
        }
      }

      setMessage(errorMsg);
      Swal.fire({
        title: "Error!",
        html: errorMsg,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setMessage("");
    setUploadResult(null);
    onClose();
  };

  const downloadTemplate = () => {
    // CSV template dengan semua field
    const csvTemplate = `fullname,email,phone_number,nim,jenisKelamin,kotaLahir,tglLahir,agama,alamatTerakhir,kota,kodePos,angkatan,noTestMasuk,tglTerdaftar,statusMasukPt,jurusan,prodi,statusMahasiswa,tahunTamatSmta,jurusanDiSmta,tglIjazahSmta,nilaiUjianAkhirSmta,namaOrtuWali,pendapatanOrtuWali,alamatWali,kotaWali,kodePosWali,noHpWali,emailWali
John Doe,john@example.com,081234567890,202400001,L,Jakarta,2000-01-01,Islam,Jl. Contoh No. 123,Jakarta,12345,2024,TEST001,2024-01-01,Reguler,Administrasi Bisnis,D3 Administrasi Bisnis,Aktif,2023,IPA,2023-06-15,85.5,Jane Doe,5000000,Jl. Orang Tua No. 456,Jakarta,12345,081298765432,jane@example.com
`;

    const blob = new Blob([csvTemplate], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_mahasiswa.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">
              Upload Mahasiswa via CSV
            </h3>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-[#909090] flex items-center rounded-full text-white transition-all duration-300 ease-in-out hover:bg-[#6b6b6b]"
            >
              <IoIosClose size={28} />
            </button>
          </div>

          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
              Petunjuk Upload:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
              <li>Download template CSV terlebih dahulu</li>
              <li>
                Field dengan <span className="text-red-500">*</span> wajib diisi
              </li>
              <li>Format tanggal: YYYY-MM-DD (contoh: 2000-01-01)</li>
              <li>
                Format nomor telepon: 081234567890 atau 81234567890
                (dengan/tanpa 0)
              </li>
              <li>Maksimal file size: 5MB</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium dark:text-white mb-2">
                File CSV <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border dark:text-white rounded-md focus:outline-none border-gray-200 dark:border-gray-600 dark:bg-gray-700 bg-white"
                disabled={loading}
              />
            </div>

            {message && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {message}
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-between">
              <button
                type="button"
                onClick={downloadTemplate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                📥 Download Template
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || !file}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload CSV"}
                </button>
              </div>
            </div>
          </form>

          {uploadResult && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium dark:text-white mb-2">
                Hasil Upload:
              </h4>
              <p className="text-sm dark:text-gray-300">
                {uploadResult.message}
              </p>

              {uploadResult.success && uploadResult.success.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-green-600 dark:text-green-400">
                    Data Berhasil ({uploadResult.success.length})
                  </summary>
                  <ul className="text-xs mt-1 space-y-1">
                    {uploadResult.success.map((item, index) => (
                      <li
                        key={index}
                        className="text-green-600 dark:text-green-400"
                      >
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalUploadCSV;
