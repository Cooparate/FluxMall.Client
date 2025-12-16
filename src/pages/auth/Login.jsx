import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import LayoutIntro from '../../layouts/LayoutIntro';
import { GrGithub } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Xóa error khi user nhập
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra thông tin đăng nhập
    const validEmail = "admin@demo.com";
    const validUsername = "admin";
    const validPassword = "admin@123";
    
    // Kiểm tra admin mặc định
    if ((formData.email === validEmail || formData.email === validUsername) && 
        formData.password === validPassword) {
      localStorage.setItem('fluxmall_current_user', JSON.stringify({ 
        username: 'admin',
        email: validEmail 
      }));
      alert('Đăng nhập thành công!');
      navigate('/home');
      return;
    }
    
    // Kiểm tra users đã đăng ký
    const users = JSON.parse(localStorage.getItem('fluxmall_users') || '[]');
    const user = users.find(
      u => (u.username === formData.email || u.email === formData.email) && 
           u.password === formData.password
    );
    
    if (user) {
      // Đăng nhập thành công
      // TODO: API - Gọi API đăng nhập thật
      // fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // .then(res => res.json())
      // .then(data => {
      //   if (data.success) {
      //     localStorage.setItem('token', data.token);
      //     navigate('/home');
      //   }
      // });
      
      localStorage.setItem('fluxmall_current_user', JSON.stringify({
        username: user.username,
        email: user.email
      }));
      alert('Đăng nhập thành công!');
      navigate('/home');
    } else {
      setError('Email/Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <>
      <LayoutIntro />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <Link to="/" className="logo-link">
            </Link>
            <h2>Đăng nhập</h2>
            <p>Vui lòng nhập thông tin của bạn để đăng nhập</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email/Tên đăng nhập</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
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
                placeholder="Ít nhất 6 ký tự"
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
    </>
  );
};

export default Login;
