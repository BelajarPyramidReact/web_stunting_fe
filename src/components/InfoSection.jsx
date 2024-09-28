import React from 'react';

const InfoSection = ({ title, content, icon: Icon }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
            <div className="bg-teal-100 rounded-full p-3">
                <Icon className="text-teal-600" size={24} />
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-teal-800 mb-2">{title}</h3>
            <p className="text-gray-600">{content}</p>
        </div>
    </div>
);

export default InfoSection;
