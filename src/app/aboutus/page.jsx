// pages/about.tsx (or about.jsx for JavaScript)

import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Discover who we are, our mission, and the team behind your favorite home decor.
          </p>
        </div>

        {/* Company Overview Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex justify-center items-center">
              <img
                src="/download.jpeg" // Replace with your image path
                alt="Company Image"
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Who We Are</h2>
              <p className="text-lg text-gray-700">
                We are a team of passionate interior designers and home decor enthusiasts committed to
                bringing style and comfort to your home. Our curated selection of furniture and decor
                items is carefully chosen to transform any space into a beautiful sanctuary.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="bg-blue-50 py-12 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 text-center">
              Our mission is to provide high-quality, stylish home decor that fits every budget. We
              believe that every home should reflect the personality and style of its owner. Our goal is
              to help you create spaces that inspire, relax, and elevate your everyday life.
            </p>
          </div>
        </div>

        {/* Meet The Team Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="/about1.png" // Replace with team member image
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="/about2.jpeg" // Replace with team member image
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Lead Designer</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="/about3.jpeg" // Replace with team member image
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Emily Johnson</h3>
              <p className="text-gray-600">Product Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
