import { Link } from "react-router-dom";
import "./ProductCard.scss";

export default function ProductCard({ item, onAdd, onBuy }) {
  return (
    <div className="card">
      {item.tag && <span className="tag">{item.tag}</span>}

      <Link
        to={`/product/${item.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card-image">
          <img
            src={
              new URL(`../../assets/images/${item.image.img0}`, import.meta.url)
                .href
            }
            alt={item.name}
          />
        </div>

        <div className="card-content">
          <h3>{item.name}</h3>

          <div className="price-section">
            <span className="price">
              {Number(item.price).toLocaleString()}đ
            </span>

            {item.old_price && (
              <span className="old-price">
                {Number(item.old_price).toLocaleString()}đ
              </span>
            )}
          </div>

          <div className="card-actions">
            <button
              className="btn-add">
              Thêm vào giỏ
            </button>

            <button
              className="btn-buy">
              Mua
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
