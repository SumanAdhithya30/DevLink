import { useEffect, useState, useCallback } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
// Import the new API service function
import { getMe } from "../services/api";
import Developers from "./Developers";

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
      // Check for token exists here only for redirection logic
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Use the new, clean getMe function
        // No headers or token logic needed here anymore!
        const res = await getMe();

        if (isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        handleLogout(); // Logout if the token is invalid
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
  
  // The rest of your component remains unchanged...
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