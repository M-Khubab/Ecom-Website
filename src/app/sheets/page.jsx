"use client"
import { addToCart } from '@/redux/cartSlice';
import React from 'react'
// import Image from 'next/image';
import Link from 'next/link';

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

const Sheets = () => {
  return (
    <div>
      <div>
      {initialProducts.map((product) => (
            <div key={product.id}><div>
                  <span>sale</span>
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div>
                    <h3>{product.name}</h3>
                <div>
                    <span>&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                    <span>(200)</span>
                </div>
                <p>{product.price}</p>
                <p>{product.oldPrice}</p>
                <button onClick={() => addToCart(product)}>add To Cart</button>
                </div>
                <Link href={`/sheets`}></Link>
                <Link href={`/clothing`}></Link>
            </div>
           ))}

<h1>ssss</h1>
        </div>
    </div>
  )
}

export default Sheets;
