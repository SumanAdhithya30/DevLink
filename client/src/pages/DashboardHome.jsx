import React, { useState, useEffect } from 'react';
import { getDeveloperStats } from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
    <p className="text-3xl font-bold text-gray-800 mt-2">{value || 0}</p>
  </div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalDevelopers: 0,
    developersByDomain: [],
    topTechSkills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getDeveloperStats();
        
        // Add defensive programming to ensure we have the right data structure
        const statsData = {
          totalDevelopers: res.data?.totalDevelopers || 0,
          developersByDomain: Array.isArray(res.data?.developersByDomain) ? res.data.developersByDomain : [],
          topTechSkills: Array.isArray(res.data?.topTechSkills) ? res.data.topTechSkills : [],
        };
        
        setStats(statsData);
        setError(''); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard data.');
        // Keep the default empty state on error
        setStats({
          totalDevelopers: 0,
          developersByDomain: [],
          topTechSkills: [],
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">Loading Dashboard...</div>
          <div className="mt-2 text-gray-500">Please wait while we fetch your data</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Developers" value={stats.totalDevelopers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Developers by Domain Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg text-gray-700 mb-4">Developers by Domain</h3>
          {stats.developersByDomain && stats.developersByDomain.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.developersByDomain}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.developersByDomain.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-gray-500">
              <div className="text-center">
                <div className="text-lg">No domain data available</div>
                <div className="text-sm mt-1">Data will appear when developers are added</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Top Tech Skills Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg text-gray-700 mb-4">Top 5 Tech Skills</h3>
          {stats.topTechSkills && stats.topTechSkills.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topTechSkills} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip cursor={{ fill: '#f5f5f5' }}/>
                <Legend />
                <Bar dataKey="count" fill="#00C49F" name="Developers" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-gray-500">
              <div className="text-center">
                <div className="text-lg">No tech skills data available</div>
                <div className="text-sm mt-1">Data will appear when developers are added</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;