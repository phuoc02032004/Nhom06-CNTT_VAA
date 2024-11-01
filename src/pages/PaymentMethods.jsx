import React from 'react';

const PaymentMethods = () => {
    return (
        <div className="payment-methods">
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
                <h1>Hình Thức Thanh Toán</h1>
                <p>Bạn có thể thanh toán với KaT Jewelry qua các phương thức sau:</p>

                <section className="payment-options">
                    <h2>1. Chuyển Khoản Ngân Hàng</h2>
                    <p>
                        Ngân hàng Vietcombank:
                    </p>
                    <p>
                        Chi nhánh: Phú Thọ (HCM) <br />
                        Chủ Tài Khoản: Đỗ Hà Minh Phương <br />
                        Số Tài Khoản: 0421000433759
                    </p>

                    <h2>2. Thanh Toán Trực Tiếp Tại Quầy</h2>
                    <p>
                        Khách hàng có thể thanh toán trực tiếp tại quầy khi đến mua hàng.
                    </p>

                    <h2>3. Thanh Toán Qua Dịch Vụ COD</h2>
                    <p>
                        Thanh toán qua dịch vụ COD của đối tác giao hàng. Khi nhân viên giao hàng tới, bạn thanh toán tiền và nhận sản phẩm.
                    </p>
                    <p>
                        <strong>Ghi chú:</strong> COD là phương thức thu tiền hộ được cung cấp bởi đối tác giao hàng. Khu vực hỗ trợ COD hoàn toàn phụ thuộc vào đối tác giao hàng.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PaymentMethods;
