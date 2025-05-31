import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BookOpen,
  User,
  Heart,
  Plus,
  Castle,
} from "lucide-react";

// Menyu elementlari uchun ikonkalar
const getIconForPath = (path) => {
  const iconMap = {
    "/": Home,
    "create-venue": Plus,
    bookings: Calendar,
    "my-venues": Castle,
  };

  const key = path === "/" ? "/" : path.toLowerCase();
  return iconMap[key] || ChevronRight;
};

function Sidebar({ paths, panelName }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 bg-gradient-to-b from-white to-rose-50 border-r border-rose-100 shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-rose-100">

            {/* User info */}
            {user && (
              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-rose-100">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-medium mr-3">
                  {user.firstname?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.firstname} {user.lastname || ""}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role || "User"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </p>

              {paths.map((path) => {
                const IconComponent = getIconForPath(path);
                const isHome = path === "/";
                const to = isHome ? `/${panelName}` : `/${panelName}/${path}`;
                const label = isHome
                  ? panelName.charAt(0).toUpperCase() + panelName.slice(1)
                  : path
                      .replace(/[-/]/g, " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ");

                return (
                  <NavLink
                    key={path}
                    to={to}
                    onClick={closeSidebar}
                    end
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-rose-100 text-rose-700 shadow-sm"
                          : "text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                      }`
                    }
                  >
                      <>
                        <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="truncate">{label}</span>
                      </>
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-rose-100">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Chiqish
            </button>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">© 2024 Elegance Venues</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content spacer for desktop */}
      <div className="lg:ml-72">{/* Bu yerda asosiy kontent joylashadi */}</div>
    </>
  );
}

export default Sidebar;
