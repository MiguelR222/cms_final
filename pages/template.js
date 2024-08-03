import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Template() {
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
  const { data: session, status } = useSession();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: session.user.name,
      userId: session.user.id,
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
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        console.error('Failed to save data:', result);
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving data.');
    }
  };

  return (
    <div className="text-gray-800 font-sans">
      <form onSubmit={handleSubmit}>
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
            className="flex-grow mx-4 p-2 border border-gray-300 rounded"
            placeholder="Organization Name"
            onChange={(e) => setOrgName(e.target.value)}
          />
          <nav className="space-x-4">
            <a href="#hero" className="hover:underline">Home</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </header>

        <section id="hero" className="relative flex items-center justify-center h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="w-3/4 bg-black bg-opacity-50 p-8 rounded-lg text-center">
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
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
}