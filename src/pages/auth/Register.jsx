import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import LayoutIntro  from "../../layouts/LayoutIntro";
import { GrGithub, FcGoogle, FiEye, FiEyeOff } from "../../components/icons";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Tính độ mạnh của mật khẩu
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++; // Có cả chữ thường và hoa
    if (/\d/.test(password)) strength++; // Có số
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Có ký tự đặc biệt
    
    return strength; // 0-5
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Rất yếu', color: '#ef4444' }; // Đỏ
      case 2:
        return { text: 'Yếu', color: '#f97316' }; // Cam
      case 3:
        return { text: 'Trung bình', color: '#eab308' }; // Vàng
      case 4:
        return { text: 'Mạnh', color: '#22c55e' }; // Xanh lá
      case 5:
        return { text: 'Rất mạnh', color: '#16a34a' }; // Xanh lá đậm
      default:
        return { text: '', color: '#e5e7eb' };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Tính độ mạnh mật khẩu khi nhập vào ô password
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setError(""); // Xóa error khi user nhập
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username.trim()) {
      setError('Vui lòng nhập tên đăng nhập!');
      return;
    }
    
    if (formData.username.trim().length < 3) {
      setError('Tên đăng nhập phải có ít nhất 3 ký tự!');
      return;
    }
    
    // Kiểm tra username chỉ chứa chữ cái, số và dấu gạch dưới
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      setError('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới!');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Vui lòng nhập email!');
      return;
    }
    
    // Kiểm tra email format chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Email không hợp lệ!');
      return;
    }
    
    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    
    if (!formData.confirmPassword) {
      setError('Vui lòng nhập lại mật khẩu!');
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
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ít nhất 6 ký tự"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`strength-bar ${
                            level <= passwordStrength ? 'active' : ''
                          }`}
                          style={{
                            backgroundColor:
                              level <= passwordStrength
                                ? getStrengthLabel(passwordStrength).color
                                : '#e5e7eb',
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="strength-text"
                      style={{ color: getStrengthLabel(passwordStrength).color }}
                    >
                      {getStrengthLabel(passwordStrength).text}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
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