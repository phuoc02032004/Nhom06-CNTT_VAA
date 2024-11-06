import React from 'react';
import '../styles/PaymentMethods.css';
import { Link } from 'react-router-dom';

const PaymentMethods = () => {
    return (
        <div className="payment-methods">
            <div className="sidebar">
                <ul>
                    <Link to="/" className="home"><h1>Trang Chủ/Hình Thức Thanh Toán</h1></Link>
                    <li><a href="/huong-dan-do-size">Hướng dẫn đo size</a></li>
                    <li><a href="/bao-hanh-bao-quan">Bảo hành & bảo quản</a></li>
                    <li><a href="/giao-hang-doi-hang">Giao hàng & đổi hàng</a></li>
                    <li><a href="/hinh-thuc-thanh-toan">Hình thức thanh toán</a></li>
                    <li><a href="/dieu-kien-vip">Điều kiện VIP</a></li>
                </ul>
            </div>

            <div className="content">
                <h1 className="bold">Hình Thức Thanh Toán</h1>
                <p>Bạn có thể thanh toán với KaT Jewelry qua các phương thức sau:</p>

                <ol className='dot-list'>
                    <li>
                        <strong>1. Chuyển Khoản Ngân Hàng:</strong>
                        Ngân hàng Vietcombank. <br />
                        Chi nhánh: Phú Thọ (HCM). <br />
                        Chủ Tài Khoản: Đỗ Hà Minh Phương. <br />
                        Số Tài Khoản: 0421000433759.
                    </li>
                    <li>
                        <strong>2. Thanh Toán Trực Tiếp Tại Quầy:</strong>
                        Khách hàng có thể thanh toán trực tiếp tại quầy khi đến mua hàng.
                    </li>
                    <li>
                        <strong>3. Thanh Toán Qua Dịch Vụ COD:</strong>
                        Thanh toán qua dịch vụ COD của đối tác giao hàng. Khi nhân viên giao hàng tới, bạn thanh toán tiền và nhận sản phẩm.
                    </li>
                </ol>

                <p className='dotted-text'>
                    Ghi chú: COD là phương thức thu tiền hộ được cung cấp bởi đối tác giao hàng. Khu vực hỗ trợ COD hoàn toàn phụ thuộc vào đối tác giao hàng.
                </p>
            </div>
        </div>
    );
};

export default PaymentMethods;
