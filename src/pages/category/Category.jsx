import { useParams } from "react-router-dom";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./category.scss";

export default function Category() {
  const { type } = useParams();
  const { products } = data;

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
                    .filter((p) => p.category.toLowerCase() === "laptop")
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
                  {/* <h4>Hot Swap</h4> */}
                  <p>MUA KEYBOARD <br /> TẶNG NGAY KEYCAP</p>
                </div>
              </aside>

              {/* Main content */}
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "keyboard")
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

                {/* <div className="banner banner-below">
                  <button className="banner-btn">Xem thêm</button>
                </div> */}
              </aside>
            </div>
                <div className="bottom-banner">
                  {/* <p>MUA KEYBOARD TẶNG KEYCAP - FREESHIP TOÀN QUỐC</p> */}
                  <img src="/src/assets/images/banner-ban-phim-01.webp" alt="img" />
                  <img src="/src/assets/images/banner-ban-phim-02.webp" alt="img" />
                </div>
          </div>
        );

      /* ============ MOUSE ============ */
      case "mouse":
        return (
          <div className="layout">
            <div className="top-banner">
              MOUSE - CHÍNH XÁC TUYỆT ĐỐI - CHIẾN THẮNG MỌI TRẬN ĐẤU
            </div>
            <div className="main-wrapper">
              <aside className="sidebar">
                <div className="sidebar-content">
                  <h3 className="sidebar-title">Thương hiệu</h3>
                  <ul className="brand-list">
                    {[
                      "Logitech",
                      "Razer",
                      "Asus",
                      "DareU",
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
                  {/* <h4>Hot Swap</h4> */}
                  <p>SENSOR QUANG HỌC <br /> PHẢN HỒI CỰC NHANH</p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "mouse")
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Xem ngay</button>
                </div>
                {/* <div className="banner banner-below">
                  <button className="banner-btn">Tìm hiểu</button>
                </div> */}
              </aside>
            </div>
                <div className="bottom-banner">
                  {/* <p>MUA KEYBOARD TẶNG KEYCAP - FREESHIP TOÀN QUỐC</p> */}
                  <img src="/src/assets/images/Banner-mouse-03.webp" alt="img" />
                  <img src="/src/assets/images/Banner-mouse-01.webp" alt="img" />
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
                    {["Sony", "JBL", "Soundcore", "HyperX"].map(
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
                  <p>HÀNG CHÍNH HÃNG <br /> GIẢM GIÁ ĐẶC BIỆT</p>
                </div>
              </aside>
              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "headphone")
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>
              <aside className="right-banners">
                <div className="banner banner-above">
                  <button className="banner-btn">Khám phá</button>
                </div>
                {/* <div className="banner banner-below">
                  <button className="banner-btn">Tìm hiểu</button>
                </div> */}
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
