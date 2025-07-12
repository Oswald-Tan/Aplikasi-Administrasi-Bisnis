import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiCalendar } from "react-icons/hi";
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
  const [totalEventUpcoming, setTotalEventUpcoming] = useState(0);
  const [totalEventOngoing, setTotalEventOngoing] = useState(0);


  useEffect(() => {
    const formattedDate = format(new Date(), "EEE, dd MMM", { locale: id });
    setCurrentDate(formattedDate);
  }, []);

  // Fetch total active events
  useEffect(() => {
    const fetchTotalUpcomingEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/event/total-upcoming-dosen`);
        setTotalEventUpcoming(res.data.totalUpcoming);
      } catch (error) {
        console.error("Failed to fetch active events:", error);
      }
    };

    const fetchTotalOngoingEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/event/total-ongoing-dosen`);
        setTotalEventOngoing(res.data.totalOngoing);
      } catch (error) {
        console.error("Failed to fetch active events:", error);
      }
    };

    fetchTotalUpcomingEvents();
    fetchTotalOngoingEvents();
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
          title="Total Event Upcoming"
          count={totalEventUpcoming}
          icon={<RiCalendarScheduleFill className="w-6 h-6" />} 
          iconColor="text-blue-500"
        />
        <Card
          title="Total Event Ongoing"
          count={totalEventOngoing}
          icon={<HiCalendar className="w-6 h-6" />}
          iconColor="text-red-500"
        />
      </div>
    </div>
  );
};

export default Layout;