import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDosenData } from "../../../features/authSlice";
// import Button from "../../../components/ui/Button";
import { MdEditSquare } from "react-icons/md";
// import ModalEditProfile from "./ModalEditProfile";

const Layout = () => {
  const dispatch = useDispatch();
  // const [showEditModal, setShowEditModal] = useState(false);

  // Ambil state dari Redux store
  const { dosen, isDosenLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  // const handleEdit = () => {
  //   setShowEditModal(true);
  // };

  // Fetch data dosen saat komponen dimount
  useEffect(() => {
    dispatch(fetchDosenData());
  }, [dispatch]);

  // Tampilkan loading state
  if (isDosenLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Memuat data dosen...</span>
      </div>
    );
  }

  // Tampilkan error state
  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-3xl mx-auto mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Terjadi kesalahan: {message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Jika tidak ada data dosen
  if (!dosen) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-3xl mx-auto mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">Data dosen tidak tersedia</p>
          </div>
        </div>
      </div>
    );
  }

  // Ekstrak detail dosen jika ada
  const detailDosen =
    dosen.detailDosen && dosen.detailDosen.length > 0
      ? dosen.detailDosen[0]
      : null;

  return (
    <div>
      {/* <ModalEditProfile
        isOpen={showEditModal}
        handleClose={() => setShowEditModal(false)}
        // onSuccess={}
        // dosenData={}
      /> */}
      <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
        {/* <div className="flex gap-2 mb-5">
          <Button
            text="Edit Profile"
            onClick={() => handleEdit()}
            iconPosition="left"
            icon={<MdEditSquare />}
            width="min-w-[120px]"
            className="bg-purple-500 hover:bg-purple-600"
          />
        </div> */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Profil */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-gray-500">
                  {dosen.foto ? (
                    <img
                      src={dosen.foto}
                      alt={`Foto ${dosen.fullname}`}
                      className="rounded-xl w-32 h-32 object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                  {dosen.fullname}
                </h1>
                <p className="mt-1 text-blue-100">Dosen {dosen.jurusan}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full text-sm text-white">
                    {dosen.prodi}
                  </span>
                  {dosen.asKaprodi && (
                    <span className="bg-green-500 bg-opacity-30 px-3 py-1 rounded-full text-sm text-white">
                      Kaprodi
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                  Informasi Pribadi
                </h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-40 text-gray-500">NIP</span>
                    <span className="font-medium">{dosen.nip || "-"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">NIDN</span>
                    <span className="font-medium">{dosen.nidn || "-"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">Jenis Kelamin</span>
                    <span className="font-medium">
                      {dosen.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">Tempat Lahir</span>
                    <span className="font-medium">
                      {dosen.tempatLahir || "-"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">Tanggal Lahir</span>
                    <span className="font-medium">
                      {dosen.tglLahir
                        ? new Date(dosen.tglLahir).toLocaleDateString("id-ID")
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                  Data Kepegawaian
                </h2>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-40 text-gray-500">No. Karpeg</span>
                    <span className="font-medium">{dosen.karpeg || "-"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">No. CPNS</span>
                    <span className="font-medium">{dosen.cpns || "-"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-40 text-gray-500">No. PNS</span>
                    <span className="font-medium">{dosen.pns || "-"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Profesi */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
                Detail Profesi
              </h2>
              {detailDosen ? (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Pendidikan & Jabatan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="w-40 text-gray-500">
                          Pendidikan Terakhir
                        </span>
                        <span className="font-medium">
                          {detailDosen.pendidikanTerakhir || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-gray-500">
                          Tahun Pendidikan
                        </span>
                        <span className="font-medium">
                          {detailDosen.tahun || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-gray-500">Jabatan</span>
                        <span className="font-medium">
                          {detailDosen.jabatan || "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Status Kepegawaian
                    </h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="w-40 text-gray-500">Golongan</span>
                        <span className="font-medium">
                          {detailDosen.gol || "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-gray-500">TMT Golongan</span>
                        <span className="font-medium">
                          {detailDosen.tmtGolongan
                            ? new Date(
                                detailDosen.tmtGolongan
                              ).toLocaleDateString("id-ID")
                            : "-"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 text-gray-500">TMT Jabatan</span>
                        <span className="font-medium">
                          {detailDosen.tmtJabatan
                            ? new Date(
                                detailDosen.tmtJabatan
                              ).toLocaleDateString("id-ID")
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Informasi Lain
                    </h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="w-40 text-gray-500">Agama</span>
                        <span className="font-medium">
                          {detailDosen.agama || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <p className="text-yellow-700">
                    Detail profesi tidak tersedia
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Data diperbarui: {new Date().toLocaleDateString("id-ID")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
