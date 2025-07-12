// import PropTypes from "prop-types";
// import { IoIosClose } from "react-icons/io";
// import Swal from "sweetalert2";
// // import axios from "axios";
// import { useState } from "react";
// // import { API_URL } from "../../../config";


// const ModalUpdateStatus = ({ isOpen, handleClose, onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({ status: "" });

 

//   // const handleChange = (e) => {
//   //   setFormValues({  });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     const res = await axios.put(
//   //       `${API_URL}/dosen/${dosen.id}`,
//   //       { status: formValues.status },
//   //     );

//   //     Swal.fire("Berhasil!", res.data.message, "success");
//   //     onSuccess(); // Refresh data setelah update
//   //     handleClose();
//   //   } catch (err) {
//   //     Swal.fire(
//   //       "Gagal!",
//   //       err.response?.data?.message || "Terjadi kesalahan",
//   //       "error"
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50 p-5">
//       <div className="w-full max-w-md bg-white rounded-md p-8 relative max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 bg-[#909090] flex items-center rounded-full text-white transition-all duration-300 ease-in-out hover:bg-[#6b6b6b]"
//         >
//           <IoIosClose size={28} />
//         </button>

//         <div>
//           <h2 className="text-2xl font-semibold mb-6">Upload Foto</h2>

//           <form onSubmit={handleSubmit}>
//             <div>
//               {/* Foto */}
//              <div className="md:col-span-2">
//               <label className="block text-sm font-medium dark:text-white mb-1">
//                 Pilih File <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="file"
//                 name="file"
//                 // onChange={}
//                 className="w-full px-3 py-2 border dark:text-white border-gray-300 dark:border-[#575757] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-[#3f3f3f]"
//                 accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                 required
//               />
//             </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="mr-3 px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md shadow hover:bg-gray-50 focus:outline-none"
//               >
//                 Batal
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
//               >
//                 {loading ? "Menyimpan..." : "Update Status"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// ModalUpdateStatus.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func.isRequired,
// };

// export default ModalUpdateStatus;
