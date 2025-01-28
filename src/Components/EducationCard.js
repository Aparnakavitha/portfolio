// EducationCard.js
import React from 'react';

const EducationCard = ({ name, description, image }) => {
    // If image exists, convert byte array to a base64 string
    const imageUrl = image ? `data:image/jpeg;base64,${image}` : null;

    return (
        <div className="education-card">
            {imageUrl && <img src={imageUrl} alt={name} className="education-image" />}
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default EducationCard;
