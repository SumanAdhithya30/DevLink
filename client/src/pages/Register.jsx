import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import the new API service function
import { register } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Use the new, clean register function
      const response = await register(formData);
      console.log("Registration Successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg shadow-xl p-10 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 placeholder:text-gray-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Sign Up
        </button>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Register;