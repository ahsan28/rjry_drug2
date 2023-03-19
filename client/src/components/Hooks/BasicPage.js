import React from 'react';
import ViewImage from '../Pages/ViewImage';

const BasicPage = ({ title, description, cover }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {cover && (
        <img
          className="w-64 h-64 mb-8 rounded-full shadow-lg"
          src={cover}
          alt="Landing Page"
        />
        // <ViewImage image={cover} className="w-64 h-64 mb-8 rounded-full shadow-lg" alt="Landing Page" />
      )}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
    </div>
  );
};

export default BasicPage;
