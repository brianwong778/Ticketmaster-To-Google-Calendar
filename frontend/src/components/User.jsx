import React from 'react';
import './User.css'; // Import the CSS for styling

const User = ({ user }) => {
    return (
        <header className='user'>
            <h1>Welcome, {user.firstName} {user.lastName}!</h1>
        </header>
    );
}

export default User;
