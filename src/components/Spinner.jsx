import React from 'react';

const Spinner = ({ fullScreen = false }) => {
    return (
        <div className={`spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;
