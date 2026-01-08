import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./layoutHome.scss";

import { banner } from "../assets";
import {
  HiMagnifyingGlass,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  AiOutlineClose,
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  IoLogoGithub,
} from "../components/icons";
import { HiMenu } from "react-icons/hi";

import { Outlet, useNavigate } from "react-router-dom";

export default function layoutHome() {
  const [openMenu, setOpenMenu] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  // Lấy thông tin user hiện tại
  useEffect(() => {
    const user = localStorage.getItem("fluxmall_current_user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fluxmall_current_user");
    setCurrentUser(null);
    setUserDropdown(false);
    navigate("/login");
  };

  const checkLoginBeforeAction = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <img src={banner} alt="img" />
        </div>
        <div className="header-main">
          <div className="container">
            {/* Hamburger Menu - Only on Mobile */}
            <button 
              className="hamburger-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <HiMenu />
            </button>

            <div className="logo">
              <h1>FluxMall</h1>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) =>
                  localStorage.setItem("fluxmall_search", e.target.value)
                }
              />
              <HiMagnifyingGlass className="icon" />
            </div>
            <div className="header-right">
              {/* User dropdown */}
              {currentUser ? (
                <div className="user-menu">
                  <button
                    className="user-button"
                    onClick={() => setUserDropdown(!userDropdown)}
                  >
                    <FiUser className="icon" />
                    <span className="username">{currentUser.username}</span>
                  </button>

                  {userDropdown && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <p className="user-name">{currentUser.username}</p>
                        <p className="user-email">{currentUser.email}</p>
                      </div>
                      <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut className="icon" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="login-link">
                  <FiUser className="icon" />
                  Đăng nhập
                </Link>
              )}

              {/* Cart icon */}
              <button
                className="cart-link"
                onClick={(e) => {
                  if (!checkLoginBeforeAction()) {
                    e.preventDefault();
                    return;
                  }
                  navigate("/cart");
                }}
              >
                <FiShoppingBag className="icon" />
                <span className="cart-text">Giỏ hàng</span>
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal yêu cầu đăng nhập */}
        {showLoginAlert && (
          <div
            className="modal-overlay"
            onClick={() => setShowLoginAlert(false)}
          >
            <div
              className="modal-content login-alert"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowLoginAlert(false)}
              >
                <AiOutlineClose />
              </button>

              <div className="login-alert-body">
                <div className="alert-icon">🔒</div>
                <h3>Yêu cầu đăng nhập</h3>
                <p>Bạn cần đăng nhập để truy cập giỏ hàng</p>

                <div className="alert-actions">
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập ngay
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowLoginAlert(false)}
                  >
                    Để sau
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal yêu cầu đăng nhập */}
        {showLoginAlert && (
          <div
            className="modal-overlay"
            onClick={() => setShowLoginAlert(false)}
          >
            <div
              className="modal-content login-alert"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setShowLoginAlert(false)}
              >
                <AiOutlineClose />
              </button>

              <div className="login-alert-body">
                <div className="alert-icon">🔒</div>
                <h3>Yêu cầu đăng nhập</h3>
                <p>Bạn cần đăng nhập để truy cập giỏ hàng</p>

                <div className="alert-actions">
                  <button
                    className="btn-login"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập ngay
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowLoginAlert(false)}
                  >
                    Để sau
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sidebar Menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="mobile-menu-overlay"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="mobile-sidebar">
              <div className="mobile-sidebar-header">
                <h3>Menu</h3>
                <button 
                  className="close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              
              <nav className="mobile-nav">
                <Link 
                  to="/home" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trang chủ
                </Link>

                <div className="mobile-menu-group">
                  <span className="menu-group-title">Sản phẩm</span>
                  <Link 
                    to="/category/laptop"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Laptop
                  </Link>
                  <Link 
                    to="/category/keyboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bàn phím
                  </Link>
                  <Link 
                    to="/category/mouse"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Chuột
                  </Link>
                  <Link 
                    to="/category/headphone"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tai nghe
                  </Link>
                </div>

                <div className="mobile-menu-group">
                  <span className="menu-group-title">Sản phẩm bán chạy</span>
                  <Link 
                    to="/bestseller"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bán chạy nhất
                  </Link>
                  <Link 
                    to="/newarrivals"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mới ra mắt
                  </Link>
                </div>

                <Link 
                  to="/sale"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Giảm giá sốc
                </Link>

                <Link 
                  to="/student"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ưu đãi sinh viên
                </Link>

                <div className="mobile-menu-group">
                  <span className="menu-group-title">Phụ kiện</span>
                  <Link 
                    to="/accessories/bag"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Túi chống sốc
                  </Link>
                  <Link 
                    to="/accessories/cleaning"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bộ vệ sinh laptop
                  </Link>
                  <Link 
                    to="/accessories/rack"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Đế tản nhiệt
                  </Link>
                </div>

                <Link 
                  to="/warranty"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trung tâm bảo hành
                </Link>

                <Link 
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Liên hệ
                </Link>
              </nav>
            </div>
          </>
        )}

        <nav className="nav desktop-nav">
          <div className="container">
            <ul className="nav-menu">
              <li>
                <Link to="/home">Trang chủ</Link>
              </li>

              {/* --Sản phẩm-- */}
              <li
                className={`has-dropdown ${
                  openMenu === "category" ? "open" : ""
                }`}
              >
                <a
                  href="#"
                  className="dropdown-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu(openMenu === "category" ? null : "category");
                  }}
                >
                  Sản phẩm ▼
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/category/laptop"
                      onClick={() => setOpenMenu(null)}
                    >
                      Laptop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/keyboard"
                      onClick={() => setOpenMenu(null)}
                    >
                      Bàn phím
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/mouse"
                      onClick={() => setOpenMenu(null)}
                    >
                      Chuột
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/headphone"
                      onClick={() => setOpenMenu(null)}
                    >
                      Tai nghe
                    </Link>
                  </li>
                </ul>
              </li>

              {/* --Sản phẩm bán chạy-- */}
              <li
                className={`has-dropdown ${
                  openMenu === "bestseller" ? "open" : ""
                }`}
              >
                <a
                  href="#"
                  className="dropdown-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu(
                      openMenu === "bestseller" ? null : "bestseller"
                    );
                  }}
                >
                  Sản phẩm bán chạy ▼
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/bestseller" onClick={() => setOpenMenu(null)}>
                      Bán chạy nhất
                    </Link>
                  </li>
                  <li>
                    <Link to="/newarrivals" onClick={() => setOpenMenu(null)}>
                      Mới ra mắt
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/sale">Giảm giá sốc</Link>
              </li>
              <li>
                <Link to="/student">Ưu đãi sinh viên</Link>
              </li>

              {/* -- Phụ kiện -- */}
              <li
                className={`has-dropdown ${
                  openMenu === "accessories" ? "open" : ""
                }`}
              >
                <a
                  href="#"
                  className="dropdown-trigger"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu(
                      openMenu === "accessories" ? null : "accessories"
                    );
                  }}
                >
                  Phụ kiện ▼
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/accessories/bag"
                      onClick={() => setOpenMenu(null)}
                    >
                      Túi chống sốc
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/accessories/cleaning"
                      onClick={() => setOpenMenu(null)}
                    >
                      Bộ vệ sinh laptop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/accessories/rack"
                      onClick={() => setOpenMenu(null)}
                    >
                      Đế tản nhiệt
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/warranty">Trung tâm bảo hành</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Về FluxMall</h4>
              <ul>
                <li>
                  <a href="#about">Giới thiệu</a>
                </li>
                <li>
                  <a href="#careers">Tuyển dụng</a>
                </li>
                <li>
                  <a href="#news">Tin tức</a>
                </li>
                <li>
                  <a href="#press">Nhà báo</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Chính sách & Quyền lợi</h4>
              <ul>
                <li>
                  <a href="#policy">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="#delivery">Giao hàng miễn phí</a>
                </li>
                <li>
                  <a href="#returns">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="#privacy">Bảo mật thông tin</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li>
                  <a href="#contact">Liên hệ chúng tôi</a>
                </li>
                <li>
                  <a href="#faq">Câu hỏi thường gặp</a>
                </li>
                <li>
                  <a href="#tracking">Theo dõi đơn hàng</a>
                </li>
                <li>
                  <a href="#warranty">Kiểm tra bảo hành</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Kết nối với chúng tôi</h4>
              <div className="social-links">
                <a href="#">
                  <FaFacebookSquare className="icon" />
                </a>
                <a href="#">
                  <FaInstagramSquare className="icon" />
                </a>
                <a href="#">
                  <FaYoutube className="icon" />
                </a>
                <a href="#">
                  <IoLogoGithub className="icon" />
                </a>
              </div>
              <div className="contact-info">
                <a href="#">📞 Hotline: 1900.1234</a>
                <br />
                <a href="#">✉️ Email: support@fluxmall.com</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="payment-methods">
              <span>Phương thức thanh toán:</span>
              <span>Thẻ tín dụng</span>
              <span>Chuyển khoản</span>
              <span>Chuyển trả sau</span>
              <span>E-wallet</span>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2025 FluxMall. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
