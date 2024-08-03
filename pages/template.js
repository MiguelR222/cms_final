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
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl">
            Logo
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
            className="flex-grow mx-4 p-2 border border-gray-300 rounded text-black"
            placeholder="Organization Name"
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

        <div className="p-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
