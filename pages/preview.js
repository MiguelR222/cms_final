import React from 'react';
import { useRouter } from 'next/router';

export default function Preview() {
  const router = useRouter();
  const siteData = router.query;

  return (
    <div className="text-black">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <img src={siteData.logo} alt="Service 1" className="w-24 h-24 mb-2" />
        <div className="flex-grow mx-4 p-2 border border-gray-300 rounded">
          {siteData.orgName}
        </div>
        <nav className="space-x-4">
          <a href="#hero" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section id="hero" className="flex p-12 bg-gray-100">
        <div className="flex-none w-1/2">
          <img src={siteData.heroImage} alt="Hero" className="w-full h-auto" />
        </div>
        <div className="flex-grow ml-8">
          <div className="w-full h-full p-4 border border-gray-300 rounded">
            {siteData.heroInfo}
          </div>
        </div>
      </section>

      <section id="services" className="flex justify-around p-12 bg-gray-200">
        <div className="flex flex-col items-center w-1/3">
          <img src={siteData.serviceImage1} alt="Service 1" className="w-24 h-24 mb-2" />
          <div className="w-full p-2 border border-gray-300 rounded">
            {siteData.serviceOne}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <img src={siteData.serviceImage2} alt="Service 2" className="w-24 h-24 mb-2" />
          <div className="w-full p-2 border border-gray-300 rounded">
            {siteData.serviceTwo}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <img src={siteData.serviceImage3} alt="Service 3" className="w-24 h-24 mb-2" />
          <div className="w-full p-2 border border-gray-300 rounded">
            {siteData.serviceThree}
          </div>
        </div>
      </section>

      <footer id="contact" className="p-12 bg-gray-300">
        <div className="mb-4">
          <div className="w-full p-2 border border-gray-300 rounded mb-4">
            {siteData.contactEmail}
          </div>
          <div className="w-full p-2 border border-gray-300 rounded">
            {siteData.contactPhone}
          </div>
        </div>
        <div className="text-center text-gray-700">
          &copy; 2024 All rights reserved.
        </div>
      </footer>
    </div>
  );
}
