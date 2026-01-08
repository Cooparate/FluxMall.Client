// khuyến mãi, giảm giá
import { useState, useMemo, useEffect } from "react";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./sale.scss";

export default function Sale() {
  const [tab, setTab] = useState("flash");
  const [t, setT] = useState(45 * 60);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const i = setInterval(() => setT((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const query = localStorage.getItem("fluxmall_search") || "";
      setSearchQuery(query);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const saleProducts = useMemo(() => {
    let result = data.products.filter((p) => p.promotion?.shockSale === true);
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [searchQuery]);

  return (
    <section className="sale-page">
      {/* ===== Banner ===== */}
      <div className="sale-banner">
        <h1>🔥 Khuyến Mãi Đặc Biệt</h1>
        <p>Săn sale ngay - Giá sốc mỗi ngày</p>
      </div>

      {/* ===== Tabs ===== */}
      <div className="sale-tabs">
        <button
          className={tab === "flash" ? "active" : ""}
          onClick={() => setTab("flash")}
        >
          Flash Sale
        </button>

        <button
          className={tab === "voucher" ? "active" : ""}
          onClick={() => setTab("voucher")}
        >
          Mã giảm giá
        </button>
      </div>

      {/* ===== Flash Sale ===== */}
      {tab === "flash" && (
        <>
          <div className="sale-header">
            <h2>Flash Sale - Giảm giá sốc</h2>
            <span className="countdown">
              Kết thúc sau: {String(Math.floor(t / 3600)).padStart(2, "0")}:
              {String(
                Math.floor((t - Math.floor(t / 3600) * 3600) / 60)
              ).padStart(2, "0")}
              :{String(t - Math.floor(t / 60) * 60).padStart(2, "0")}
            </span>
          </div>

          <main className="sale-main">
            {saleProducts.length > 0 ? (
              <div className="products-grid">
                {saleProducts.map((product) => (
                  <div key={product.id} className="product-wrapper">
                    <ProductCard item={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>Không tìm thấy sản phẩm</p>
              </div>
            )}
          </main>
        </>
      )}

      {/* ===== Voucher ===== */}
      {tab === "voucher" && (
        <div className="voucher-section">
          <h2>🎫 Mã giảm giá</h2>
          <p>Sao chép và áp dụng khi thanh toán</p>

          <div className="voucher-grid">
            <div className="voucher-card">
              <h4>Giảm 50K Flash Sale</h4>
              <span className="code">FLASH50</span>
              <button>Sao chép</button>
            </div>

            <div className="voucher-card highlight">
              <h4>Giảm 100K</h4>
              <span className="code">GIAM100K</span>
              <button>Sao chép</button>
            </div>

            <div className="voucher-card">
              <h4>Freeship 30K</h4>
              <span className="code">FREESHIP30</span>
              <button>Sao chép</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
