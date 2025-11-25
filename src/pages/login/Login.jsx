import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { NavbarIntro } from "../../components";
import { GrGithub } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    console.log("Login submitted:", formData);
  };

  return (
    <div>
      <NavbarIntro />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <Link to="/" className="logo-link">
              <h1>FluxMall</h1>
            </Link>
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
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
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn-submit">
              Sign in
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

          <div className="login-footer">
            <p>
              New to FluxMall? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>

        <div className="login-side">
          <div className="side-content">
            <h2>Start your journey with us</h2>
            <p>
              Discover the world's best platform for managing your business and
              achieving your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
