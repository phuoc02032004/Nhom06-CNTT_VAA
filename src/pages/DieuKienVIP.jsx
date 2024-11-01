import React from 'react';

const DieuKienVIP = () => {
    return (
        <div className="dieu-kien-vip">
            <div className="sidebar">
                <h2>Điều Hướng</h2>
                <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/huong-dan-do-size">Hướng dẫn đo size</a></li>
                    <li><a href="/bao-hanh-bao-quan">Bảo hành & bảo quản</a></li>
                    <li><a href="/giao-hang-doi-hang">Giao hàng & đổi hàng</a></li>
                    <li><a href="/hinh-thuc-thanh-toan">Hình thức thanh toán</a></li>
                    <li><a href="/dieu-kien-vip">Điều kiện VIP</a></li>
                </ul>
            </div>

            <div className="content">
                <h1>Điều Kiện VIP</h1>

                {/* Điều kiện áp dụng */}
                <section className="conditions">
                    <h2>1. Điều Kiện Áp Dụng</h2>
                    
                    <h3>1.1. Điều kiện tham gia và thời hạn</h3>
                    <p>
                        Chỉ áp dụng khi mua sản phẩm có sẵn tại cửa hàng. Không áp dụng với sản phẩm đặt làm riêng, không áp dụng tích lũy đối với sản phẩm giảm giá.
                    </p>
                    <ul>
                        <li><strong>Level 1:</strong> Tổng chi tiêu của khách hàng trong năm đạt 4,000,000 VNĐ sẽ trở thành khách hàng VIP của KaT có giá trị 1 năm từ ngày đạt đủ mức chi tiêu (level 1).</li>
                        <li><strong>Level 2:</strong> Các khách hàng đang là VIP có tổng chi tiêu trong năm trên 8,000,000 VNĐ sẽ trở thành khách hàng VVIP của KaT, có giá trị 1 năm từ ngày đạt đủ mức chi tiêu (level 2). Khi hết thời gian này thì khách sẽ không còn nhận được ưu đãi.</li>
                        <li><strong>Level 3 trở lên:</strong> Sau khi đã đạt mức VVIP, với mỗi mức chi tiêu tiếp theo đạt 4,000,000 VNĐ, quý khách sẽ được gia hạn tiếp thời gian VVIP thêm 1 năm kể từ ngày đủ mức chi tiêu gần nhất. Khi hết thời gian này thì khách sẽ không còn nhận được ưu đãi.</li>
                    </ul>

                    <h3>1.2. Điều kiện áp dụng</h3>
                    <ul>
                        <li>Khách hàng đang là VIP hoặc VVIP của KaT.</li>
                        <li>Giá trị thanh toán sau khi giảm sẽ được làm tròn theo hàng chục ngàn.</li>
                        <li>Không áp dụng đối với các đơn hàng online.</li>
                        <li>Không áp dụng chung với các chương trình khuyến mãi khác.</li>
                    </ul>

                    <h3>1.3. Quyền lợi</h3>
                    <ul>
                        <li>Giảm 5% cho tổng hóa đơn đối với khách hàng VIP.</li>
                        <li>Giảm 10% cho tổng hóa đơn đối với khách hàng VVIP.</li>
                        <li>Được tham gia nhiều chương trình ưu đãi đặc biệt dành cho khách VIP/VVIP.</li>
                    </ul>
                </section>

                {/* Điều khoản VIP/VVIP */}
                <section className="terms">
                    <h2>2. Điều Khoản VIP/VVIP</h2>
                    <p>
                        KaT có quyền thay đổi quy định, quyền lợi thẻ VIP/VVIP và hình thức ưu đãi mà không cần thông báo trước với khách hàng.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default DieuKienVIP;
