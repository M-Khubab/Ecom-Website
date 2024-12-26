"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from '@/firebase'; // Import your Firebase configuration here

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    bankDetails: "",
  });

  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = (imageFile) => {
    const storage = getStorage(firebaseApp); // Firebase storage instance
    const storageRef = ref(storage, 'orderImages/' + imageFile.name);
    return uploadBytes(storageRef, imageFile).then((snapshot) => {
      return getDownloadURL(snapshot.ref); // Get the image URL after upload
    });
  };

  const handleSubmit = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const adminWhatsApp = "+3192422624"; // Replace with admin's WhatsApp number

    let productDetails = '';
    let imageUrls = [];

    // Construct product details and upload images to Firebase
    for (const item of cart) {
      const imageFile = item.image; // Assuming item.image is the image file
      if (imageFile) {
        try {
          const imageUrl = await uploadImage(imageFile); // Upload image and get the URL
          imageUrls.push(imageUrl); // Save the image URL for the product
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Failed to upload images. Please try again.");
          return;
        }
      }
      productDetails += `${item.name || "Unnamed Product"} (Qty: ${item.quantity || 0}) - $${item.price * (item.quantity || 0)} \nImage: ${imageUrls.join('\n')}\n\n`;
    }

    const message = `
    Order Details:

    Customer Name: ${customerDetails.name}
    Phone: ${customerDetails.phone}
    Address: ${customerDetails.address}
    Bank Details: ${customerDetails.bankDetails || "Not Provided"}

    Products:
    ${productDetails}
    `;

    // Check if the message is too long
    if (message.length > 4000) {
      alert("Message is too long to send via WhatsApp. Please shorten your order.");
      return;
    }

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;

    console.log("Generated WhatsApp URL:", whatsappUrl);

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Cart Products */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex">
                <img
                  src={item.imageUrl} // You can still show the image here for preview
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-semibold">${item.price * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      {/* Customer Details Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={customerDetails.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={customerDetails.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Details</label>
            <input
              type="text"
              name="bankDetails"
              value={customerDetails.bankDetails}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Place Order & Send to WhatsApp
      </button>
    </div>
  );
};

export default CheckoutPage;
