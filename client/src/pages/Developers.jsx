import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

// --- MODIFICATION: Import the new API service functions ---
import {
  getDevelopers,
  addDeveloper,
  updateDeveloper,
  deleteDeveloper,
} from "../services/api";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [newDeveloper, setNewDeveloper] = useState({ name: "", email: "", phone: "", github: "", linkedin: "", domain: "", techstack: "" });

  // State for the new combined search UI
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("general"); // 'general', 'domain', 'techstack'

  // --- MODIFICATION: Updated fetchDevelopers to use the API service ---
  const fetchDevelopers = useCallback(async () => {
    try {
      const params = {}; // Use an object for params

      if (searchTerm.trim()) {
        switch (searchCategory) {
          case 'domain':
            params.domain = searchTerm;
            break;
          case 'techstack':
            params.techstack = searchTerm;
            break;
          default: // 'general'
            params.search = searchTerm;
            break;
        }
      }

      // Call the service function with the params object
      const res = await getDevelopers(params);
      setDevelopers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching developers:", err);
      if (err.response?.status === 401) {
        toast.error("Please log in to access developers");
      }
      setDevelopers([]);
    }
  }, [searchTerm, searchCategory]);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  const handleChange = (e) => {
    setNewDeveloper({ ...newDeveloper, [e.target.name]: e.target.value });
  };
  
  // --- MODIFICATION: All CRUD functions now use the API service ---
  const handleAddDeveloper = useCallback(async () => {
    try {
      const developerData = { ...newDeveloper, techstack: newDeveloper.techstack.split(',').map(tech => tech.trim()) };
      await addDeveloper(developerData); // Use service
      toast.success("Developer added successfully");
      setShowAddModal(false);
      setNewDeveloper({ name: "", email: "", phone: "", github: "", linkedin: "", domain: "", techstack: "" });
      fetchDevelopers();
    } catch (err) { console.error("Error adding developer:", err); toast.error("Error adding developer"); }
  }, [newDeveloper, fetchDevelopers]);

  const handleEditDeveloper = useCallback(async () => {
    try {
      const developerData = { ...newDeveloper, techstack: newDeveloper.techstack.split(',').map(tech => tech.trim()) };
      await updateDeveloper(selectedDeveloper._id, developerData); // Use service
      toast.success("Developer updated successfully");
      setShowEditModal(false);
      fetchDevelopers();
    } catch (err) { console.error("Error updating developer:", err); toast.error("Error updating developer"); }
  }, [newDeveloper, selectedDeveloper, fetchDevelopers]);

  const handleDeleteDeveloper = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this developer?")) {
      try {
        await deleteDeveloper(id); // Use service
        toast.success("Developer deleted successfully");
        fetchDevelopers();
      } catch (err) { console.error("Error deleting developer:", err); toast.error("Error deleting developer"); }
    }
  }, [fetchDevelopers]);

  const openEditModal = useCallback((dev) => {
    setSelectedDeveloper(dev);
    setNewDeveloper({
      name: dev.name, email: dev.email, phone: dev.phone, github: dev.github,
      linkedin: dev.linkedin, domain: dev.domain,
      techstack: Array.isArray(dev.techstack) ? dev.techstack.join(',') : '',
    });
    setShowEditModal(true);
  }, []);
  
  const renderModal = (title, fields, onConfirm, onCancel, confirmText, confirmColor) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
        <div className="space-y-4"> {/* FIX: Corrected className */}
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
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Developer Management</h1>
            <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 shrink-0">
              + Add Developer
            </button>
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 p-2">
             <select
                className="bg-gray-100 border-r border-gray-300 rounded-l-md p-2 text-gray-600 focus:outline-none"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="general">Search All</option>
              <option value="domain">By Domain</option>
              <option value="techstack">By Tech</option>
            </select>
            <input
              type="text"
              placeholder={
                searchCategory === 'domain' ? "e.g., Frontend" :
                searchCategory === 'techstack' ? "e.g., React, Node" :
                "Search by name or email..."
              }
              className="w-full px-2 py-1 border-none focus:outline-none focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(developers) && developers.length > 0 ? (
            developers.map((dev) => (
              <div key={dev._id} className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{dev.name}</h2>
                  <p className="text-md text-gray-600 mt-1">{dev.domain}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dev.techstack.slice(0, 4).map(tech => (
                       <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{tech}</span>
                    ))}
                  </div>
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
        
        {/* MODIFICATION: Restored the full View Modal JSX */}
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