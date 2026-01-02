import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./category.scss";

export default function Category() {
  const { type } = useParams();
  const { products } = data;

  // Chức năng tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const query = localStorage.getItem('fluxmall_search') || '';
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
            <div className="top-banner">
              LAPTOP GAMING & VĂN PHÒNG - ƯU ĐÃI LÊN ĐẾN 30%
            </div>

            {/* <div className="bottom-banner">
                <img src="/src/assets/images/Banner-Laptop-Lenovo.webp" alt="" />
                <img src="/src/assets/images/Banner-Headphone-Sony.webp" alt="" />
            </div> */}

            {/* <div className="bottom-banner">
              <div className="banner-left">
                <img src="/src/assets/images/Banner-Laptop-Lenovo.webp" alt="" />
              </div>
              <div className="banner-right">
                <img src="/src/assets/images/Banner-Headphone-Sony.webp" alt="" />
              </div>
            </div> */}

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

                {/* Banner dưới menu */}
                {/* <div className="sticker">
                  <img src="/src/assets/images/Banner-Laptop-Doc.webp" alt="" />
                </div>
                */}

                {/* <div className="sidebar-banner">
                  <h4>Trả góp 0%</h4>
                  <p>Duyệt nhanh chóng</p>
                </div>

                <div className="sidebar-banner">
                  <h4>Trả góp 0%</h4>
                  <p>Duyệt nhanh chóng</p>
                </div> */}
              </aside>

              {/* Main content */}
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory = p.category.toLowerCase() === "laptop";
                      if (!searchQuery) return matchCategory;
                      return matchCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
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
            <div className="top-banner">
              KEYBOARD MECHANICAL - NÂNG TẦM TRẢI NGHIỆM GAMING
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
                  <h4>Hot Swap</h4>
                  <p>Tùy chỉnh switch</p>
                </div>

                <div className="sidebar-banner">
                  <h4>Hot Swap</h4>
                  <p>Tùy chỉnh switch</p>
                </div>

                <div className="sidebar-banner">
                  <h4>Hot Swap</h4>
                  <p>Tùy chỉnh switch</p>
                </div>

                <div className="sidebar-banner">
                  <h4>Hot Swap</h4>
                  <p>Tùy chỉnh switch</p>
                </div>
              </aside>

              {/* Main content */}
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory = p.category.toLowerCase() === "keyboard";
                      if (!searchQuery) return matchCategory;
                      return matchCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="bottom-banner">
                  MUA KEYBOARD TẶNG KEYCAP - FREESHIP TOÀN QUỐC
                </div>
              </main>

              {/* Right banners */}
              <aside className="right-banners">
                <div className="banner banner-above">
                  <h3 className="banner-title">RGB Lighting</h3>
                  <p className="banner-text">
                    16.8 triệu màu
                    <br />
                    Tùy chỉnh theo ý
                  </p>
                  <button className="banner-btn">Khám phá</button>
                </div>

                <div className="banner banner-below">
                  <h3 className="banner-title">Wireless</h3>
                  <p className="banner-text">
                    Kết nối không dây
                    <br />
                    Pin lâu dài
                  </p>
                  <button className="banner-btn">Xem thêm</button>
                </div>
              </aside>
            </div>
          </div>
        );

      /* ============ MOUSE ============ */
      case "mouse":
        return (
          <div className="layout">
            <div className="top-banner">
              GAMING MOUSE - CHÍNH XÁC TUYỆT ĐỐI - CHIẾN THẮNG MỌI TRẬN ĐẤU
            </div>
            <div className="main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Thương hiệu</h3>
                  <ul className="brand-list">
                    {[
                      "Logitech",
                      "Razer",
                      "SteelSeries",
                      "Corsair",
                      "HyperX",
                    ].map((brand) => (
                      <li key={brand} className="brand-item">
                        <a href="#" className="brand-link">
                          {brand}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar-banner">
                  <h4>High DPI</h4>
                  <p>Lên đến 25,600</p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory = p.category.toLowerCase() === "mouse";
                      if (!searchQuery) return matchCategory;
                      return matchCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="bottom-banner">
                  CHUỘT GAMING PRO - SENSOR QUANG HỌC - PHẢN HỒI CỰC NHANH
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <h3 className="banner-title">Siêu nhẹ</h3>
                  <p className="banner-text">
                    Dưới 60g
                    <br />
                    Di chuyển linh hoạt
                  </p>
                  <button className="banner-btn">Xem ngay</button>
                </div>
                <div className="banner banner-below">
                  <h3 className="banner-title">Không dây</h3>
                  <p className="banner-text">
                    Độ trễ thấp
                    <br />
                    Pin 100+ giờ
                  </p>
                  <button className="banner-btn">Tìm hiểu</button>
                </div>
              </aside>
            </div>
          </div>
        );

      /* ============ HEADPHONE ============ */
      case "headphone":
        return (
          <div className="layout">
            <div className="top-banner">
              HEADPHONE GAMING - ÂM THANH SỐNG ĐỘNG - ĐÀM THOẠI RÕ NÉT
            </div>
            <div className="main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Thương hiệu</h3>
                  <ul className="brand-list">
                    {["Sony", "Razer", "SteelSeries", "Corsair", "HyperX"].map(
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
                <div className="sidebar-banner">
                  <h4>Chống ồn chủ động</h4>
                  <p>Âm thanh trong trẻo</p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => {
                      const matchCategory = p.category.toLowerCase() === "headphone";
                      if (!searchQuery) return matchCategory;
                      return matchCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="bottom-banner">
                  HEADPHONE CHÍNH HÃNG - GIẢM GIÁ ĐẶC BIỆT
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <h3 className="banner-title">Âm thanh vòm</h3>
                  <p className="banner-text">
                    Trải nghiệm 7.1
                    <br />
                    Chìm đắm trong game
                  </p>
                  <button className="banner-btn">Khám phá</button>
                </div>
                <div className="banner banner-below">
                  <h3 className="banner-title">Không dây</h3>
                  <p className="banner-text">
                    Đàm thoại rõ nét
                    <br />
                    Pin lâu dài
                  </p>
                  <button className="banner-btn">Tìm hiểu</button>
                </div>
              </aside>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="category">
      {/* <h2>{type.toUpperCase()}</h2> */}
      {renderLayout()}
    </div>
  );
}

// export default function Category() {
// const { type } = useParams();
// const { products } = data;

//   return (
//     <div style={{ marginTop: 20}}>
//       <h2>{type.toUpperCase()}</h2>

//       <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//       {products
//         .filter((item) => item.category.toLowerCase() === type.toLowerCase())
//         .map((item) => (
//         <ProductCard key={item.id} item={item} />
//       ))}
//       </div>
//     </div>
//   );
// }
