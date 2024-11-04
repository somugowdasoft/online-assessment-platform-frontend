import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const GoBackButton = ({path}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(path ? path : -1); // This navigates back to the previous page
    };

    return (
        <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            <FaArrowAltCircleLeft className="mr-2" /> {/* Add margin for spacing */}
            Go Back
        </button>
    );
};

export default GoBackButton;
