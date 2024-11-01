import React from 'react';

const DeliveryAndReturns = () => {
    return (
        <div className="delivery-and-returns">
            <h1>Giao Hàng và Đổi Hàng</h1>

            {/* Đặt Hàng */}
            <section className="order-methods">
                <h2>Đặt Hàng</h2>
                <p>KaT Jewelry hỗ trợ các phương thức đặt hàng như sau:</p>
                <ul>
                    <li>Inbox trực tiếp vào messenger của page: <a href="https://m.me/katjewelry" target="_blank" rel="noopener noreferrer">m.me/katjewelry</a></li>
                    <li>Comment chọn hàng trên <a href="https://www.facebook.com/pg/katjewelry/photos" target="_blank" rel="noopener noreferrer">album Facebook</a></li>
                    <li>Direct trên <a href="https://www.instagram.com/katjewelry/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li>Comment chọn hàng trên Instagram: <a href="https://www.instagram.com/katjewelry/" target="_blank" rel="noopener noreferrer">KaT Jewelry</a></li>
                    <li>Gọi điện thoại trực tiếp vào số: +84896162868</li>
                    <li>Chọn hàng, thêm vào giỏ hàng và thanh toán trên website này.</li>
                </ul>
                <p><strong>Cú pháp đặt hàng:</strong></p>
                <ul>
                    <li>Mô tả sản phẩm bằng hình ảnh, tên hoặc mã hàng. Đối với hàng đặt riêng cần thảo luận chi tiết với KaT Jewelry.</li>
                    <li>Họ tên thật (tránh dùng nickname), địa chỉ và số điện thoại người nhận.</li>
                    <li>Chọn cách thức giao hàng (thông tin chi tiết trong phần “Giao hàng” bên dưới).</li>
                    <li>Lưu ý: Đặt hàng không đồng nghĩa với mua sản phẩm có sẵn tại cửa hàng.</li>
                </ul>
            </section>

            {/* Chính Sách Giao Hàng */}
            <section className="shipping-policy">
                <h2>Giao Hàng và Các Khoản Phí</h2>
                <p>Ghi chú: COD là dịch vụ giao hàng thu tiền hộ của bên đối tác thứ 3. Vùng hỗ trợ COD và bảng giá ship được quy định bởi đối tác thứ 3.</p>
                <h3>Hình thức giao hàng:</h3>
                <ul>
                    <li><strong>Giao hàng tại cửa hàng:</strong> Khách đến trực tiếp để nhận hàng và cần đặt cọc ít nhất 50% giá trị sản phẩm.</li>
                    <li><strong>Giao hàng qua dịch vụ chuyển phát nhanh:</strong></li>
                    <li><strong>Giao hàng không hỗ trợ COD:</strong> Với vùng chưa hỗ trợ COD, khách hàng phải thanh toán trước toàn bộ sản phẩm và phí giao hàng.</li>
                    <li><strong>Giao hàng có hỗ trợ COD:</strong> Với vùng hỗ trợ COD, khách thanh toán trực tiếp cho nhân viên giao hàng.</li>
                </ul>
                <h3>Thời gian giao hàng ước tính:</h3>
                <ul>
                    <li>Nội thành: 1-3 ngày.</li>
                    <li>Ngoại thành: 2-5 ngày.</li>
                    <li>Nước ngoài: 7-28 ngày.</li>
                </ul>
                <p>KaT Jewelry sẽ tư vấn phương án giao hàng phù hợp nhất dựa trên yêu cầu của khách. KaT Jewelry có quyền hủy đơn nếu không tìm được phương án hợp lý.</p>
            </section>

            {/* Chính Sách Đổi Hàng */}
            <section className="returns-policy">
                <h2>Đổi Hàng</h2>
                <p>✯ Tất cả các sản phẩm đã mua không được hoàn trả bằng tiền mặt.</p>
                <p>✯ Sản phẩm có thể đổi trong vòng 3 ngày (kèm hóa đơn), với sản phẩm có giá trị tương đương hoặc lớn hơn.</p>
                <p>✯ Thời gian đổi hàng: 15:30 - 21:00 vào các ngày cửa hàng mở cửa.</p>
                <h3>Trường hợp không nhận đổi trả:</h3>
                <ul>
                    <li>Sản phẩm đã mua quá 3 ngày. Nếu không vừa size, KaT Jewelry sẽ thu phí chỉnh sửa.</li>
                    <li>Sản phẩm bị hư hỏng, đứt gãy, không đúng nguyên trạng ban đầu.</li>
                    <li>Sản phẩm đặt riêng hoặc kích thước ngoài chuẩn của KaT Jewelry.</li>
                </ul>
                <h3>Quy định đặt cọc:</h3>
                <ul>
                    <li>Nếu khách hàng hủy đơn, số tiền cọc sẽ không được hoàn trả.</li>
                    <li>Nếu KaT Jewelry hủy đơn, khách sẽ được hoàn lại toàn bộ số tiền đã cọc.</li>
                </ul>
                <p>KaT Jewelry có quyền từ chối đổi trả nếu sản phẩm không thỏa mãn các yêu cầu trên.</p>
            </section>
        </div>
    );
};

export default DeliveryAndReturns;
