"use client";
import React, { useState } from "react";
import { db, storage } from "@/firebase"; // Ensure you import both Firestore and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "", // Initialize with an empty string
    price: "",
    oldPrice: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = "";

      // Upload image to Firebase Storage if a file is selected
      if (imageFile) {
        const imageRef = ref(storage, `products/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add product data to Firestore
      const productsCollection = collection(db, "product");
      await addDoc(productsCollection, { ...formData, imageUrl });

      alert("Product added successfully!");
      setFormData({ name: "", category: "", price: "", oldPrice: "", imageUrl: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a Category</option>
            <option value="sheets">Sheets</option>
            <option value="pillows">Pillows</option>
            <option value="blanket">Blanket</option>
            <option value="towel">Towel</option>
            <option value="robs">Robs</option>
            <option value="mats">Mats</option>
            <option value="carpets">Carpets</option>
            <option value="toys">Toys</option>
            <option value="clothing">Clothing</option>
            <option value="appliances">Appliances</option>
            <option value="utensils">Utensils</option>
            <option value="eid">Eid</option>
            <option value="birthday">Birthday</option>
            <option value="wedding">Wedding</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="oldPrice">
            Old Price
          </label>
          <input
            type="text"
            id="oldPrice"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1" htmlFor="imageUpload">
            Product Image
          </label>
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
