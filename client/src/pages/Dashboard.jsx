import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Developers from "./Developers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
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
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">
          DevLink
        </h1>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
          <Link to="/dashboard/developers" className="hover:bg-gray-700 p-2 rounded">
            Developers
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-auto"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route
            index
            element={
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Welcome, {user?.username || "User"}!
                </h2>
                <p className="text-gray-600">
                  Here’s your personalized dashboard.
                </p>
              </div>
            }
          />
          <Route path="developers" element={<Developers />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
