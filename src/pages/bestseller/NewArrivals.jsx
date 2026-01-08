import { useState, useMemo, useEffect } from "react";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./NewArrivals.scss";

export default function NewArrivals() {
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const query = localStorage.getItem("fluxmall_search") || "";
      setSearchQuery(query);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Lọc sản phẩm mới ra mắt
  const newProducts = useMemo(() => {
    return data.products.filter((p) => p.badge?.newArrival === true);
  }, []);

  // Lọc theo category
  const filteredProducts = useMemo(() => {
    let result = newProducts;
    if (category !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Lọc theo tìm kiếm
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sắp xếp
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "newest") {
      result = [...result].reverse();
    }

    return result;
  }, [sortBy, category, searchQuery]);

  // Lấy danh sách category
  const categories = [
    "all",
    ...new Set(newProducts.map((p) => p.category.toLowerCase())),
  ];

  return (
    <div className="newarrivals-page">
      {/* Banner */}
      <div className="newarrivals-banner">
        <div className="banner-content">
          <h1>✨ Sản phẩm mới ra mắt</h1>
          <p>Khám phá những sản phẩm mới nhất vừa được cập nhật</p>
        </div>
      </div>

      <aside className="newarrivals-sidebar">
        {/* ===== DANH MỤC ===== */}
        <div className="filter-section">
          {/* <h3>Danh mục</h3> */}
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* ===== SẮP XẾP ===== */}
        <div className="filter-section">
          <div className="filter-buttons">
            {[
              { value: "newest", label: "Mới nhất" },
              { value: "price-low", label: "Giá thấp → cao" },
              { value: "price-high", label: "Giá cao → thấp" },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`filter-btn ${sortBy === opt.value ? "active" : ""}`}
                onClick={() => setSortBy(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="newarrivals-container">

        {/* Products Grid */}
        <main className="newarrivals-main">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-wrapper">
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>😔 Không tìm thấy sản phẩm</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
