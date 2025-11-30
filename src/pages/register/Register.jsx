import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import LayoutIntro  from "../../components/LayoutIntro/LayoutIntro";

import { GrGithub } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log("Register submitted:", formData);
  };

  return (
    <div>
      <LayoutIntro />
      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <Link to="/" className="logo-link">
              <h1>Đăng ký</h1>
            </Link>
            <p>Vui lòng nhập thông tin của bạn để đăng ký</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                required
                autoComplete="new-password"
              />
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
    </div>
  );
};

export default Register;