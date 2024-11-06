import React from 'react';
import Nhan from '../assets/ringsize1.webp';
import Aonh from '../assets/edited-download-1.webp';
import Aonhh from '../assets/edited-download-copy.webp';
import pricetable from '../assets/sod-necklace-size-02-1024x1024-3f92e076-0f03-4a1a-a0d9-cb4bea02df16.webp';
import '../styles/MeasureSize.css'; // Thêm đường dẫn tới CSS nếu cần
import { Link } from 'react-router-dom'; // Thêm import Link

const MeasureSize = () => {
  return (
    <div className="measure-size">
      <div className="sidebar">
        <ul>
          <Link to="/" className="home"><h1>Trang Chủ/Cách Đo Kích Cỡ</h1></Link>
          <li><a href="/huong-dan-do-size">Hướng dẫn đo size</a></li>
          <li><a href="/bao-hanh-bao-quan">Bảo hành & bảo quản</a></li>
          <li><a href="/giao-hang-doi-hang">Giao hàng & đổi hàng</a></li>
          <li><a href="/hinh-thuc-thanh-toan">Hình thức thanh toán</a></li>
          <li><a href="/dieu-kien-vip">Điều kiện VIP</a></li>
        </ul>
      </div>

      <div className="content">
        <h1 className="bold">Cách đo kích cỡ tay đeo trang sức - KaT Jewelry bạc 925 silver</h1>
        <p>
          Chắc rằng các bạn đã nhiều lần gặp khó khăn khi nhẫn và vòng tay có quá nhiều cỡ với số đo đa dạng, bạn không biết tay mình là số mấy mới vừa? Từ giờ bạn không phải băng khoăn nữa, vì KaT Jewelry sẽ mách bạn những cách đo nhẫn cực kỳ dễ và hiệu quả nhé.
        </p>
        
        <h2 className="bold">Có hai cách rất đơn giản để biết được size nhẫn và vòng của bạn.</h2>

        <h3 className="bold">Cách thứ nhất: Nếu bạn có sẵn chiếc nhẫn hoặc vòng tay</h3>
        <p>Bước 1: Dùng thước đặt ngang ở giữa nhẫn của bạn để đo đường kính, nhớ đo khoảng cách lòng bên trong của nhẫn.</p>
        <p>Bước 2: Gửi KaT Jewelry số đo theo đơn vị cm nhé (centi mét).</p>
        <img src={Nhan} alt="Hình minh họa cách đo nhẫn" className="mt-4" />

        <h3 className="bold">Cách thứ hai:</h3>
        <p>Bước 1: Dùng một sợi chỉ, quấn quanh ngón tay/cổ tay bạn muốn đo, làm dấu lại.</p>
        <p>Bước 2: Đo chiều dài sợi chỉ, chiều dài đó là chu vi của ngón tay/cổ tay bạn. Đối với cổ tay, các bạn nhớ trừ hao, nới lỏng ra nhé.</p>
        <p>Bước 3: Gửi số đo cho KaT Jewelry với đơn vị là cm nhé (centi mét).</p>
        <img src={Aonh} alt="Hình minh họa cách đo ngón tay" className="mt-4" />
        <img src={Aonhh} alt="Hình minh họa cách đo cổ tay" className="mt-4" />

        <h3 className="bold">BẢNG GIÁ DÂY CHUYỀN</h3>
        <p>
          Lưu ý: Các bạn nên đo khớt đốt ngón tay trước bụng ngón tay, chu vi của phần nào lớn hơn bạn sẽ lấy số chu vi đó làm size nhẫn. Vì nhẫn phải lọt qua khớp đốt ngón tay mới vào được tới bụng ngón tay được nè :D. Nếu khớp đốt ngón tay to hơn bụng ngón tay mà size nhẫn bạn chọn lại là bụng ngón tay thì nhẫn sẽ không bao giờ lọt vào trong bụng ngón tay được nhé.
        </p>
        <img src={pricetable} alt="Bảng giá dây chuyền" className="mt-4" />
      </div>
    </div>
  );
};

export default MeasureSize;
