import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import LayoutIntro  from "../../layouts/LayoutIntro";

import { GrGithub } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    
    // Validation
    if (formData.username.length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự!');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Email không hợp lệ!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }
    
    // Lấy danh sách users hiện tại từ localStorage
    const users = JSON.parse(localStorage.getItem('fluxmall_users') || '[]');
    
    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const userExists = users.find(
      u => u.username === formData.username || u.email === formData.email
    );
    
    if (userExists) {
      setError('Tên đăng nhập hoặc email đã tồn tại!');
      return;
    }
    
    // Thêm user mới vào danh sách
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password, // Note: Trong thực tế không bao giờ lưu password plain text!
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('fluxmall_users', JSON.stringify(users));
    
    // TODO: API - Gọi API đăng ký thật
    // fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: formData.username,
    //     email: formData.email,
    //     password: formData.password
    //   })
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Đăng ký thành công!');
    //     navigate('/login');
    //   } else {
    //     setError(data.message || 'Đăng ký thất bại!');
    //   }
    // });
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    navigate('/login');
  };

  return (
    <>
      <LayoutIntro />
      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <Link to="/" className="logo-link">
            </Link>
            <h2>Tạo tài khoản mới</h2>
            <p>Vui lòng nhập thông tin của bạn để đăng ký</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ít nhất 3 ký tự"
                  required
                  autoComplete="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ít nhất 6 ký tự"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="terms">
              <p>
                Bằng cách tạo tài khoản, bạn đồng ý với{" "}
                <a href="#">Điều khoản Dịch vụ</a> &{" "}
                <a href="#">Chính sách bảo mật</a> của Fluxmall
              </p>
            </div>

            <button type="submit" className="btn-submit">
              Tạo tài khoản
            </button>

            <div className="oauth-divider">
              <span>hoặc tiếp tục với</span>
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
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="register-side">
          <div className="side-content">
            <h2>Fluxmall dẫn lối phong cách sống của bạn</h2>
            <p>
              Tham gia cộng đồng mua sắm thông minh với Fluxmall <br />
              Khám phá sản phẩm tuyệt vời từ các nhà bán hàng <br />
              uy tín trên toàn thế giới
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;