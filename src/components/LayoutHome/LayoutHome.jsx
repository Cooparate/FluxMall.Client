import React, { useState} from "react";
import { Link } from 'react-router-dom';
import "./layoutHome.scss";

import { banner} from "../../assets";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FiShoppingBag } from "react-icons/fi";


export default function layoutHome() {
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

        <nav class="nav"> 
          <div class="container"> 
            <ul class="nav-menu"> 
              <li><Link to="/home">Trang chủ</Link></li> 
              <li><Link to="/">Giới thiệu</Link></li> 
              
              {/* --Sản phẩm bán chạy-- */}
              <li class="has-dropdown">
                <a href="#">Sản phẩm</a>
                <ul class="dropdown-menu">
                  <li><a href="#">Laptop</a></li>
                  <li><a href="#">Điện thoại</a></li>
                  <li><a href="#">Bàn phím cơ</a></li>
                  <li><a href="#">Chuột không dây</a></li>
                  <li><a href="#">Tai nghe bluetooth</a></li>
                  <li><a href="#">Máy chiếu</a></li>

                </ul>
              </li>

              {/* --Sản phẩm bán chạy-- */}
              <li class="has-dropdown">
                <a href="#">Sản phẩm bán chạy</a>
                <ul class="dropdown-menu">
                  <li><a href="#">Mới ra mắt</a></li>
                  <li><a href="#">Bán chạy nhất</a></li>
                  <li><a href="#">Cao cấp</a></li>
                  <li><a href="#">Giá tốt nhất</a></li>
                </ul>
              </li>
              
              {/* -- Phụ kiện -- */}
              <li class="has-dropdown">
                <a href="#">Phụ kiện</a>
                <ul class="dropdown-menu">
                  <li><a href="#">Túi chống sốc</a></li>
                  <li><a href="#">Ba lô laptop</a></li>
                  <li><a href="#">Lót chuột</a></li>
                  <li><a href="#">Bộ vệ sinh laptop</a></li>
                  <li><a href="#">Đế tảng nhiệt</a></li>

                </ul>
              </li>
              
              {/* -- Ưu đãi -- */}
              <li class="has-dropdown">
                <a href="#">Ưu đãi</a>
                <ul class="dropdown-menu">
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
  )
}