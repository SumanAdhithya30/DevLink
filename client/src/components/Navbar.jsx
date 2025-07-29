import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className = "bg-blue-600 text-white p-4 flex justify-between">
            <div className = "font-bold text-xl ">DevLink</div>
            <div className="flex gap-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            </div>
        </nav>
    )
}

export default Navbar;