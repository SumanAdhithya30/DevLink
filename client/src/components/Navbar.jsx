import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">
        <Link to="/" className="hover:text-blue-200 transition-colors">
          DevLink
        </Link>
      </div>
      <div className="flex items-center gap-6 text-md">
        {token ? (
          // --- User is Logged IN ---
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          // --- User is Logged OUT ---
          <>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between">
//       <div className="font-bold text-xl">DevLink</div>
//       <div className="flex gap-4">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/login" className="hover:underline">Login</Link>
//         <Link to="/register" className="hover:underline">Register</Link>
//         <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
