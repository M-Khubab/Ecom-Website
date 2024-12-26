import React from 'react';

const Banner = ({ backgroundImage, heading, buttonText, onButtonClick }) => {
  return (
    <div
      className="relative flex items-center justify-center h-[300px] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Ensure the URL path is correct
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-center z-10">
        <h1 className="text-3xl font-bold mb-4">{heading}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
