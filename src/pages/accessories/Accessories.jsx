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
            <div className="top-banner top-banner-bag"></div>
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
            <div className="top-banner top-banner-rack"></div>
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
            </div>
          </div>
        );

      case "cleaning":
        return (
          <div className="layout">
            <div className="top-banner top-banner-cleaning"></div>
            <div className="main-wrapper">
              <aside className="left-banners">
                <div className="banner banner-left">
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
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="accessories">{renderLayout()}</div>;
}
