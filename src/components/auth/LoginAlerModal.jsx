import { useNavigate } from "react-router-dom";
import "./LoginAlertModal.scss";

export default function LoginAlertModal({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content login-alert"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>⚠️ Yêu cầu đăng nhập</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="alert-message">
            Vui lòng <strong>đăng nhập</strong> hoặc <strong>đăng ký</strong> để
            sử dụng chức năng này!
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Để sau
          </button>
          <button className="btn-confirm" onClick={handleLogin}>
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
}
