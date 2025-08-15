import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import the new API service function
import { login } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      // Use the new, clean login function
      const response = await login(formData);
      localStorage.setItem("token", response.data.token);
      console.log("Login Successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-lg shadow-xl p-10 rounded-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome Back</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border rounded-md bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border rounded-md bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
