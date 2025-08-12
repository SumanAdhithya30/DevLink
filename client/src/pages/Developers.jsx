import { useEffect, useState } from 'react';
import axios from 'axios';

const Developers = () =>{
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        const fetchDevelopers = async () => {
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/developers",{
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDevelopers(res.data);
            }catch (err) {
                console.error("Error fetching developers:", err);
            }
        };
        fetchDevelopers();
    }, []);

    return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Developers</h2>
      {developers.length === 0 ? (
        <p>No developers found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Tech Stack</th>
            </tr>
          </thead>
          <tbody>
            {developers.map((dev) => (
              <tr key={dev._id}>
                <td className="border border-gray-300 p-2">{dev.name}</td>
                <td className="border border-gray-300 p-2">{dev.email}</td>
                <td className="border border-gray-300 p-2">
                  {dev.techstack?.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Developers;
