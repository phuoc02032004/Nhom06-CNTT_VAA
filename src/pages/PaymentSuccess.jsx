import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Lấy thông tin từ query string
  const transactionId = queryParams.get("vnp_TxnRef");
  const transactionNo = queryParams.get("vnp_TransactionNo");
  const amount = queryParams.get("vnp_Amount");
  const responseCode = queryParams.get("vnp_ResponseCode");
  const bankCode = queryParams.get("vnp_BankCode");
  const bankTranNo = queryParams.get("vnp_BankTranNo");
  const cardType = queryParams.get("vnp_CardType");
  const orderInfo = queryParams.get("vnp_OrderInfo");
  const payDate = queryParams.get("vnp_PayDate");
  const tmnCode = queryParams.get("vnp_TmnCode");

  // Kiểm tra kết quả giao dịch
  const isSuccess = responseCode === "00";

  // Định dạng số tiền
  const formattedAmount = amount ? (amount / 100).toLocaleString("vi-VN") : "0 ₫";

  // Định dạng ngày thanh toán
  const formattedPayDate = payDate
    ? `${payDate.slice(6, 8)}/${payDate.slice(4, 6)}/${payDate.slice(0, 4)} ${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`
    : "Không xác định";

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className={`text-3xl font-bold text-center mb-6 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
        {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
      </h1>

      <div className="text-center text-lg mb-8">
        {isSuccess ? (
          <p>Giao dịch của bạn đã được thực hiện thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        ) : (
          <p>Rất tiếc, giao dịch không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        )}
      </div>

      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết giao dịch:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Mã giao dịch:</p>
            <p className="text-gray-700">{transactionId || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Số giao dịch tại ngân hàng:</p>
            <p className="text-gray-700">{transactionNo || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Số tiền:</p>
            <p className="text-gray-700">{formattedAmount}</p>
          </div>
          <div>
            <p className="font-medium">Ngân hàng:</p>
            <p className="text-gray-700">{bankCode || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Số giao dịch ngân hàng:</p>
            <p className="text-gray-700">{bankTranNo || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Loại thẻ:</p>
            <p className="text-gray-700">{cardType || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Thông tin đơn hàng:</p>
            <p className="text-gray-700">{orderInfo || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Ngày thanh toán:</p>
            <p className="text-gray-700">{formattedPayDate}</p>
          </div>
          <div>
            <p className="font-medium">Mã cửa hàng:</p>
            <p className="text-gray-700">{tmnCode || "Không xác định"}</p>
          </div>
          <div>
            <p className="font-medium">Trạng thái giao dịch:</p>
            <p className={`font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
              {isSuccess ? "Thành công" : "Thất bại"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
