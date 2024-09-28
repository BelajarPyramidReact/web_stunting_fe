import React from 'react';

const StatCard = ({ title, value, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-teal-900 mb-2">{value}</p>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

export default StatCard;
