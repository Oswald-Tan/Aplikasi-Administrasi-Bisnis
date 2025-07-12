import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import LupaPassword from "./pages/LupaPassword";
import NotFound from "./components/404";

import AdminJurusanLayout from "./layout/LayoutAdminJurusan";
import DashboardAdminJurusan from "./pages/AdminJurusan/Dashboard";
import User from "./pages/AdminJurusan/Users";
import UserDetail from "./pages/AdminJurusan/UserDetail";
import AddUser from "./pages/AdminJurusan/AddUser";
import EditUser from "./pages/AdminJurusan/EditUser";

import AdminLayout from "./layout/LayoutAdmin";
import DashboardAdmin from "./pages/Admin/Dashboard";
import MahasiswaAdmin from "./pages/Admin/Mahasiswa";
import AddMahasiswaAdmin from "./pages/Admin/AddMahasiswa";
import EditMahasiswaAdmin from "./pages/Admin/EditMahasiswa";
import MahasiswaDetailAdmin from "./pages/Admin/MahasiswaDetail";
import DosenAdmin from "./pages/Admin/Dosen";
import AddDosenAdmin from "./pages/Admin/AddDosen";
import EditDosenAdmin from "./pages/Admin/EditDosen";
import AllMahasiswaAdmin from "./pages/AdminJurusan/Mahasiswa";
import AllDosenAdmin from "./pages/AdminJurusan/Dosen";
import AddDosenAdminJurusan from "./pages/AdminJurusan/AddDosen";
import AddMahasiswaAdminJurusan from "./pages/AdminJurusan/AddMahasiswa";
import EditMahasiswaAdminJurusan from "./pages/AdminJurusan/EditMahasiswa";
import EditDosenAdminJurusan from "./pages/AdminJurusan/EditDosen";
import DosenDetailAdminJurusan from "./pages/AdminJurusan/DetailDosen";
import MahasiswaDetailAdminJurusan from "./pages/AdminJurusan/MahasiswaDetail";
import EventList from "./pages/AdminJurusan/Event";
import CreateEvent from "./pages/AdminJurusan/createEvent";
import EditEvent from "./pages/AdminJurusan/EditEvent";
import AttendanceList from "./pages/AdminJurusan/Attendance";
import DocumentList from "./pages/AdminJurusan/Document";
import UploadDocument from "./pages/AdminJurusan/uploadDocument";
import ArsipList from "./pages/AdminJurusan/Arsip";
import AddArsip from "./pages/AdminJurusan/AddArsip";
import SuratList from "./pages/AdminJurusan/Surat";
import AddSurat from "./pages/AdminJurusan/AddSurat";
import DetailSurat from "./pages/AdminJurusan/DetailSurat";
import EditSurat from "./pages/AdminJurusan/EditSurat";
import AuditLogList from "./pages/AdminJurusan/AuditLog";
import KelasList from "./pages/Admin/Kelas";
import JamIstirahatList from "./pages/Admin/JamIstirahat";
import MataKuliahList from "./pages/Admin/MataKuliah";
import JadwalList from "./pages/Admin/Jadwal";
import AddJadwal from "./pages/Admin/AddJadwal";
import JadwalKelas from "./pages/Admin/JadwalKelas";
import EventNotificationsList from "./pages/AdminJurusan/EventNotification";
import DashboardDosen from "./pages/Dosen/Dashboard";
import ProfileDosen from "./pages/Dosen/ProfileDosen";
import DosenLayout from "./layout/LayoutDosen";
import JadwalKelasDosen from "./pages/Dosen/JadwalKelas";
import Jadwal from "./pages/Dosen/JadwalKelas/Jadwal";
import MyEventList from "./pages/Dosen/Event";
import MyAttendances from "./pages/Dosen/Attendance";
import LandingPage from "./layout/LandingPage";
import LoginPortal from "./sections/LoginPortal";
import LoginAdminJurusan from "./pages/Login/LoginAdminJurusan";
import LoginAdminProdi from "./pages/Login/LoginAdminProdi";
import LoginDosen from "./pages/Login/LoginDosen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login-choose" element={<LoginPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/admin-jurusan" element={<LoginAdminJurusan />} />
        <Route path="/login/admin-prodi" element={<LoginAdminProdi />} />
        <Route path="/login/dosen" element={<LoginDosen />} />
        <Route path="/forgot/password" element={<LupaPassword />} />
        <Route path="/" element={<LandingPage />} />

        {/* Admin Jurusan Routes */}
        <Route element={<AdminJurusanLayout />}>
          <Route path="/dashboard/admin/jurusan" element={<DashboardAdminJurusan />} />

          <Route path="/users/admin" element={<User />} exact />
          <Route path="/users/add/admin" element={<AddUser />} exact />
          <Route path="/users/edit/:id/admin" element={<EditUser />} exact />
          <Route path="/users/:id/details/admin" element={<UserDetail />} exact />

          <Route path="/users/all/mahasiswa" element={<AllMahasiswaAdmin />} exact />
          <Route path="/users/add/mahasiswa" element={<AddMahasiswaAdminJurusan />} exact />
          <Route path="/users/edit/:id/mahasiswa" element={<EditMahasiswaAdminJurusan />} exact />
          <Route path="/users/details/:id/mahasiswa" element={<MahasiswaDetailAdminJurusan />} exact />

          <Route path="/users/all/dosen" element={<AllDosenAdmin />} exact />
          <Route path="/users/add/dosen" element={<AddDosenAdminJurusan />} exact />
          <Route path="/users/edit/:id/dosen" element={<EditDosenAdminJurusan />} exact />
          <Route path="/users/details/:id/dosen" element={<DosenDetailAdminJurusan />} exact />
          
          <Route path="/events/list" element={<EventList />} exact />
          <Route path="/events/attendance" element={<AttendanceList />} exact />
          <Route path="/create/event" element={<CreateEvent />} exact />
          <Route path="/edit/:id/event" element={<EditEvent />} exact />
          <Route path="/event/:id/notifications" element={<EventNotificationsList />} exact />

          <Route path="/documents/list" element={<DocumentList />} exact />
          <Route path="/upload/document" element={<UploadDocument />} exact />

          <Route path="/arsip/list" element={<ArsipList />} exact />
          <Route path="/add/arsip" element={<AddArsip />} exact />

          <Route path="/surat/list" element={<SuratList />} exact />
          <Route path="/add/surat" element={<AddSurat />} exact />
          <Route path="/surat/:id" element={<DetailSurat />} exact />
          <Route path="/surat/edit/:id" element={<EditSurat />} exact />

          <Route path="/audit-logs" element={<AuditLogList />} exact />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />

          <Route path="/users/mahasiswa" element={<MahasiswaAdmin />} exact />
          <Route path="/users/mahasiswa/add" element={<AddMahasiswaAdmin />} exact />
          <Route path="/users/mahasiswa/edit/:id" element={<EditMahasiswaAdmin />} exact />
          <Route path="/users/mahasiswa/:id/details" element={<MahasiswaDetailAdmin />} exact />

           <Route path="/users/dosen" element={<DosenAdmin />} exact />
          <Route path="/users/dosen/add" element={<AddDosenAdmin />} exact />
          <Route path="/users/dosen/edit/:id" element={<EditDosenAdmin />} exact />

          <Route path="/kelas" element={<KelasList />} exact />
          <Route path="/jam-istirahat" element={<JamIstirahatList />} exact />
          <Route path="/mata-kuliah" element={<MataKuliahList />} exact />
          <Route path="/jadwal" element={<JadwalList />} exact />
          <Route path="/add/jadwal" element={<AddJadwal />} exact />
          <Route path="/lihat-jadwal-kelas/:nama_kelas" element={<JadwalKelas />} exact />
        </Route>

        {/* Dosen Routes */}
        <Route element={<DosenLayout />}>
          <Route path="/dashboard/dosen" element={<DashboardDosen />} />

          <Route path="/profile/dosen" element={<ProfileDosen />} exact />

          <Route path="/jadwal/dosen" element={<JadwalKelasDosen />} exact />
          <Route path="/lihat-jadwal-kelas-dosen/:nama_kelas" element={<Jadwal />} exact />

          <Route path="/my-events" element={<MyEventList />} exact />
          <Route path="/dosen/kehadiran-saya" element={<MyAttendances />} exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
