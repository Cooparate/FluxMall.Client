import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import "./layoutHome.scss";


import { banner} from "../assets";
import { 
  HiMagnifyingGlass, 
  FiShoppingBag, FiUser, FiLogOut,
  AiOutlineClose,
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
  IoLogoGithub
} from "../components/icons";


import { Outlet, useNavigate } from "react-router-dom";


export default function layoutHome() {

  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  // Lấy thông tin user hiện tại
  useEffect(() => {
    const user = localStorage.getItem('fluxmall_current_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const goCategory = (type) => {
    navigate(`/category/${type}`);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('fluxmall_current_user');
    setCurrentUser(null);
    setUserDropdown(false);
    navigate('/login');
  };

  const checkLoginBeforeAction = () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return false;
    }
    return true;
  };


  return(
    <>
      <header className="header">
        <div className="header-top">
          <img src={banner} alt="img"/>
        </div>
        <div className="header-main">
          <div className="container">
            <div className="logo">
              <h1>FluxMall</h1>
            </div>
            <div className="search-bar">             
              <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <HiMagnifyingGlass className="icon"/>
            </div>            
            <div className="header-right">
              {/* User dropdown */}
              {currentUser ? (
                <div className="user-menu">
                  <button 
                    className="user-button"
                    onClick={() => setUserDropdown(!userDropdown)}
                  >
                    <FiUser className="icon"/>
                    <span className="username">{currentUser.username}</span>
                  </button>
                  
                  {userDropdown && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <p className="user-name">{currentUser.username}</p>
                        <p className="user-email">{currentUser.email}</p>
                      </div>
                      <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut className="icon"/>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="login-link">
                  <FiUser className="icon"/>
                  Đăng nhập
                </Link>
              )}

              {/* Cart icon */}
              <div 
                className="cart-link" 
                onClick={(e) => {
                  if (!checkLoginBeforeAction()) {
                    e.preventDefault();
                    return;
                  }
                  navigate('/cart');
                }}
              >
                <FiShoppingBag className="icon"/>
                <span className="cart-text">Giỏ hàng</span>
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Modal yêu cầu đăng nhập */}
        {showLoginAlert && (
          <div className="modal-overlay" onClick={() => setShowLoginAlert(false)}>
            <div className="modal-content login-alert" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowLoginAlert(false)}>
                <AiOutlineClose />
              </button>
              
              <div className="login-alert-body">
                <div className="alert-icon">🔒</div>
                <h3>Yêu cầu đăng nhập</h3>
                <p>Bạn cần đăng nhập để truy cập giỏ hàng</p>
                
                <div className="alert-actions">
                  <button 
                    className="btn-login"
                    onClick={() => navigate('/login')}
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
          <div className="modal-overlay" onClick={() => setShowLoginAlert(false)}>
            <div className="modal-content login-alert" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowLoginAlert(false)}>
                <AiOutlineClose />
              </button>
              
              <div className="login-alert-body">
                <div className="alert-icon">🔒</div>
                <h3>Yêu cầu đăng nhập</h3>
                <p>Bạn cần đăng nhập để truy cập giỏ hàng</p>
                
                <div className="alert-actions">
                  <button 
                    className="btn-login"
                    onClick={() => navigate('/login')}
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

        <nav className="nav"> 
          <div className="container"> 
            <ul className="nav-menu"> 
              <li><Link to="/home">Trang chủ</Link></li> 
              
              {/* --Sản phẩm-- */}
              <li className={`has-dropdown ${open ? 'open' : ''}`}>
                <a href="#" onClick={(e) => {e.preventDefault(); setOpen(!open);}}>Sản phẩm</a>
                <ul className="dropdown-menu">
                  <li><a href="" onClick={() => goCategory("laptop")}>Laptop</a></li>
                  <li><a href="" onClick={() => goCategory("keyboard")}>Bàn phím</a></li>
                  <li><a href="" onClick={() => goCategory("mouse")}>Chuột</a></li>
                  <li><a href="" onClick={() => goCategory("mouse")}>Tai nghe</a></li>

                </ul>

              </li>

              {/* --Sản phẩm bán chạy-- */}
              <li className="has-dropdown">
                <a href="#">Sản phẩm bán chạy</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Bán chạy nhất</a></li>
                  <li><a href="#">Mới ra mắt</a></li>
                </ul>
              </li>             
              
              <li><a href="#">Giảm giá sốc</a></li>
              <li><a href="#">Dành cho sinh viên</a></li>
  
              {/* -- Phụ kiện -- */}
              <li className="has-dropdown">
                <a href="#">Phụ kiện</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Túi chống sốc</a></li>
                  <li><a href="#">Bộ vệ sinh laptop</a></li>
                  <li><a href="#">Đế tảng nhiệt</a></li>
                </ul>
              </li>

              <li><a href="#">Trung tâm bảo hành</a></li> 
              <li><a href="#">Liên hệ</a></li> 

            </ul> 
          </div> 
        </nav>
      </header>

      <main className="main-content">
        <Outlet/>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Về FluxMall</h4>
              <ul>
                <li><a href="#about">Giới thiệu</a></li>
                <li><a href="#careers">Tuyển dụng</a></li>
                <li><a href="#news">Tin tức</a></li>
                <li><a href="#press">Nhà báo</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Chính sách & Quyền lợi</h4>
              <ul>
                <li><a href="#policy">Chính sách bảo hành</a></li>
                <li><a href="#delivery">Giao hàng miễn phí</a></li>
                <li><a href="#returns">Chính sách đổi trả</a></li>
                <li><a href="#privacy">Bảo mật thông tin</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li><a href="#contact">Liên hệ chúng tôi</a></li>
                <li><a href="#faq">Câu hỏi thường gặp</a></li>
                <li><a href="#tracking">Theo dõi đơn hàng</a></li>
                <li><a href="#warranty">Kiểm tra bảo hành</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Kết nối với chúng tôi</h4>
              <div className="social-links">
                <a href="#"><FaFacebookSquare className="icon"/></a>
                <a href="#"><FaInstagramSquare className="icon"/></a>
                <a href="#"><FaYoutube className="icon"/></a>
                <a href="#"><IoLogoGithub className="icon"/></a>                  
              </div>
              <div className="contact-info">
                <a href="#">📞 Hotline: 1900.1234</a><br />                
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