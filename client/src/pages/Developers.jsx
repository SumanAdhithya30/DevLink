import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api/developers";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const getAxiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  },
});

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [newDeveloper, setNewDeveloper] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    domain: "",
    techstack: "",
  });

  // --- MODIFICATION: States for new filters ---
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [techStackFilter, setTechStackFilter] = useState("");

  // --- MODIFICATION: Updated fetchDevelopers to use filter states ---
  const fetchDevelopers = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (domainFilter) params.append('domain', domainFilter);
      if (techStackFilter) params.append('techstack', techStackFilter);

      const res = await axios.get(`${API_BASE_URL}?${params.toString()}`, getAxiosConfig());
      setDevelopers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching developers:", err);
      if (err.response?.status === 401) {
        toast.error("Please log in to access developers");
      }
      setDevelopers([]);
    }
  }, [searchTerm, domainFilter, techStackFilter]); // Dependencies ensure this function updates when filters change

  // --- MODIFICATION: useEffect now depends on fetchDevelopers, which in turn depends on the filters ---
  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  const handleChange = (e) => {
    setNewDeveloper({ ...newDeveloper, [e.target.name]: e.target.value });
  };

  const handleAddDeveloper = useCallback(async () => {
    try {
      // On add/edit, we should convert the techstack string to an array for the backend
      const developerData = {
        ...newDeveloper,
        techstack: newDeveloper.techstack.split(',').map(tech => tech.trim()),
      };
      await axios.post(API_BASE_URL, developerData, getAxiosConfig());
      toast.success("Developer added successfully");
      setShowAddModal(false);
      setNewDeveloper({ name: "", email: "", phone: "", github: "", linkedin: "", domain: "", techstack: "" });
      fetchDevelopers();
    } catch (err) {
      console.error("Error adding developer:", err);
      toast.error("Error adding developer");
    }
  }, [newDeveloper, fetchDevelopers]);

  const handleEditDeveloper = useCallback(async () => {
    try {
      const developerData = {
        ...newDeveloper,
        techstack: newDeveloper.techstack.split(',').map(tech => tech.trim()),
      };
      await axios.put(`${API_BASE_URL}/${selectedDeveloper._id}`, developerData, getAxiosConfig());
      toast.success("Developer updated successfully");
      setShowEditModal(false);
      fetchDevelopers();
    } catch (err) {
      console.error("Error updating developer:", err);
      toast.error("Error updating developer");
    }
  }, [newDeveloper, selectedDeveloper, fetchDevelopers]);

  const handleDeleteDeveloper = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this developer?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`, getAxiosConfig());
        toast.success("Developer deleted successfully");
        fetchDevelopers();
      } catch (err) {
        console.error("Error deleting developer:", err);
        toast.error("Error deleting developer");
      }
    }
  }, [fetchDevelopers]);

  const openEditModal = useCallback((dev) => {
    setSelectedDeveloper(dev);
    setNewDeveloper({
      name: dev.name,
      email: dev.email,
      phone: dev.phone,
      github: dev.github,
      linkedin: dev.linkedin,
      domain: dev.domain,
      techstack: Array.isArray(dev.techstack) ? dev.techstack.join(',') : '', // Join array for display in input
    });
    setShowEditModal(true);
  }, []);
  
  const renderModal = (title, fields, onConfirm, onCancel, confirmText, confirmColor) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.placeholder}</label>
              <input id={field.name} type="text" name={field.name} placeholder={`Enter ${field.placeholder.toLowerCase()}`} value={newDeveloper[field.name]} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onCancel} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Cancel</button>
          <button onClick={onConfirm} className={`px-6 py-2 rounded-lg text-white ${confirmColor} hover:opacity-90 transition-opacity`}>{confirmText}</button>
        </div>
      </div>
    </div>
  );

  const formFields = [ { name: "name", placeholder: "Name" }, { name: "email", placeholder: "Email" }, { name: "phone", placeholder: "Phone" }, { name: "github", placeholder: "GitHub Profile" }, { name: "linkedin", placeholder: "LinkedIn Profile" }, { name: "domain", placeholder: "Domain" }, { name: "techstack", placeholder: "Tech Stack (comma-separated)" }, ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* --- MODIFICATION: New UI structure with advanced filters --- */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Developer Management</h1>
            <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 shrink-0">
              + Add Developer
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Search by name, email, domain..." className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)}>
              <option value="">All Domains</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
            </select>
            <input type="text" placeholder="Filter by tech (e.g., React,Node)" className="w-full border-gray-300 border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={techStackFilter} onChange={(e) => setTechStackFilter(e.target.value)}/>
          </div>
        </div>

        {/* --- MODIFICATION: Removed the client-side .filter() method --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(developers) && developers.length > 0 ? (
            developers.map((dev) => (
              <div key={dev._id} className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{dev.name}</h2>
                  <p className="text-md text-gray-600 mt-1">{dev.domain}</p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setSelectedDeveloper(dev); setShowViewModal(true); }} className="text-blue-500 hover:text-blue-700 transition-colors" title="View Details"><FaEye size={20} /></button>
                  <button onClick={() => openEditModal(dev)} className="text-green-500 hover:text-green-700 transition-colors" title="Edit Developer"><FaEdit size={20} /></button>
                  <button onClick={() => handleDeleteDeveloper(dev._id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete Developer"><FaTrash size={20} /></button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500 py-12">
              <p className="text-xl">No developers found matching your criteria.</p>
            </div>
          )}
        </div>

        {showAddModal && renderModal("Add New Developer", formFields, handleAddDeveloper, () => setShowAddModal(false), "Add Developer", "bg-blue-600")}
        {showEditModal && renderModal("Edit Developer Details", formFields, handleEditDeveloper, () => setShowEditModal(false), "Update Developer", "bg-green-600")}
        
        {showViewModal && selectedDeveloper && ( 
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-75"> 
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all"> 
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDeveloper.name}</h2> 
              <div className="space-y-3 text-gray-700"> 
                  <p><strong>Email:</strong> {selectedDeveloper.email}</p> 
                  <p><strong>Phone:</strong> {selectedDeveloper.phone}</p> 
                  <p><strong>Domain:</strong> {selectedDeveloper.domain}</p> 
                  <p><strong>Tech Stack:</strong> {Array.isArray(selectedDeveloper.techstack) ? selectedDeveloper.techstack.join(', ') : ''}</p> 
                  <p><strong>GitHub:</strong> <a href={selectedDeveloper.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile</a></p> 
                  <p><strong>LinkedIn:</strong> <a href={selectedDeveloper.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile</a></p> 
              </div> 
              <div className="flex justify-end mt-8"> 
                <button onClick={() => setShowViewModal(false)} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Close</button> 
              </div> 
            </div> 
          </div> 
        )}
      </div>
    </div>
  );
};

export default Developers;