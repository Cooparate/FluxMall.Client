import { useState} from "react";
import { Link } from 'react-router-dom';
import "./layoutHome.scss";


import { banner} from "../assets";
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoLogoGithub } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";


import { Outlet, useNavigate } from "react-router-dom";


export default function layoutHome() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goCategory = (type) => {
  navigate(`/category/${type}`);
  setOpen(false);
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
              <a href="#cart">
                <FiShoppingBag className="icon"/>
              </a>
            </div>
          </div>
        </div>

        <nav className="nav"> 
          <div className="container"> 
            <ul className="nav-menu"> 
              <li><Link to="/home">Trang chủ</Link></li> 
              <li><Link to="/">Giới thiệu</Link></li> 
              
              {/* --Sản phẩm-- */}
              <li className={`has-dropdown ${open ? 'open' : ''}`}>
                <a href="#" onClick={(e) => {e.preventDefault(); setOpen(!open);}}>Sản phẩm</a>
                <ul className="dropdown-menu">
                  <li><a href="" onClick={() => goCategory("laptop")}>Laptop</a></li>
                  <li><a href="" onClick={() => goCategory("keyboard")}>Keyboard</a></li>
                  <li><a href="" onClick={() => goCategory("mouse")}>Mouse</a></li>
                </ul>

              </li>

              {/* --Sản phẩm bán chạy-- */}
              <li className="has-dropdown">
                <a href="#">Sản phẩm bán chạy</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Mới ra mắt</a></li>
                  <li><a href="#">Bán chạy nhất</a></li>
                  <li><a href="#">Cao cấp</a></li>
                  <li><a href="#">Giá tốt nhất</a></li>
                </ul>
              </li>
              
              {/* -- Phụ kiện -- */}
              <li className="has-dropdown">
                <a href="#">Phụ kiện</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Túi chống sốc</a></li>
                  <li><a href="#">Ba lô laptop</a></li>
                  <li><a href="#">Lót chuột</a></li>
                  <li><a href="#">Bộ vệ sinh laptop</a></li>
                  <li><a href="#">Đế tảng nhiệt</a></li>

                </ul>
              </li>
              
              {/* -- Ưu đãi -- */}
              <li className="has-dropdown">
                <a href="#">Ưu đãi</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Dành cho sinh viên</a></li>
                  <li><a href="#">Khuyến mãi</a></li>
                  <li><a href="#">Giảm giá sốc</a></li>
                  <li><a href="#">Quà tặng kèm</a></li>
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