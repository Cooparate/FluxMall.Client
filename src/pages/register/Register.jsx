import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import { NavbarIntro } from '../../components';
import { FcGoogle } from 'react-icons/fc';
import { GrGithub } from 'react-icons/gr';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call will be here
    console.log('Register submitted:', formData);
  };

  return (
    <div>
      <NavbarIntro />

      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <Link to="/" className="logo-link">
              <h1>FluxMall</h1>
            </Link>
            <h2>Create an account</h2>
            <p>Please enter your details to sign up</p>
          </div>
  
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <p className="password-hint">Make sure it's at least 8 characters.</p>
            </div>
  
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
  
            <div className="terms">
              <p>
                By creating an account, you agree to the <a href="#">Terms of Service</a>.
                We'll occasionally send you account-related emails.
              </p>
            </div>
  
            <button type="submit" className="btn-submit">
              Create account
            </button>
          </form>

          <div className="oauth-divider">
            <span>or continue with</span>
          </div>

          <div className="oauth-buttons">
            <button type="button" className="btn-oauth">
              <span className="oauth-icon"><FcGoogle /></span>
              Google
            </button>
            <button type="button" className="btn-oauth">
              <span className="oauth-icon"><GrGithub /></span>
              GitHub
            </button>
          </div>
  
          <div className="register-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
        
        <div className="register-side">
          <div className="side-content">
            <h2>Join our community</h2>
            <p>Experience seamless shopping and discover amazing products from trusted sellers worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;