import { Link } from "react-router-dom";
import "./ProductCard.scss";

export default function ProductCard({ item, onAdd, onBuy }) {
  return (
    <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card" style={{ width: 250 }}>
        {item.tag && <span className="tag">{item.tag}</span>}

        <div className="card-image">
          <img
          src={`/src/assets/images/${item.image.img0}`}
          alt={item.name}/>
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

        {/* <p style={{ color: "gray", fontSize: 13 }}>
          {item.tag}
        </p> */}

        <div className="card-actions">
          <button
            className="btn-add"
            // onClick={() => onAdd?.(item)}
          >
            Thêm vào giỏ
          </button>

          <button
            className="btn-buy"
            // onClick={() => onBuy?.(item)}
          >
            Mua
          </button>
        </div>
      </div>

</div>
    </Link>
  );
}
