import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // This navigates back to the previous page
    };

    return (
        <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            Go Back
        </button>
    );
};

export default GoBackButton;
