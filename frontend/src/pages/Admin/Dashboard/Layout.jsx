import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { HiUserGroup } from "react-icons/hi2";
import Card from "../../../components/ui/Card";
import axios from "axios";
import { API_URL } from "../../../config";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [currentDate, setCurrentDate] = useState("");

  const [totalMahasiswa, setTotalMahasiswa] = useState(0);

  useEffect(() => {
    const formattedDate = format(new Date(), "EEE, dd MMM", { locale: id });
    setCurrentDate(formattedDate);
  }, []);

  // Fetch total users from API
  // Perbaikan pada useEffect yang fetch data
useEffect(() => {
  const fetchTotalMahasiswa = async () => {
    // Pastikan user sudah tersedia sebelum request
    if (!user || !user.prodiAdmin) return;
    
    try {
      const res = await axios.get(`${API_URL}/mahasiswa/get-mahasiswa-count`, {
        params: {
          prodiAdmin: user.prodiAdmin
        }
      });
      setTotalMahasiswa(res.data.totalMahasiswa);
    } catch (error) {
      console.error("Failed to fetch total mahasiswa:", error);
      // Tambahkan penanganan error lebih baik
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  fetchTotalMahasiswa();
}, [user]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      <div className="mb-5">
        <p className="text-sm mb-3 font-medium dark:text-white">
          {currentDate}
        </p>
        <p className="md:text-2xl text-xl font-semibold dark:text-white">
          Hello, {user && user.fullname}!
        </p>
        <p className="md:text-2xl text-xl font-semibold bg-gradient-to-r from-purple-400 to-red-600 bg-clip-text text-transparent">
          Let’s get started on your tasks today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Card
          title="Total Mahasiswa"
          count={totalMahasiswa}
          icon={<HiUserGroup />}
          iconColor="text-blue-500"
        />
      </div>
    </div>
  );
};

export default Layout;
