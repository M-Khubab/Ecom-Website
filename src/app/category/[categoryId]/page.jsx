"use client"
import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import {db} from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from 'next/navigation';

const page = () => {
  const [products, setProducts] = useState([]); // Initially load 8 products;
  const [product1,setProduct1] = useState()
  const dispatch = useDispatch()
  const params = useParams()
  console.log(params,"my params")

  const viewMoreProducts = () => {
    setProducts(initialProducts);
  };

   // Fetch Products from Firestore
   const fetchProducts = async () => {
    try {
      const productsCollection =  query(
        collection(db, "product"),
        where("category", "==", params.categoryId) // Example condition
      );// Reference to 'products' collection
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
     
      </div>
    </div>
  );

}

export default page;
