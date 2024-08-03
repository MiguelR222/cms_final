import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navBar';

export default function Preview() {
  const router = useRouter();
  const siteData = router.query;

  const copyToClipboard = () => {
    const code = `
      <div className="text-gray-800 font-sans">
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
          <div className="text-xl font-semibold">
            ${siteData.logo ? `<img src="${siteData.logo}" alt="Logo" className="w-16 h-auto object-contain" />` : ''}
          </div>
          <div className="text-3xl font-bold text-center flex-grow">
            ${siteData.orgName}
          </div>
          <nav className="space-x-4">
            <a href="#hero" className="hover:underline">Home</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </header>

        <section id="hero" className="relative flex items-center justify-center h-screen bg-cover bg-center text-white" style="background-image: url('${siteData.heroImage}');">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-4xl font-bold">${siteData.heroInfo}</h1>
          </div>
        </section>

        <section id="services" className="flex flex-col items-center p-12 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
          <div className="flex justify-around w-full max-w-4xl">
            <div className="flex flex-col items-center w-1/3">
              ${siteData.serviceImage1 ? `<img src="${siteData.serviceImage1}" alt="Service 1" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />` : ''}
              <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
                ${siteData.serviceOne}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
              ${siteData.serviceImage2 ? `<img src="${siteData.serviceImage2}" alt="Service 2" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />` : ''}
              <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
                ${siteData.serviceTwo}
              </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
              ${siteData.serviceImage3 ? `<img src="${siteData.serviceImage3}" alt="Service 3" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />` : ''}
              <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
                ${siteData.serviceThree}
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="p-12 bg-gray-50 text-center">
          <h2 className="text-2xl font-semibold mb-8">Contact Us</h2>
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md mb-4">
              ${siteData.contactEmail}
            </div>
            <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
              ${siteData.contactPhone}
            </div>
          </div>
          <div className="text-gray-600 mt-8">
            &copy; 2024 All rights reserved.
          </div>
        </footer>
      </div>
    `;
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="text-gray-800 font-sans">
      <Navbar/>
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-xl font-semibold">
          {siteData.logo && <img src={siteData.logo} alt="Logo" className="w-16 h-auto object-contain" />}
        </div>
        <div className="text-3xl font-bold text-center flex-grow">
          {siteData.orgName}
        </div>
        <nav className="space-x-4">
          <a href="#hero" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section id="hero" className="relative flex items-center justify-center h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${siteData.heroImage})` }}>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold">{siteData.heroInfo}</h1>
        </div>
      </section>

      <section id="services" className="flex flex-col items-center p-12 bg-white text-center">
        <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
        <div className="flex justify-around w-full max-w-4xl">
          <div className="flex flex-col items-center w-1/3">
            {siteData.serviceImage1 && <img src={siteData.serviceImage1} alt="Service 1" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
            <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
              {siteData.serviceOne}
            </div>
          </div>
          <div className="flex flex-col items-center w-1/3">
            {siteData.serviceImage2 && <img src={siteData.serviceImage2} alt="Service 2" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
            <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
              {siteData.serviceTwo}
            </div>
          </div>
          <div className="flex flex-col items-center w-1/3">
            {siteData.serviceImage3 && <img src={siteData.serviceImage3} alt="Service 3" className="w-24 h-24 mb-4 object-cover rounded-full shadow-md" />}
            <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
              {siteData.serviceThree}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="p-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold mb-8">Contact Us</h2>
        <div className="w-full max-w-2xl mx-auto">
          <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md mb-4">
            {siteData.contactEmail}
          </div>
          <div className="w-full p-4 border border-gray-300 rounded-lg shadow-md">
            {siteData.contactPhone}
          </div>
        </div>
        <div className="text-gray-600 mt-8">
          &copy; 2024 All rights reserved.
        </div>
      </footer>

      <div className="p-4 text-center">
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Copy Code to Clipboard
        </button>
      </div>
    </div>
  );
}