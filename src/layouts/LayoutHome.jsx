import { useState} from "react";
import { Link } from 'react-router-dom';
import "./layoutHome.scss";


import { banner} from "../assets";
import { HiMagnifyingGlass } from "react-icons/hi2";
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
        < Outlet/>
      </header>
  );
}