// src/components/Footer.jsx
import React from 'react';
import { useRouter } from 'next/navigation';



const Footer = () => {

  const router = useRouter();

  const handleNavigation = (path) => {
    if (router) {
      router.push("/addproductform");
    } else {
      console.error("Router is not available");
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <div>
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <button className='hidden' onClick={handleNavigation}>add product form</button>
        </div>
        <div className="flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
