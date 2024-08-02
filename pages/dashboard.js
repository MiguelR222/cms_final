import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Organization Name</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id}>
              <td className="border px-4 py-2">{site.orgName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
