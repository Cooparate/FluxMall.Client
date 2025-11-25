import { Link } from 'react-router-dom';
import Navbar from '../../components/LayoutNavbarIntro/NavbarIntro';
import './Intro.scss';

const Intro = () => {
  return (
    <div className="intro-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Where shopping meets <span className="text-gradient">innovation</span>
          </h1>
          <p className="hero-subtitle">
            FluxMall is the modern e-commerce platform that brings the best shopping experience to your fingertips.
            Discover thousands of products with seamless checkout and fast delivery.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get started for free</Link>
            <a href="#features" className="btn-secondary">Explore features →</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why choose FluxMall?</h2>
          <p className="section-subtitle">Everything you need for a perfect shopping experience</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Easy Shopping</h3>
              <p>Browse through thousands of products with intuitive search and filtering.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Experience blazing fast performance with our optimized platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Shop with confidence using our secure payment processing system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our reliable shipping partners.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Enjoy competitive prices and exclusive deals on top brands.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized</h3>
              <p>Get product recommendations tailored to your preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The people behind FluxMall</p>
          <div className="team-grid">
            <div className="team-card">
              {/* <img src="/path/to/image" alt="Backend Developer" className="team-image" /> */}
              <div className="team-placeholder">👨‍💻</div>
              <h3>Backend Developer</h3>
              <p className="team-role">Architecture & API</p>
              <p className="team-description">Building robust and scalable backend systems</p>
            </div>
            <div className="team-card">
              {/* <img src="/path/to/image" alt="Frontend Developer" className="team-image" /> */}
              <div className="team-placeholder">👩‍💻</div>
              <h3>Frontend Developer</h3>
              <p className="team-role">UI/UX & Design</p>
              <p className="team-description">Creating beautiful and intuitive user experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="intro-footer">
        <div className="footer-container">
          <p>© 2025 FluxMall. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Intro;