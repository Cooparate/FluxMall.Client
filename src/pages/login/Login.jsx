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
              <h1>Đăng nhập</h1>
            </Link>
            <p>Vui lòng nhập thông tin của bạn để đăng nhập</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email/Tên đăng nhập</label>
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
                <label htmlFor="password">Mật khẩu</label>
                <a href="#" className="forgot-link">
                  Quên mật khẩu?
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
              Đăng nhập
            </button>

            <div className="oauth-divider">
              <span>hoặc đăng nhập với</span>
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
                Bạn mới biết đến FluxMall? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="login-side">
          <div className="side-content">
            <h2>Fluxmall dẫn lối phong cách sống của bạn</h2>
            <p>
              Khởi đầu hành trình mua sắm thông minh với Fluxmall <br />
              Nền tảng tốt nhất thế giới trải nghiệm không ngừng nghỉ, <br />
              giá trị không giới hạn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
