import { useState, useMemo, useEffect } from "react";
import data from "../../assets/data/data.json";
import ProductCard from "../../components/product/ProductCard";
import "./Bestseller.scss";

export default function Bestseller() {
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("all");

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

  // Lọc sản phẩm bestseller
  const bestSellers = useMemo(() => {
    return data.products.filter((p) => p.badge?.bestSeller === true);
  }, []);

  // Lọc theo category
  const filteredProducts = useMemo(() => {
    let result = bestSellers;
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
    ...new Set(bestSellers.map((p) => p.category.toLowerCase())),
  ];

  return (
    <div className="bestseller-page">
      {/* Banner */}
      <div className="bestseller-banner">
        <div className="banner-content">
          <h1>🔥 Sản phẩm bán chạy nhất</h1>
          <p>Những sản phẩm được yêu thích nhất bởi khách hàng của chúng tôi</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bestseller-container">
        {/* Sidebar Filters */}
        <aside className="bestseller-sidebar">
          <div className="filter-section">
            <h3>Danh mục</h3>
            <div className="category-filter">
              {categories.map((cat) => (
                <label key={cat} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span className="filter-label">
                    {cat === "all"
                      ? "Tất cả"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sắp xếp</h3>
            <div className="sort-filter">
              {[
                // { value: 'newest', label: 'Mới nhất' },
                { value: "price-low", label: "Giá thấp đến cao" },
                { value: "price-high", label: "Giá cao đến thấp" },
              ].map((opt) => (
                <label key={opt.value} className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    value={opt.value}
                    checked={sortBy === opt.value}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <span className="filter-label">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-stats">
            <p>
              <strong>{filteredProducts.length}</strong> sản phẩm tìm thấy
            </p>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="bestseller-main">
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
