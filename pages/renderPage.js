import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RenderPage({ siteData }) {
  const [orgName, setOrgName] = useState('');
  const [heroText, setHeroText] = useState('');
  const [service1, setService1] = useState('');
  const [service2, setService2] = useState('');
  const [service3, setService3] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [serviceImage1, setServiceImage1] = useState('');
  const [serviceImage2, setServiceImage2] = useState('');
  const [serviceImage3, setServiceImage3] = useState('');

  useEffect(() => {
    if (siteData) {
      setOrgName(siteData.orgName || '');
      setHeroText(siteData.heroInfo || '');
      setService1(siteData.serviceOne || '');
      setService2(siteData.serviceTwo || '');
      setService3(siteData.serviceThree || '');
      setContactEmail(siteData.contactEmail || '');
      setContactPhone(siteData.contactPhone || '');
      setLogo(siteData.logo || '');
      setHeroImage(siteData.heroImage || '');
      setServiceImage1(siteData.serviceImage1 || '');
      setServiceImage2(siteData.serviceImage2 || '');
      setServiceImage3(siteData.serviceImage3 || '');
    }
  }, [siteData]);

  const handleFileUpload = async (file, setImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const fileData = reader.result.split(',')[1];
      const body = {
        file: {
          name: file.name,
          type: file.type,
          data: fileData,
        },
      };

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        if (response.ok) {
          setImage(result.fileLink);
        } else {
          console.error('Failed to upload file:', result);
          alert('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading file.');
      }
    };
  };

  const updateSite = async () => {
    const data = {
      orgName,
      heroInfo: heroText,
      serviceOne: service1,
      serviceTwo: service2,
      serviceThree: service3,
      contactEmail,
      contactPhone,
      logo,
      heroImage,
      serviceImage1,
      serviceImage2,
      serviceImage3,
    };

    try {
      const response = await fetch(`/api/sites?id=${siteData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Data updated successfully!');
      } else {
        console.error('Failed to update data:', result);
        alert('Failed to update data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating data.');
    }
  };

  const deleteSite = async () => {
    try {
      const response = await fetch(`/api/sites?id=${siteData._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        alert('Data deleted successfully!');
      } else {
        console.error('Failed to delete data:', result);
        alert('Failed to delete data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting data.');
    }
  };

  return (
    <div className="text-gray-800 font-sans">
      <form onSubmit={(e) => e.preventDefault()}>
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
          <div className="text-xl font-semibold">
            {logo && <img src={logo} alt="Logo" className="w-16 h-auto object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setLogo)}
              className="ml-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <input
            type="text"
            className="flex-grow mx-4 p-2 border border-gray-300 rounded-lg shadow-md"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <nav className="space-x-4">
            <a href="#hero" className="hover:underline">Home</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </header>

        <section id="hero" className="relative flex items-center justify-center h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="w-full font-bold">
            <textarea
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              placeholder="Enter hero text here"
              className=" w-full h-32 p-4 border border-gray-300 rounded-lg shadow-md text-black"
            ></textarea>
          </h1>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setHeroImage)}
              className="mt-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </section>

        <section id="services" className="flex flex-col items-center p-12 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
          <div className="flex justify-around w-full max-w-4xl">
            <div className="flex flex-col items-center w-1/3">
              {serviceImage1 && <img src={serviceImage1} alt="Service 1" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage1)}
                className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <textarea
                value={service1}
                onChange={(e) => setService1(e.target.value)}
                placeholder="Service 1 description"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
              ></textarea>
            </div>
            <div className="flex flex-col items-center w-1/3">
              {serviceImage2 && <img src={serviceImage2} alt="Service 2" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage2)}
                className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <textarea
                value={service2}
                onChange={(e) => setService2(e.target.value)}
                placeholder="Service 2 description"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
              ></textarea>
            </div>
            <div className="flex flex-col items-center w-1/3">
              {serviceImage3 && <img src={serviceImage3} alt="Service 3" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage3)}
                className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <textarea
                value={service3}
                onChange={(e) => setService3(e.target.value)}
                placeholder="Service 3 description"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
              ></textarea>
            </div>
          </div>
        </section>

        <footer id="contact" className="p-12 bg-gray-50 text-center">
          <h2 className="text-2xl font-semibold mb-8">Contact Us</h2>
          <div className="w-full max-w-2xl mx-auto">
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Contact email"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-md mb-4"
            />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Contact phone"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
            />
          </div>
          <div className="text-gray-600 mt-8">
            &copy; 2024 All rights reserved.
          </div>
        </footer>

        <div className="p-4 text-center">
          <button
            type="button"
            onClick={updateSite}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteSite}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
          >
            Delete
          </button>
          <Link href={{ pathname: `/preview`, query: siteData }} className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700">
            Preview
          </Link>
        </div>
      </form>
    </div>
  );
}