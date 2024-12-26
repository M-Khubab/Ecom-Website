// pages/contact.jsx
"use client"
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files ? e.target.files[0] : null,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(''); // Reset success message

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Create the form data to be sent to a backend or service
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      // Replace the URL below with your API endpoint to handle the submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccessMessage('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '', file: null });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Attach a File (Optional)
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="text-center text-green-600 font-semibold mt-4">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
