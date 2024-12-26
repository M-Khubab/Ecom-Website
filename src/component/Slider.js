"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Categories = () => {
  const categories = [
    { name: "Category 1", image: "/pic1.webp" },
    { name: "Category 3", image: "/pic3.webp" },
    { name: "Category 2", image: "/pic2.webp" },
    { name: "Category 4", image: "/pic4.webp" },
    { name: "Category 5", image: "/pic5.webp" },
    { name: "Category 6", image: "/pic6.webp" },
  ];

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Categories</h2>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="text-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-40 h-40 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-2 text-lg font-medium">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
                <h3 className="mt-2 text-lg font-medium">{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
