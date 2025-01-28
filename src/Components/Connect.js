import React, { useState, useEffect } from 'react';
import './Connect.css';

const Connect = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Form submitted successfully!");
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert("Failed to submit form.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    };

    // Use effect to add the slide-in class on mount
    useEffect(() => {
        const leftSectionElement = document.querySelector('.left-section');
        if (leftSectionElement) {
            leftSectionElement.classList.add('slide-in');
        }
    }, []);

    return (
        <div className="page-container">
            <div className="left-section">
                <h2>Connect with Me!</h2>
                <p className="email">Or just reach out manually to
                    <a href="mailto:aparnakavitha1@gmail.com" className="email-link"> aparnakavitha1@gmail.com</a>
                </p>
            </div>
            <div className="right-section">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            id="phone"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Connect;
