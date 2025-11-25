import { Link } from 'react-router-dom';
import './NavbarIntro.scss';

const NavbarIntro = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h2>FluxMall</h2>
        </Link>
        <div className="nav-links">
          <div className="nav-auth">
            <Link to="/login" className="btn-login">Sign in</Link>
            <Link to="/register" className="btn-register">Sign up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarIntro;
