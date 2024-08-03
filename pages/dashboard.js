import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RenderPage from './renderPage';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
    if (status === 'authenticated') {
      const fetchSites = async () => {
        try {
          const response = await fetch('/api/sites', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setSites(data.data);
          } else {
            throw new Error(data.error || 'Failed to fetch sites');
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSites();
    } else {
      setLoading(false);
    }
  }, [status, session]);

  const handleSiteSelection = (site) => {
    setSelectedSiteId(site._id);
    setSiteData(site);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!session) {
    return <p>Please log in to see your sites.</p>;
  }

  return (
    <div className="text-gray-800 font-sans p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
          <span className="text-xl font-semibold">Organization Name</span>
        </div>
        {sites.map((site) => (
          <button
            key={site._id}
            onClick={() => handleSiteSelection(site)}
            className={`border px-4 py-2 rounded-lg shadow-md transition-colors duration-200 ${
              selectedSiteId === site._id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {site.orgName}
          </button>
        ))}
      </div>
      {selectedSiteId && <RenderPage siteData={siteData} />}
    </div>
  );
};

export default Dashboard;