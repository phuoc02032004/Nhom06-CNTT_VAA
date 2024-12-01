import React from "react";
import { Link } from "react-router-dom";
import "../styles/News.css";
import news1 from "../assets/news1.jpg";
import news2 from "../assets/news2.jpg";
import news3 from "../assets/news3.jpg";
import news4 from "../assets/news4.jpg";
import PathName from "../components/UI/path";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Mẹo bảo quản trang sức bạc",
      date: "20/03/2024",
      image: news1,
      description: "Hướng dẫn chi tiết cách bảo quản trang sức bạc...",
    },
    {
      id: 2,
      title: "Xu hướng trang sức 2024",
      date: "19/03/2024",
      image: news2,
      description: "Khám phá những xu hướng trang sức mới nhất...",
    },
    {
      id: 3,
      title: "Dị ứng bạc từ đâu, nguyên nhân thực sự có phải do bạc?",
      date: "19/03/2024",
      image: news3,
      description:
        "Những nhầm lẫn về bạc làm bạn bị dị ứng ? hoặc đeo bạc bị ngứa ? . Bài viết đã giải thích rõ được những thắc mắc về bạc 925 và tại sao bạn bị dị ứng !!! Hãy nhấp vào đây để đọc thêm những kiến thức về bạc nhaaaa",
    },
    {
      id: 4,
      title: "Bạc 925 là gì ?",
      date: "19/03/2024",
      image: news4,
      description:
        "Bài viết này dành cho bạn nào chưa hiểu rõ về bạc 925 là như thế nào nè .Click chuột để đọc cùng KaT nha <3",
    },
  ];

  return (
    <div className="news-container">
      <div>
        <PathName
          paths={[
            { label: "Trang chủ", onClick: (navigate) => navigate("/") },

            { label: "Tin Tức", active: true },
          ]}
        />
      </div>

      <h1>Tin tức</h1>

      <div className="news-grid">
        {newsItems.map((news) => (
          <div key={news.id} className="news-card">
            <div className="news-image">
              <img src={news.image} alt={news.title} />
            </div>
            <div className="news-content">
              <h3>{news.title}</h3>
              <div className="news-date">{news.date}</div>
              <p>{news.description}</p>
              <Link to={`/news/${news.id}`} className="read-more">
                Đọc thêm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
