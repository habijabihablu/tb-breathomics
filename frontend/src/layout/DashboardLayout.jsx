import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Activity, Wind, User, Settings } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "TB Detection", path: "/tb", icon: <Activity size={18} /> },
    { name: "Smoker", path: "/coming", icon: <Wind size={18} /> },
    { name: "Anemia", path: "/coming", icon: <User size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* 🔥 MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
          md:translate-x-0
        `}
      >
        <h1 className="text-xl font-bold mb-8">🧠 Breathomics</h1>

        {menu.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setOpen(false); // 🔥 close on click
            }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 transition ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.name}
          </div>
        ))}

        {/* Profile */}
        <div className="mt-auto p-3 bg-gray-100 rounded-lg">
          <p className="text-sm font-semibold">👤 Researcher</p>
          <p className="text-xs text-gray-500">TB Project</p>
        </div>
      </div>

      {/* 🔥 MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 TOPBAR */}
        <div className="bg-white px-4 py-3 shadow flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>

            <h2 className="font-semibold text-sm md:text-base">
              TB Breathomics Dashboard
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <Settings size={18} />
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* 🔥 CONTENT */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>

      {/* 🔥 OPTIONAL: MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow md:hidden flex justify-around py-2 z-50">

        <button onClick={() => navigate("/")}>
          <Home size={20} />
        </button>

        <button onClick={() => navigate("/tb")}>
          <Activity size={20} />
        </button>

        <button onClick={() => navigate("/coming")}>
          <Wind size={20} />
        </button>

        <button onClick={() => navigate("/coming")}>
          <User size={20} />
        </button>

      </div>

    </div>
  );
}