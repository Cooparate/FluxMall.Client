import { useState } from 'react';
import './Contact.scss';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);

    // Bạn có thể gửi dữ liệu tới API ở đây
    console.log('Form data:', formData);
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Thông tin liên hệ</h1>
        <p>Chúng tôi vinh hạnh vì đã có cơ hội làm việc với hơn 10.000 khách hàng trên khắp thế giới.</p>
      </div>

      {/* Info Cards Section */}
      <div className="contact-info-cards">
        <div className="info-card">
          <div className="info-icon">
            <MdLocationOn />
          </div>
          <h3>Địa chỉ</h3>
          <p>266 Đội Cấn, Ba Đình, Hà Nội</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <MdEmail />
          </div>
          <h3>Email</h3>
          <p>support@fluxmall.vn</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <MdPhone />
          </div>
          <h3>Hotline</h3>
          <p>1900 6750</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="contact-content">
        {/* Map Section */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20713.99003316092!2d106.34905546462645!3d10.37647936566056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1766808947160!5m2!1svi!2s"
            width="100%"
            height="500"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vị trí cửa hàng FluxMall"
          ></iframe>
        </div>

        {/* Form Section */}
        <div className="contact-form-wrapper">
          <h2>Liên hệ với chúng tôi</h2>
          
          {submitted && (
            <div className="success-message">
              Cảm ơn bạn! Chúng tôi sẽ phản hồi trong sớm nhất.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Nhập nội dung tin nhắn"
                  value={formData.message}
                  onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn-submit">
              Gửi thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
