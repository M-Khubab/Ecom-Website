"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiChevronDown, FiMinus, FiPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const cart = useSelector((state)=> state.cart)
  console.log(cart)


  const categories = [
    { name: 'Bedding', subcategories: ['Sheets', 'Pillows', 'Blankets'] },
    { name: 'Hotel Linen', subcategories: ['Towels', 'Robes'] },
    { name: 'Prayer Mat', subcategories: ['Mats', 'Carpets'] },
    { name: 'Kids', subcategories: ['Toys', 'Clothing'] },
    { name: 'Kitchen', subcategories: ['Appliances', 'Utensils'] },
    { name: 'Events', subcategories: ['Eid','Birthday','Wedding'] },
    { name: 'Shop By Budget', subcategories: ['RS 1000','RS 2000','RS 3000','RS 4000','RS 5000',] },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FiMenu className="text-2xl text-white" />
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold flex-1 md:flex-none text-center md:text-left">
          <Link href="/"><span className="text-gray-400">Home</span> Store</Link>
        </div>
        <button className="relative md:hidden" onClick={toggleCartDropdown}>
            <FiShoppingCart className="text-xl text-white" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">{totalItems}</span>
          </button>
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 items-center mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-100 text-black"
          />
          <button className="p-2 bg-gray-700 rounded">
            <span className="material-icons text-white">search</span>
          </button>
        </div>

        {/* Right Menu Options */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/aboutus" className="text-white-500 font-semibold hover:text-gray-500">About Us</Link>
          <Link href="/contactus" className="text-white-500 font-semibold hover:text-gray-500">Contact Us</Link>
          {/* <Link href="/account">My Account</Link> */}
          
          {/* Cart Button */}
          <button className="hidden md:flex relative" onClick={toggleCartDropdown}>
            <FiShoppingCart className="text-xl text-white" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">{totalItems}</span>
          </button>
          
          {/* Cart Dropdown */}
          {cartDropdownOpen && (
            <div className="absolute right-4 top-14 bg-white text-white w-72 rounded-lg shadow-lg p-4 z-50">
              <h3 className="font-bold text-lg mb-2">Cart Summary</h3>
              {cart.map((item) => {
                console.log(item.name,"aa")
                return(
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                  <img src={item.imageUrl} alt={item.name} className="w-full h-12 object-cover rounded-lg" />
                  </div>
                  <div className='flex flex-col'>
                  <div> 
                    <p className='text-lg font-semibold text-black'>{item.name}</p>
                    <p className="text-sm text-gray-600">Rs. {item.price}</p>
                  </div>
                  <div className=" space-x-2 rounded border border-black p-x-4 flex">
                    <button onClick={() => decreaseQuantity(item.id)} className='text-black'>
                      <FiMinus />
                    </button>
                    <span className='text-black'>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className='text-black' >
                      <FiPlus />
                    </button>
                  </div>
                    <div>
                    <button onClick={() => removeItem(item.id)} className="text-black">
                      x
                    </button>
                    </div>
                      </div>
                </div>
              )})}
              <div className="border-t mt-2 pt-2">
                <p className="font-bold">Total: Rs. {totalPrice}</p>
                <Link href="/checkout">
                  <button className="bg-blue-600 text-white w-full py-2 rounded mt-2">Checkout</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Category Links with Dropdowns */}
      <nav className="hidden md:flex bg-gray-900">
        <div className="container mx-auto flex justify-around space-x-4 py-2 font-semibold">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleDropdown(index)}
                className="flex items-center space-x-1 hover:text-gray-400 focus:outline-none"
              >
                <span>{category.name}</span>
                <FiChevronDown />
              </button>
              {openDropdown === index && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg z-50">
                  {category.subcategories.map((sub, idx) => {

                    return(
                    <Link
                      key={idx}
                      href={`/category/${sub.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {sub}
                    </Link>
                  )}
                )}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white">
          <div className="flex flex-col p-4 space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex justify-between w-full hover:text-gray-400"
                >
                  <span>{category.name}</span>
                  <FiChevronDown />
                </button>
                {openDropdown === index && (
                  <div className="pl-4">
                    {category.subcategories.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={`/${sub.toLowerCase()}`}
                        className="block py-1"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
