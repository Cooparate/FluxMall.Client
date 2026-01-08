import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./category.scss";
import {
  bannerKeyboard01,
  bannerKeyboard02,
  bannerMouse01,
  bannerMouse03,
} from "../../assets";

export default function Category() {
  const { type } = useParams();
  const { products } = data;

  // Chức năng tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const query = localStorage.getItem("fluxmall_search") || "";
      setSearchQuery(query);
    }, 300);
    return () => clearInterval(interval);
  }, []);
  //

  const renderLayout = () => {
    switch (type) {
      /* ============ LAPTOP ============ */
      case "laptop":
        return (
          <div className="layout">
            {/* Banner trên đầu */}
            <div className="top-banner-text">
              LAPTOP GAMING & VĂN PHÒNG - ƯU ĐÃI LÊN ĐẾN 30%
            </div>

            <div className="main-wrapper">
              {/* Sidebar */}
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Hãng sản xuất</h3>
                  <ul className="brand-list">
                    {["Acer", "Asus", "Dell", "HP", "Lenovo", "MSI"].map(
                      (brand) => (
                        <li key={brand} className="brand-item">
                          <a href="#" className="brand-link">
                            {brand}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </aside>

              {/* Main content */}
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory =
                        p.category.toLowerCase() === "laptop";
                      if (!searchQuery) return matchCategory;
                      return (
                        matchCategory &&
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>

              {/* Right banners */}
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Xem ngay</button>
                </div>

                <div className="banner banner-below">
                  <button className="banner-btn">Khám phá</button>
                </div>
              </aside>
            </div>
          </div>
        );

      /* ============ KEYBOARD ============ */
      case "keyboard":
        return (
          <div className="layout">
            {/* Banner trên đầu */}
            <div className="top-banner-text">
              KEYBOARD MECHANICAL - NÂNG TẦM TRẢI
            </div>

            <div className="main-wrapper">
              {/* Sidebar */}
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Loại switch</h3>
                  <ul className="brand-list">
                    <li className="brand-item">
                      <a href="#" className="brand-link">
                        Cherry MX
                      </a>
                    </li>
                    <li className="brand-item">
                      <a href="#" className="brand-link">
                        Gateron
                      </a>
                    </li>
                    <li className="brand-item">
                      <a href="#" className="brand-link">
                        Kailh
                      </a>
                    </li>
                    <li className="brand-item">
                      <a href="#" className="brand-link">
                        Outemu
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Banner dưới menu */}
                <div className="sidebar-banner">
                  <p>
                    MUA KEYBOARD <br /> TẶNG NGAY KEYCAP
                  </p>
                </div>
              </aside>

              {/* Main content */}
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory =
                        p.category.toLowerCase() === "keyboard";
                      if (!searchQuery) return matchCategory;
                      return (
                        matchCategory &&
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>

              {/* Right banners */}
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Khám phá</button>
                </div>
              </aside>
            </div>
            <div className="bottom-banner">
              <img src={bannerKeyboard01} alt="img" />
              <img src={bannerKeyboard02} alt="img" />
            </div>
          </div>
        );

      /* ============ MOUSE ============ */
      case "mouse":
        return (
          <div className="layout">
            <div className="top-banner-text">
              MOUSE - CHÍNH XÁC TUYỆT ĐỐI - CHIẾN THẮNG MỌI TRẬN ĐẤU
            </div>
            <div className="main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Thương hiệu</h3>
                  <ul className="brand-list">
                    {["Logitech", "Razer", "Asus", "DareU"].map((brand) => (
                      <li key={brand} className="brand-item">
                        <a href="#" className="brand-link">
                          {brand}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-banner">
                  <p>
                    SENSOR QUANG HỌC <br /> PHẢN HỒI CỰC NHANH
                  </p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory =
                        p.category.toLowerCase() === "mouse";
                      if (!searchQuery) return matchCategory;
                      return (
                        matchCategory &&
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Xem ngay</button>
                </div>
              </aside>
            </div>
            <div className="bottom-banner">
              <img src={bannerMouse03} alt="img" />
              <img src={bannerMouse01} alt="img" />
            </div>
          </div>
        );

      /* ============ HEADPHONE ============ */
      case "headphone":
        return (
          <div className="layout">
            <div className="top-banner-text">
              HEADPHONE GAMING - ÂM THANH SỐNG ĐỘNG - ĐÀM THOẠI RÕ NÉT
            </div>
            <div className="main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Thương hiệu</h3>
                  <ul className="brand-list">
                    {["Sony", "JBL", "Soundcore", "HyperX"].map((brand) => (
                      <li key={brand} className="brand-item">
                        <a href="#" className="brand-link">
                          {brand}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-banner">
                  <p>
                    HÀNG CHÍNH HÃNG <br /> GIẢM GIÁ ĐẶC BIỆT
                  </p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory =
                        p.category.toLowerCase() === "headphone";
                      if (!searchQuery) return matchCategory;
                      return (
                        matchCategory &&
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      );
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Khám phá</button>
                </div>
              </aside>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="category">{renderLayout()}</div>;
}
