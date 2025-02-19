import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api'; // Import the login API function

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await loginUser(credentials);
            setMessage('Login successful! Redirecting to your notes...');
            localStorage.setItem('token', data.token); // Store token for authentication
            setTimeout(() => navigate('/notes'), 2000); // Redirect to NotesList.js
        } catch (error) {
            setMessage(`Login failed: ${error.error || 'Invalid credentials'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={credentials.username}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={credentials.password}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>{message}</p>
            {message.includes('Login successful') && (
                <p>
                    <a href="/notes">Go to Notes</a>
                </p>
            )}
        </div>
    );
};

export default LoginForm;
