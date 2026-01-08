import "./Student.scss";
import { RiCouponLine, FiPercent, FiGift } from "../../components/icons";
import { danhChoSinhVien } from "../../assets";

const studentDeals = [
  {
    id: 1,
    title: "Giảm 15% dành cho Sinh viên",
    description: "Áp dụng cho tất cả laptop và phụ kiện",
    discount: "15%",
    condition: "Xuất trình thẻ sinh viên còn hiệu lực",
    validUntil: "31/12/2025",
    code: "STUDENT15",
    icon: "percent",
  },
  {
    id: 2,
    title: "Combo Sinh viên",
    description: "Laptop + Chuột + Balo chỉ từ 12.990.000đ",
    discount: "Giảm 2 triệu đồng",
    condition: "Khi mua combo đầy đủ",
    validUntil: "30/06/2026",
    code: "COMBOSTU",
    icon: "gift",
  },
  {
    id: 3,
    title: "Trả góp 0%",
    description: "Không lãi suất, không phí",
    discount: "0% Lãi suất",
    condition: "Thẻ tín dụng hoặc thẻ ATM",
    validUntil: "31/12/2025",
    code: "TRAGOP0",
    icon: "coupon",
  },
  {
    id: 4,
    title: "Tặng Office 365",
    description: "Miễn phí 1 năm Office 365 Education",
    discount: "Miễn phí",
    condition: "Đơn hàng từ 10 triệu",
    validUntil: "31/12/2025",
    code: "OFFICE365",
    icon: "gift",
  },
];

const getIcon = (iconType) => {
  switch (iconType) {
    case "percent":
      return <FiPercent className="deal-icon" />;
    case "gift":
      return <FiGift className="deal-icon" />;
    case "coupon":
      return <RiCouponLine className="deal-icon" />;
    default:
      return <FiPercent className="deal-icon" />;
  }
};

export default function Student() {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  return (
    <div className="student-page">
      <div className="student-banner">
        <div className="banner-content">
          <img src={danhChoSinhVien} alt="image" />
        </div>
      </div>

      <div className="student-container">
        <div className="info-box">
          <p>
            Xuất trình thẻ sinh viên còn hiệu lực khi nhận hàng hoặc gửi ảnh xác
            nhận <br />
            Sao chép mã và áp dụng khi thanh toán
          </p>
        </div>

        <div className="deals-section">
          <div className="deals-grid">
            {studentDeals.map((deal) => (
              <div key={deal.id} className="deal-card">
                <div className="deal-left">
                  <div className="deal-icon-wrapper">{getIcon(deal.icon)}</div>

                  <div className="deal-info">
                    <div className="deal-discount">{deal.discount}</div>
                    <h3>{deal.title}</h3>
                    <p className="deal-description">{deal.description}</p>
                    <p className="deal-condition">{deal.condition}</p>
                    <p className="deal-validity">HSD: {deal.validUntil}</p>
                  </div>
                </div>

                <div className="deal-code-section">
                  <div className="deal-code">{deal.code}</div>
                  <button
                    className="btn-copy"
                    onClick={() => handleCopyCode(deal.code)}
                  >
                    Sao chép
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="terms-section">
          <h2>Lưu ý</h2>
          <div className="terms-content">
            <ul>
              <li>Mỗi đơn hàng chỉ áp dụng 1 mã giảm giá</li>
              <li>Chỉ áp dụng với thẻ sinh viên còn hiệu lực</li>
              <li>Có thể mua hộ nhưng cần xuất trình thẻ sinh viên</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
