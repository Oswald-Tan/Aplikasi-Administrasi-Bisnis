import React, { useEffect, useState } from "react";
import { RiSettings4Line } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { LuHandCoins, LuList } from "react-icons/lu";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useSidebar } from "../../context/useSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import Logo from "../../assets/cs.png";
import { FaHouse } from "react-icons/fa6";

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { open, toggleSidebar } = useSidebar();
  const [menus, setMenus] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState("");

  // Tutup semua submenu saat sidebar ditutup
  useEffect(() => {
    if (!open) {
      setActiveSubMenu("");
    }
  }, [open]);

  useEffect(() => {
    if (user?.role === "admin") {
      const updatedMenus = [
        {
          name: "Dashboard",
          link: "/dashboard/admin",
          icon: TbLayoutDashboard,
        },
        {
          name: "User",
          icon: AiOutlineUser,
          hasSubMenu: true,
          subMenu: [
            { name: "Mahasiswa", link: "/users/mahasiswa" },
            { name: "Dosen", link: "/users/dosen" },
          ],
        },
        {
          name: "Jadwal Mata Kuliah",
          icon: LuList,
          hasSubMenu: true,
          margin: true,
          subMenu: [
            { name: "Jadwal", link: "/jadwal" },
            { name: "Kelas", link: "/kelas" },
            { name: "Mata Kuliah", link: "/mata-kuliah" },
            { name: "Jam Isirahat", link: "/jam-istirahat" },
          ],
        },
        {
          name: "Setting",
          link: "/setting",
          icon: RiSettings4Line,
          margin: true,
        },
        {
          name: "Logout",
          action: () => logout(),
          icon: FiLogOut,
        },
      ];

      setMenus(updatedMenus);
    }
  }, [user]);

  const logout = async () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
      }
    });
  };

  const handleSubMenuClick = (menuName) => {
    // Jika sidebar tertutup, buka sidebar terlebih dahulu
    if (!open) {
      toggleSidebar();

      // Set timeout untuk memberi waktu animasi sidebar terbuka
      setTimeout(() => {
        setActiveSubMenu(menuName);
      }, 300);
    }
    // Jika sidebar sudah terbuka, toggle sub menu
    else {
      setActiveSubMenu(activeSubMenu === menuName ? "" : menuName);
    }
  };

  return (
    <>
      {/* Overlay untuk sidebar mobile */}
      {open && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
        />
      )}

      <section className="flex gap-6 relative">
        <div
          className={`bg-[#121212] border-r border-[#282828] min-h-screen ${
            open
              ? "w-[280px]"
              : "md:w-[68px] md:translate-x-0 -translate-x-[280px]"
          } fixed top-0 left-0 z-20 duration-500 text-gray-100 px-4 overflow-y-auto`}
          style={{ height: "100vh" }}
        >
          <div className="py-4 px-2 flex relative">
            <h2
              className={`whitespace-pre duration-1000 text-xl font-semibold ${
                !open && "-translate-x-[280px] opacity-0"
              }`}
            >
              Admin Dashboard
            </h2>
            {/* <img
              src={Logo}
              className={`absolute left-[6px] w-6 overflow-hidden duration-300 transition-opacity ${
                open ? "opacity-0 delay-0" : "opacity-100 delay-500"
              }`}
              alt="Logo"
            /> */}
            <FaHouse
              size={20}
              className={`absolute left-[6px] w-6 overflow-hidden duration-300 transition-opacity ${
                open ? "opacity-0 delay-0" : "opacity-100 delay-500"
              }`}
            />
          </div>

          <div className="mt-2 flex flex-col gap-1 relative">
            {menus.map((menu, i) => {
              // Menu dengan sub menu
              if (menu.hasSubMenu) {
                return (
                  <div key={i} className="mb-1">
                    <button
                      onClick={() => handleSubMenuClick(menu.name)}
                      className={`${
                        menu.margin && "mt-5"
                      } group flex items-center justify-between w-full text-sm gap-3.5 font-medium px-2 py-3 hover:bg-[#282828] rounded-xl text-left`}
                    >
                      <div className="flex items-center">
                        <div>
                          {React.createElement(menu.icon, { size: "20" })}
                        </div>
                        <h2
                          style={{
                            transitionDelay: `${i + 3}00ms`,
                          }}
                          className={`whitespace-pre duration-500 ml-3 ${
                            !open && "opacity-0 translate-x-28 overflow-hidden"
                          }`}
                        >
                          {menu.name}
                        </h2>
                      </div>
                      <div className={`${!open ? "hidden" : "block"}`}>
                        {activeSubMenu === menu.name ? (
                          <MdKeyboardArrowUp size={14} />
                        ) : (
                          <MdKeyboardArrowDown size={14} />
                        )}
                      </div>
                    </button>

                    {/* Sub menu dengan animasi dropdown */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        activeSubMenu === menu.name ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="pl-8 py-1 space-y-1">
                        {menu.subMenu.map((sub, j) => (
                          <Link
                            to={sub.link}
                            key={j}
                            className="flex items-center text-sm gap-3.5 font-medium px-2 py-2 hover:bg-[#282828] rounded-lg transition-colors duration-200"
                            onClick={() => !open && toggleSidebar()}
                          >
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <h2
                              style={{
                                transitionDelay: `${j + 3}00ms`,
                              }}
                              className={`whitespace-pre duration-500 ${
                                !open &&
                                "opacity-0 translate-x-28 overflow-hidden"
                              }`}
                            >
                              {sub.name}
                            </h2>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Menu biasa tanpa sub menu
              return menu.action ? (
                // Untuk Logout atau menu yang memiliki action
                <button
                  key={i}
                  onClick={menu.action}
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm gap-3.5 font-medium px-2 py-3 hover:bg-[#282828] rounded-xl w-full text-left`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                </button>
              ) : (
                // Untuk menu biasa yang memiliki link
                <Link
                  to={menu.link}
                  key={i}
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm gap-3.5 font-medium px-2 py-3 hover:bg-[#282828] rounded-xl`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SidebarAdmin;
