import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
// Import the new API service function
import { getMe } from "../services/api";
import Developers from "./Developers";

// --- 1. IMPORT THE NEW DASHBOARDHOME COMPONENT ---
import DashboardHome from "./DashboardHome";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getMe();
        if (isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        handleLogout();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [navigate, handleLogout]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
          DevLink
        </h1>
        <nav className="flex flex-col p-4 space-y-2">
          {/* Links updated for consistency */}
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/dashboard/developers" className="hover:bg-gray-700 p-2 rounded">
            Developers
          </Link>
        </nav>
        {/* Simple user info display at the bottom of the sidebar */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <p className="text-sm">Logged in as:</p>
          <p className="font-semibold truncate">{user?.username}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 text-center"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          {/* --- 2. UPDATE THE INDEX ROUTE ELEMENT --- */}
          {/* The old "Welcome" div is replaced with your new analytics component */}
          <Route
            index
            element={<DashboardHome />}
          />
          <Route path="developers" element={<Developers />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;