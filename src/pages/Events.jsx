// src/pages/Events.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Events.css';
// Import hình ảnh
import sukiImage from '../assets/suki.jpg';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "YEAR END SALE PARTY - 2018",
      // Sử dụng biến đã import
      image: sukiImage,
      date: "23/11/2024",
      author: "Hữu Phước",
      comments: 0,
      description: "YEAR END SALE PARTY - 2018 SỰ KIỆN SALE TRANG SỨC BẠC LỚN TRONG NĂM ĐANG DIỄN RA TẠI 5 CỬA HÀNG CỦA KAT JEWELRY TRÊN TOÀN QUỐC SALE UP TO 40% toàn bộ sản phẩm khi mua tại cửa hàng và online...",
      slug: "year-end-sale-party-2018"
    }
  ];

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link to="/">TRANG CHỦ</Link> / SỰ KIỆN
      </div>

      <h1 className="page-title">Sự kiện</h1>
      
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-item">
            <img 
              src={event.image} 
              alt={event.title} 
              className="event-image"
            />
            
            <div className="event-date">{event.date}</div>
            
            <h2 className="event-title">
              <Link to={`/su-kien/${event.slug}`}>{event.title}</Link>
            </h2>
            
            <div className="event-meta">
              Viết bởi {event.author} / {event.comments} bình luận
            </div>
            
            <div className="event-description">
              {event.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;