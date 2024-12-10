import React, { useState } from 'react';
import Logo from '/download.jpg';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
        // Handle success: e.g., save the token or redirect
        console.log('Login token:', data.token);
      } else {
        setErrorMessage(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-sky-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src={Logo}
            alt="Saveetha Engineering College Logo"
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          />
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800">
            Saveetha Engineering College
          </h1>
          <p className="text-sm text-gray-600">
            Welcome back! Please log in to your account.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-600 rounded-lg shadow-md hover:from-sky-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-300"
          >
            Log In
          </button>
        </form>

        {/* Error and Success Messages */}
        {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-500 mt-2">{successMessage}</p>}

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="signup" className="text-sky-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
