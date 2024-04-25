// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
