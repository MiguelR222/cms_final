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
    <div className="text-black">
      <form onSubmit={(e) => e.preventDefault()}>
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl">
            {logo && <img src={logo} alt="Logo" className="w-24 h-auto object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setLogo)}
              className="ml-2"
            />
          </div>
          <input
            type="text"
            className="flex-grow mx-4 p-2 border border-gray-300 rounded"
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

        <section id="hero" className="flex p-12 bg-gray-100">
          <div className="flex-none w-1/2">
            {heroImage && <img src={heroImage} alt="Hero" className="w-full h-auto object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setHeroImage)}
              className="ml-2"
            />
          </div>
          <div className="flex-grow ml-8">
            <textarea
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              placeholder="Enter hero text here"
              className="w-full h-full p-4 border border-gray-300 rounded"
            ></textarea>
          </div>
        </section>

        <section id="services" className="flex justify-around p-12 bg-gray-200">
          <div className="flex flex-col items-center w-1/3">
            {serviceImage1 && <img src={serviceImage1} alt="Service 1" className="w-24 h-24 mb-2 object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage1)}
              className="ml-2"
            />
            <textarea
              value={service1}
              onChange={(e) => setService1(e.target.value)}
              placeholder="Service 1 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col items-center w-1/3">
            {serviceImage2 && <img src={serviceImage2} alt="Service 2" className="w-24 h-24 mb-2 object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage2)}
              className="ml-2"
            />
            <textarea
              value={service2}
              onChange={(e) => setService2(e.target.value)}
              placeholder="Service 2 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col items-center w-1/3">
            {serviceImage3 && <img src={serviceImage3} alt="Service 3" className="w-24 h-24 mb-2 object-contain" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], setServiceImage3)}
              className="ml-2"
            />
            <textarea
              value={service3}
              onChange={(e) => setService3(e.target.value)}
              placeholder="Service 3 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </section>

        <footer id="contact" className="p-12 bg-gray-300">
          <div className="mb-4">
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Contact email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Contact phone"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="text-center text-gray-700">
            &copy; 2024 All rights reserved.
          </div>
        </footer>

        <div className="p-4 flex space-x-4">
          <button
            type="button"
            onClick={updateSite}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteSite}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <Link href={{ pathname: `/preview`, query: siteData }} className="px-4 py-2 bg-gray-500 text-white rounded">
              Preview
          </Link>
        </div>
      </form>
    </div>
  );
}
