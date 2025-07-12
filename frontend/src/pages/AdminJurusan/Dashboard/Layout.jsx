import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { HiUserGroup } from "react-icons/hi2";
import { HiCalendar } from "react-icons/hi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Card from "../../../components/ui/Card";
import PieChartProdi from "../../../components/PieChartProdi";
import axios from "axios";
import { API_URL } from "../../../config";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import EventCharts from "../../../components/EventCharts";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [currentDate, setCurrentDate] = useState("");

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMahasiswa, setTotalMahasiswa] = useState(0);
  const [totalDosen, setTotalDosen] = useState(0);
  const [totalEventUpcoming, setTotalEventUpcoming] = useState(0);
  const [totalEventOngoing, setTotalEventOngoing] = useState(0);

  useEffect(() => {
    const formattedDate = format(new Date(), "EEE, dd MMM", { locale: id });
    setCurrentDate(formattedDate);
  }, []);

  // Fetch total users from API
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/total-users`);
        setTotalUsers(res.data.totalUser);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }
    };
    const fetchTotalMahasiswa = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/mahasiswa/get-all-mahasiswa-count`
        );
        setTotalMahasiswa(res.data.totalMahasiswa);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }
    };

    const fetchTotalDosen = async () => {
      try {
        const res = await axios.get(`${API_URL}/dosen/get-all-dosen-count`);
        setTotalDosen(res.data.totalDosen);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }
    };

    const fetchTotalEventUpcoming = async () => {
      try {
        const res = await axios.get(`${API_URL}/event/total-upcoming`);
        setTotalEventUpcoming(res.data.totalUpcoming);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }
    };

    const fetchTotalEventOngoing = async () => {
      try {
        const res = await axios.get(`${API_URL}/event/total-ongoing`);
        setTotalEventOngoing(res.data.totalOngoing);
      } catch (error) {
        console.error("Failed to fetch total users:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalMahasiswa();
    fetchTotalDosen();
    fetchTotalEventUpcoming();
    fetchTotalEventOngoing();
  }, []);

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
          title="Admin Prodi"
          count={totalUsers}
          icon={<HiUserGroup />}
          iconColor="text-blue-500"
          to="/users/admin" // Tentukan path tujuan
        />
        <Card
          title="Mahasiswa"
          count={totalMahasiswa}
          icon={<HiUserGroup />}
          iconColor="text-teal-500"
          to="/users/all/mahasiswa"
        />
        <Card
          title="Dosen"
          count={totalDosen}
          icon={<HiUserGroup />}
          iconColor="text-orange-500"
          to="/users/all/dosen"
        />
        <Card
          title="Event Upcoming"
          count={totalEventUpcoming}
          icon={<RiCalendarScheduleFill />}
          iconColor="text-purple-500"
          to="/events/list"
        />
        <Card
          title="Event Ongoing"
          count={totalEventOngoing}
          icon={<HiCalendar />}
          iconColor="text-red-500"
          to="/events/list"
        />
        {/* <div className="md:col-span-6 mt-4">
          <PieChartProdi />
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <PieChartProdi />
        <EventCharts />
      </div>
    </div>
  );
};

export default Layout;
