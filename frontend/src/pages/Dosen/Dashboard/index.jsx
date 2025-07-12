import Layout from "./Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const DashboardDosen = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "dosen") {
      navigate("/dashboard/dosen");
    }
  }, [isError, user, navigate]);

  return (
    <div>
      <Layout />
    </div>
  );
};

export default DashboardDosen;
