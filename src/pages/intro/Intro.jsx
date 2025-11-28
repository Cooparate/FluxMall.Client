import { Link } from 'react-router-dom';
import Navbar from '../../components/LayoutNavbarIntro/NavbarIntro';
import './Intro.scss';

const Intro = () => {
  return (
    <div className="intro-page">
      <Navbar />

      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Nơi mua sắm gặp gỡ <span className="text-gradient">sự đổi mới</span>
          </h1>
          <p className="hero-subtitle">
            FluxMall là nền tảng thương mại điện tử hiện đại mang đến trải nghiệm mua sắm tốt nhất ngay trong tầm tay bạn.
            Khám phá hàng ngàn sản phẩm với quy trình thanh toán liền mạch và giao hàng nhanh chóng.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get started for free</Link>
            <a href="#features" className="btn-secondary">Explore features →</a>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="features-container">
          <h2 className="section-title">Tại sao lựa chọn FluxMall?</h2>
          <p className="section-subtitle">Mọi thứ bạn cần cho trải nghiệm mua sắm hoàn hảo</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Mua sắm dễ dàng</h3>
              <p>Duyệt qua hàng ngàn sản phẩm với chức năng tìm kiếm và lọc trực quan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Nhanh như chớp</h3>
              <p>Trải nghiệm hiệu suất cực nhanh với nền tảng được tối ưu hóa của chúng tôi.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Thanh toán an toàn</h3>
              <p>Mua sắm an toàn bằng hệ thống xử lý thanh toán an toàn của chúng tôi.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Giao hàng nhanh chóng</h3>
              <p>Nhận đơn hàng của bạn được giao nhanh chóng với đối tác vận chuyển đáng tin cậy của chúng tôi.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Giá cả tốt nhất</h3>
              <p>Tận hưởng mức giá cạnh tranh và ưu đãi độc quyền từ các thương hiệu hàng đầu.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Cá nhân hóa</h3>
              <p>Nhận đề xuất sản phẩm phù hợp với sở thích của bạn.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-container">
          <h2 className="section-title">Gặp gỡ nhóm của chúng tôi</h2>
          <p className="section-subtitle">Những người đúng sau FluxMall</p>
          <div className="team-grid">
            <div className="team-card">
              <img src="/src/assets/images/consauhayngu.jpg" alt="Backend Developer" className="team-image" />
              {/* <div className="team-placeholder">👨‍💻</div> */}
              <h3>Backend Developer</h3>
              <p className="team-role">Architecture & API</p>
              <p className="team-description">Xây dựng các hệ thống phụ trợ mạnh mẽ và có khả năng mở rộng</p>
            </div>
            <div className="team-card">
              <img src="/src/assets/images/rian_pham.jpg" alt="Frontend Developer" className="team-image" />
              {/* <div className="team-placeholder">👩‍💻</div> */}
              <h3>Frontend Developer</h3>
              <p className="team-role">UI/UX & Design</p>
              <p className="team-description">Tạo ra trải nghiệm người dùng đẹp và trực quan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="intro-footer">
        <div className="footer-container">
          <p>&copy; 2025 FluxMall. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};

export default Intro;