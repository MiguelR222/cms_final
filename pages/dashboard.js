import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
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
    <div className="text-gray-800 font-sans p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-lg text-left text-xl font-semibold text-blue-600">
                <span>
                  {selectedSiteId
                    ? `Selected Organization: ${siteData.orgName}`
                    : 'Choose an Organization'}
                </span>
                <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue-600`} />
              </Disclosure.Button>
              <Disclosure.Panel className="p-4 bg-white shadow-md rounded-lg">
                {sites.map((site) => (
                  <button
                    key={site._id}
                    onClick={() => handleSiteSelection(site)}
                    className={`w-full text-left border px-4 py-2 rounded-lg shadow-md transition-colors duration-200 mb-2 ${
                      selectedSiteId === site._id ? 'bg-blue-400 text-white' : 'bg-blue-200 hover:bg-blue-300'
                    }`}
                  >
                    {site.orgName}
                  </button>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      {selectedSiteId && <RenderPage siteData={siteData} />}
    </div>
  );
};

export default Dashboard;