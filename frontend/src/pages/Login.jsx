// frontend/src/pages/Login.jsx

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Logout popup
  useEffect(() => {
    if (location.state?.logoutSuccess) {
      toast.success('Logout successful');

      // Clear state after popup
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError('');
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      // Send login request
      const { data } = await api.post(
        '/auth/login',
        formData
      );

      // If login successful
      if (data.success) {
        // Save token
        localStorage.setItem('token', data.token);

        // Save user data
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        // LOGIN SUCCESS POPUP
        toast.success('Login successful');

        // Redirect after popup
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // Invalid credentials
        toast.error(
          data.message || 'Invalid credentials'
        );
      }
    } catch (err) {
      // Backend/server error
      toast.error(
        err.response?.data?.message ||
          'Login failed. Try again.'
      );

      setError(
        err.response?.data?.message ||
          'Login failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #FFF0EA 0%, #F8F9FA 100%)',
        padding: '20px'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '420px'
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              background: '#E8520A',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: 'Sora, sans-serif',
              margin: '0 auto 14px'
            }}
          >
            Z
          </div>

          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.6rem',
              color: '#1A1A2E',
              marginBottom: '6px'
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              color: '#6B7280',
              fontSize: '0.9rem'
            }}
          >
            Log in to manage your service requests
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '8px',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '0.9rem',
            color: '#6B7280'
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#E8520A',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;