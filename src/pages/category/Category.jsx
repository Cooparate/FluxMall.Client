import { useParams } from "react-router-dom";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import './category.scss'


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
        ⚡ LAPTOP GAMING & VĂN PHÒNG - ƯU ĐÃI ĐẾN 30% ⚡
      </div>

      <div className="main-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">Hãng sản xuất</h3>
            <ul className="brand-list">
              {['Acer', 'Asus', 'Dell', 'HP', 'Lenovo', 'MSI'].map(brand => (
                <li key={brand} className="brand-item">
                  <a href="#" className="brand-link">{brand}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Banner dưới menu */}
          <div className="sidebar-banner">
            <h4>Trả góp 0%</h4>
            <p>Duyệt nhanh chóng</p>
          </div>
          
          <div className="sidebar-banner">
            <h4>Trả góp 0%</h4>
            <p>Duyệt nhanh chóng</p>
          </div>

          <div className="sidebar-banner">
            <h4>Trả góp 0%</h4>
            <p>Duyệt nhanh chóng</p>
          </div>

          <div className="sidebar-banner">
            <h4>Trả góp 0%</h4>
            <p>Duyệt nhanh chóng</p>
          </div>

        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="product-grid">
            {products
              .filter(p => p.category.toLowerCase() === "laptop")
              .map(item => <ProductCard key={item.id} item={item} />)}
          </div>
          
          <div className="bottom-banner">
            🎉 KHUYẾN MÃI ĐẶC BIỆT - GIẢM ĐẾN 30% 🎉
          </div>
        </main>

        {/* Right banners */}
        <aside className="right-banners">
          <div className="banner banner-above">
            <h3 className="banner-title">Gaming Gear</h3>
            <p className="banner-text">Laptop gaming<br/>hiệu năng cao</p>
            <button className="banner-btn">Xem ngay</button>
          </div>
          
          <div className="banner banner-below">
            <h3 className="banner-title">Văn phòng</h3>
            <p className="banner-text">Laptop mỏng nhẹ<br/>cho doanh nhân</p>
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
        ⌨️ KEYBOARD MECHANICAL - NÂNG TẦM TRẢI NGHIỆM GAMING ⌨️
      </div>

      <div className="main-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">Loại switch</h3>
            <ul className="brand-list">
              <li className="brand-item">
                <a href="#" className="brand-link">Cherry MX</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">Gateron</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">Kailh</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">Outemu</a>
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
              .filter(p => p.category.toLowerCase() === "keyboard")
              .map(item => <ProductCard key={item.id} item={item} />)}
          </div>
          
          <div className="bottom-banner">
            🎮 MUA KEYBOARD TẶNG KEYCAP - FREESHIP TOÀN QUỐC 🎮
          </div>
        </main>

        {/* Right banners */}
        <aside className="right-banners">
          <div className="banner banner-above">
            <h3 className="banner-title">RGB Lighting</h3>
            <p className="banner-text">
              16.8 triệu màu<br/>Tùy chỉnh theo ý
            </p>
            <button className="banner-btn">Khám phá</button>
          </div>
          
          <div className="banner banner-below">
            <h3 className="banner-title">Wireless</h3>
            <p className="banner-text">
              Kết nối không dây<br/>Pin lâu dài
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
    <div className="mouse-layout">
      {/* Banner trên đầu */}
      <div className="top-banner">
        🖱️ GAMING MOUSE - CHÍNH XÁC TUYỆT ĐỐI - CHIẾN THẮNG MỌI TRẬN ĐẤU 🖱️
      </div>

      <div className="main-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">Thương hiệu</h3>
            <ul className="brand-list">
              <li className="brand-item">
                <a href="#" className="brand-link">Logitech</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">Razer</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">SteelSeries</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">Corsair</a>
              </li>
              <li className="brand-item">
                <a href="#" className="brand-link">HyperX</a>
              </li>
            </ul>
          </div>
          
          {/* Banner dưới menu */}
          <div className="sidebar-banner">
            <h4>High DPI</h4>
            <p>Lên đến 25,600</p>
          </div>

          <div className="sidebar-banner">
            <h4>High DPI</h4>
            <p>Lên đến 25,600</p>
          </div>

          <div className="sidebar-banner">
            <h4>High DPI</h4>
            <p>Lên đến 25,600</p>
          </div>

          <div className="sidebar-banner">
            <h4>High DPI</h4>
            <p>Lên đến 25,600</p>
          </div>

        </aside>

        {/* Main content */}
        <main className="main-content">
          <div className="product-grid">
            {products
              .filter(p => p.category.toLowerCase() === "mouse")
              .map(item => <ProductCard key={item.id} item={item} />)}
          </div>
          
          <div className="bottom-banner">
            ⚡ CHUỘT GAMING PRO - SENSOR QUANG HỌC - PHẢN HỒI CỰC NHANH ⚡
          </div>
        </main>

        {/* Right banners */}
        <aside className="right-banners">
          <div className="banner banner-above">
            <h3 className="banner-title">Siêu nhẹ</h3>
            <p className="banner-text">
              Dưới 60g<br/>Di chuyển linh hoạt
            </p>
            <button className="banner-btn">Xem ngay</button>
          </div>
          
          <div className="banner banner-below">
            <h3 className="banner-title">Không dây</h3>
            <p className="banner-text">
              Độ trễ thấp<br/>Pin 100+ giờ
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








