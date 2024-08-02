import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Render from './renderPage'; // Adjust the path as necessary

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [siteData, setSiteData] = useState({});

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchSites = async () => {
        try {
          const response = await fetch('/api/sites');
          const data = await response.json();
          if (data.success) {
            setSites(data.data);
          } else {
            throw new Error(data.error);
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
  }, [status]);

  const handleSiteSelection = (site) => {
    setSelectedSiteId(site._id);
    setSiteData(site);
    console.log(site);
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
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">Organization Name</div>
        {sites.map((site) => (
          <button
            key={site._id}
            onClick={() => handleSiteSelection(site)}
            className={`border px-4 py-2 rounded ${
              selectedSiteId === site._id ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {site.orgName}
          </button>
        ))}
      </div>
      <Render siteData={siteData} />
    </div>
  );
};

export default Dashboard;
