"use client"
import Banner from '@/component/Banner'
import Cards from '@/component/Cards'
import Categories from '@/component/Slider'
import React from 'react'

const page = () => {

  const items = [
    { url: '/pic1.webp', category: 'Category 1' },
    { url: '/pic2.webp', category: 'Category 2' },
    { url: '/pic3.webp', category: 'Category 3' },
    { url: '/pic4.webp', category: 'Category 4' },
    { url: '/pic5.webp', category: 'Category 5' },
    { url: '/pic6.webp', category: 'Category 6' },
    { url: '/pic7.webp', category: 'Category 7' },
    { url: '/pic8.webp', category: 'Category 8' },
    { url: '/pic9.webp', category: 'Category 9' },
    { url: '/pic10.webp', category: 'Category 10' },
    // Add more items as needed
  ];

  return (
    <div>
      <Banner
       backgroundImage="/banner2.webp"
        heading="Welcome to Our Site!"
        buttonText="Learn More"
        onButtonClick={() => alert('Button clicked!')}/>
        <Categories/>
      <Cards/>  
    </div>
  )
}

export default page
