import React from 'react';
import './Connect.css';

const Connect = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="page-container">
            <div className="left-section">
                <h2>Connect with Me !</h2>
                <p className="email"> Or just reachout manually to  
                     <a href="mailto:aparnakavitha1@gmail.com" className="email-link">aparnakavitha1@gmail.com</a>
                </p>
            </div>
            <div className="right-section">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="name" placeholder='Name' name="name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" placeholder='Email' name="email" required />
                    </div>
                    <div className="form-group">
                        <input type="number" id="phone" placeholder='PhoneNumber' name="phone" required />
                    </div>
                    <div className="form-group">
                        <textarea id="message" name="message" rows="4" placeholder='Message' required></textarea>
                    </div>
                    <button type="submit" className="button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Connect;
