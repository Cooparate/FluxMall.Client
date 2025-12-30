import { useParams } from "react-router-dom";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./Accessories.scss";

export default function Accessories() {
  const { type } = useParams();
  const { products } = data;

  const renderLayout = () => {
    switch (type) {
      /* ========= Túi chống sốc ========== */
      case "bag":
        return (
          <div className="layout">
            <div className="top-banner">TÚI CHỐNG SỐC DÀNH CHO LAPTOP</div>
            <div className="main-wrapper">
              <aside className="left-banners">
                <div className="banner banner-left"></div>
              </aside>

              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "bag")
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>
            </div>
          </div>
        );

      // ========= Đế tản nhiệt ==========
      case "rack":
        return (
          <div className="layout">
            <div className="top-banner">ĐẾ TẢN NHIỆT</div>
            <div className="main-wrapper">
              <aside className="left-banners">
                <div className="banner banner-left"></div>
              </aside>

              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "rack")
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>

              {/* Right banners */}
              <aside className="right-banners">
                <div className="banner banner-above"></div>

                <div className="banner banner-below"></div>
              </aside>
            </div>
          </div>
        );

      case "cleaning":
        return (
          <div className="layout">
            <div className="top-banner">BỘ DỤNG CỤ VỆ SINH LAPTOP</div>
            <div className="main-wrapper">
              {/* Left banner - KHÔNG CÓ BUTTON */}
              <aside className="left-banners">
                <div className="banner banner-left">
                  {/* Chỉ hiển thị hình ảnh, không có button */}
                </div>
              </aside>

              <main className="main-content">
                <div className="product-grid">
                  {products
                    .filter((p) => p.category.toLowerCase() === "cleaning")
                    .map((item) => (
                      <ProductCard key={item.id} item={item} />
                    ))}
                </div>
              </main>

              {/* Right banners */}
              <aside className="right-banners">
                <div className="banner banner-above"></div>

                <div className="banner banner-below"></div>
              </aside>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="accessories">{renderLayout()}</div>;
}
