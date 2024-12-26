"use client"
import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import {db} from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const initialProducts = [
  // Example array of 12 product objects (replace with your actual product data)
  { id: 1, name: "Product 1", price: "Rs.1,999", oldPrice: "Rs.3,999", imageUrl: "./pic1.webp" },
  { id: 2, name: "Product 2", price: "Rs.1,999", oldPrice: "Rs.3,999", imageUrl: "./pic2.webp" },
  { id: 3, name: "Product 3", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic3.webp" },
  { id: 4, name: "Product 4", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic4.webp" },
  { id: 5, name: "Product 5", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic5.webp" },
  { id: 6, name: "Product 6", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic6.webp" },
  { id: 7, name: "Product 7", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic7.webp" },
  { id: 8, name: "Product 8", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic8.webp" },
  { id: 9, name: "Product 9", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic2.webp" },
  { id: 10, name: "Product 10", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic5.webp" },
  { id: 11, name: "Product 11", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic6.webp" },
  { id: 12, name: "Product 12", price: "Rs.1,299", oldPrice: "Rs.2,499", imageUrl: "./pic8.webp" },
  // Add more items up to 12 for demonstration
];

const Cards = () => {
  const [products, setProducts] = useState(initialProducts.slice(0, 8)); // Initially load 8 products;
  const [product1,setProduct1] = useState()
  const dispatch = useDispatch()

  const viewMoreProducts = () => {
    setProducts(initialProducts);
  };

   // Fetch Products from Firestore
   const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "product"); // Reference to 'products' collection
      const snapshot = await getDocs(productsCollection); // Fetch all documents
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Use useEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };
  
  

  
  
  return (
<div className="container mx-auto p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 border border-orange-400">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">Sale</span>
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center mt-2 mb-1">
                <span className="text-yellow-500">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                <span className="ml-2 text-gray-600 text-sm">(200)</span>
              </div>
              <p className="text-lg font-semibold text-green-600">Rs.{product.price}</p>
              <p className="text-sm text-gray-500 line-through">{product.oldPrice}</p>
              <button
                onClick={() => addToCartHandler(product)}
                className="mt-2 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-6">
        {products.length < initialProducts.length && (
          <button
          onClick={viewMoreProducts}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );

}

export default Cards;
