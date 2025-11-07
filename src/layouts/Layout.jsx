import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bell, LogOut, Recycle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  fetchUserProfile,
  selectGetUserProfile,
  selectGetUserProfileStatus,
} from "../redux/slices/getUserProfileSlice";

export default function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectGetUserProfile);
  const profileStatus = useSelector(selectGetUserProfileStatus);

  useEffect(() => {
    if (profileStatus === "idle") {
      try {
        dispatch(fetchUserProfile());
      } catch (_e) {}
    }
  }, [dispatch, profileStatus]);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/generate", label: "Generate Code" },
    // { to: "/gist", label: "Gist History" },
    { to: "/save", label: "Saved Codes" },
    { to: "/profile", label: "Profile" },
  ];

  const itemClass = ({ isActive }) =>
    isActive
      ? "block rounded-xl px-3 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 font-medium"
      : "block rounded-xl px-3 py-2 hover:bg-gray-50 transition";

  const badgeLetter = (profile?.name?.[0] || "U").toUpperCase();

  return (
    <div className="h-screen overflow-hidden grid grid-cols-[240px_1fr] grid-rows-[56px_1fr] bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      {/* Sidebar */}
      <aside className="row-span-2 border-r bg-white/90 backdrop-blur sticky top-0 h-screen shadow-sm p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">V</div>
          <span className="font-semibold text-lg text-gray-900">VOX Dev</span>
        </div>

        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Menu
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={itemClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="mt-auto pt-5 border-t">
          <Link
            to="/profile"
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition"
          >
            <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
              {badgeLetter}
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-gray-900">
                {profile?.name || "User"}
              </div>
              <div className="text-xs text-gray-500">Developer</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Header */}
      <HeaderBar
        onLogout={() => {
          dispatch(logout());
          navigate("/", { replace: true });
        }}
        badgeLetter={badgeLetter}
        title="Developer"
      />

      {/* Main Content */}
      <main className="col-start-2 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function HeaderBar({ onLogout, badgeLetter, title }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="col-start-2 border-b bg-white/90 backdrop-blur flex items-center justify-between px-6 h-14 shadow-sm relative">
      <div className="flex items-center gap-3">
        <div className="text-base font-semibold text-gray-900">
          {title} Dashboard
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="h-9 w-9 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 flex items-center justify-center"
        >
          <Bell className="h-5 w-5 text-gray-600" />
        </button>

        <div className="relative">
          <button
            aria-label="Account menu"
            className="h-9 w-9 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-200"
            onClick={() => setOpen((v) => !v)}
          >
            {badgeLetter}
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg border p-1 z-10"
              role="menu"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-50 text-left text-gray-700"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
