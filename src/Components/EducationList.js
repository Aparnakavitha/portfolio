// EducationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Using Axios, but you can also use fetch
import EducationCard from './EducationCard';
import './educationList.css'

const EducationList = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching data from the backend API
    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/education')  // Backend endpoint
            .then((response) => {
                setEducations(response.data);  // Update state with fetched data
                setLoading(false);  // Set loading to false
            })
            .catch((error) => {
                console.error('Error fetching education data:', error);
                setLoading(false);  // Set loading to false on error
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="education-list">
            {educations.length === 0 ? (
                <p>No education data available.</p>
            ) : (
                educations.map((education) => (
                    <EducationCard
                        key={education.id}
                        name={education.name}
                        description={education.description}
                        image={education.image ? education.image : null}
                    />
                ))
            )}
        </div>
    );
};

export default EducationList;
