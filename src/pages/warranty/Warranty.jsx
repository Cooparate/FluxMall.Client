import { useState, useMemo } from 'react';
import data from '../../assets/data/data.json';

import './warranty.scss';

import ImLaptop from '../../assets/images/Dell-detail-12.webp'
import ImKeyboard from '../../assets/images/Ban-phim-DareU-LK160D.webp';
import ImHeadphone from '../../assets/images/Tai-nghe-detail-11.webp'
import ImMouse from '../../assets/images/Chuot-detail-31.webp'



const productCategories = [
  { id: 1, name: 'Laptop', label: 'Laptop' },
  { id: 2, name: 'Mouse', label: 'Chuột' },
  { id: 3, name: 'Keyboard', label: 'Bàn phím' },
  { id: 4, name: 'HeadPhone', label: 'Tai nghe' },
];

const vietnameseProvinces = [
  'TP. Hồ Chí Minh', 'Cần Thơ', 'Long An', 'Tiền Giang', 'Bến Tre', 'Đồng Tháp'
];

const Warranty = () => {
  const [selectedCategory, setSelectedCategory] = useState('Laptop');
  const [selectedBrand, setSelectedBrand] = useState('Acer');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errors, setErrors] = useState([]);

  // Tìm các hãng của sp đã chọn
  const availableBrands = useMemo(() => {
    const brands = data.products
      .filter((center) => center.category === selectedCategory)
      .map((center) => center.brand)
      .filter((brand, index, self) => self.indexOf(brand) === index)
      .sort();
    return brands;
  }, [selectedCategory]);

  // Cập nhật hãng đã chọn khi sp thay đổi.
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const brands = data.products
      .filter((center) => center.category === category)
      .map((center) => center.brand)
      .filter((brand, index, self) => self.indexOf(brand) === index)
      .sort();
    setSelectedBrand(brands[0] || '');
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearch = () => {
    const newErrors = [];
    if (!selectedProvince) {
      newErrors.push('Bạn chưa chọn tỉnh thành');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    setErrors([]);
    setSearchResults([]); // chưa có store thì cho rỗng
    setHasSearched(true);

    const results = data.products.filter(
      (product) =>
        product.category === selectedCategory &&
        product.brand === selectedBrand)
      .flatMap(product => product.store
        .filter(store => store.province === selectedProvince)
          .map(store => ({ ...product, store }))
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleContactClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="warranty-container">
      <div className="warranty-search">
        <h1 className='top-banner'>Tra cứu trung tâm bảo hành</h1>

        {/* Lựa chọn danh mục sản phẩm */}
        <div className="warranty-form-section">
          <label className="warranty-label">Chọn loại sản phẩm</label>
          <div className="warranty-options">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className={`warranty-option ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.name)}
              >
                <div className="warranty-option-icon">
                  <img
                    src={
                      category.name === 'Laptop' ? ImLaptop :
                      category.name === 'Mouse' ? ImMouse :
                      category.name === 'Keyboard' ? ImKeyboard :
                      ImHeadphone
                    }
                    alt={category.name}
                  />
                </div>

                <div className="warranty-option-label">{category.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Selection */}
        <div className="warranty-form-section">
          <label className="warranty-label">Chọn hãng</label>
          <div className="warranty-brands">
            {availableBrands.map((brand) => (
              <button
                key={brand}
                className={`warranty-brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Province Selection */}
        <div className="warranty-form-section">
          <label className="warranty-label">Chọn tỉnh thành</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="warranty-select"
          >
            <option value="">-- Chọn tỉnh thành --</option>
            {vietnameseProvinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="warranty-errors">
            {errors.map((error, index) => (
              <div key={index} className="warranty-error-item">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Search Button */}
        <button className="warranty-search-btn" onClick={handleSearch}>
          Tìm kiếm ngay
        </button>
      </div>

      {/* Search Results */}
      {hasSearched && searchResults && (
        <div className="warranty-results">
          {searchResults.length > 0 ? (
            <div className="warranty-cards-container">
              {searchResults.map((center) => (
                <div key={center.store.id} className="warranty-card">
                  <div className="warranty-card-badge">{center.store.status}</div>
                  <h3 className="warranty-card-title">
                    Trung tâm Bảo hành {center.store.brand} {center.store.city}
                  </h3>
                  <div className="warranty-card-info">
                    <div className="warranty-info-item">
                      <span className="warranty-info">Địa chỉ: </span>
                      <span>{center.store.address}</span>
                    </div>
                    <div className="warranty-info-item">
                      <span className="warranty-info">Hotline: </span>
                      <span>{center.store.phone}</span>
                    </div>
                    <div className="warranty-info-item">
                      <span className="warranty-info">Giờ làm việc: </span>
                      <span>{center.store.hours}</span>
                    </div>
                  </div>
                  <button
                    className="warranty-contact-btn"
                    onClick={() => handleContactClick(center.store.phone.replace(/\s/g, ''))}
                  >
                    Liên hệ
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="warranty-no-results">
              <p>Không tìm thấy trung tâm bảo hành phù hợp</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Warranty;
