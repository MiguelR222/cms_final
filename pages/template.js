export default function Template() {
    return (
      <div className="App">
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl">Logo</div>
          <input
            type="text"
            className="flex-grow mx-4 p-2 border border-gray-300 rounded"
            placeholder="Organization Name"
          />
          <nav className="space-x-4">
            <a href="#hero" className="hover:underline">Home</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </header>
  
        <section id="hero" className="flex p-12 bg-gray-100">
          <div className="flex-none w-1/2">
            <img src="https://via.placeholder.com/400" alt="Hero" className="w-full h-auto" />
          </div>
          <div className="flex-grow ml-8">
            <textarea
              placeholder="Enter hero text here"
              className="w-full h-full p-4 border border-gray-300 rounded"
            ></textarea>
          </div>
        </section>
  
        <section id="services" className="flex justify-around p-12 bg-gray-200">
          <div className="flex flex-col items-center w-1/3">
            <img src="https://via.placeholder.com/150" alt="Service 1" className="w-24 h-24 mb-2" />
            <textarea
              placeholder="Service 1 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <img src="https://via.placeholder.com/150" alt="Service 2" className="w-24 h-24 mb-2" />
            <textarea
              placeholder="Service 2 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <img src="https://via.placeholder.com/150" alt="Service 3" className="w-24 h-24 mb-2" />
            <textarea
              placeholder="Service 3 description"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
        </section>
  
        <footer id="contact" className="p-12 bg-gray-300">
          <div className="mb-4">
            <textarea
              placeholder="Contact information"
              className="w-full h-24 p-4 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="text-center text-gray-700">
            &copy; 2024 All rights reserved.
          </div>
        </footer>
      </div> 
    );
  }