// LoginPage.jsx
import React from 'react';
import './LoginPage.css';

const LoginPage = ({ setLoggedIn }) => {
    const handleLogin = (event) => {
        // Placeholder for login logic, set loggedIn to true on successful login
        console.log("Login attempt..."); // Simulate login attempt
        setLoggedIn(true); // Set loggedIn to true for simulation purposes
    };
    //onClick={handleLogin}
    //<button  href="/google" className="login-button">Sign in with Google</button>
    //onClick={handleLogin}
    return (
        <div className="login-container">
            <h1>Welcome to Our App</h1>
            <a href="/google"  className="login-button">Sign in with Google</a>
        </div>
    );
}

export default LoginPage;
