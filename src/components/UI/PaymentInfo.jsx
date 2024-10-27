import React from "react";

const PaymentInfo = () => (
  <div>
    <h3 className="text-xl font-bold mb-2">Phương thức thanh toán</h3>
    <div className="space-y-2">
      <label className="block">
        <input type="radio" name="payment" className="mr-2" />
        Thanh toán tiền mặt khi nhận hàng (COD)
      </label>
      <label className="block">
        <input type="radio" name="payment" className="mr-2" />
        Thanh toán thẻ ATM
      </label>
      <label className="block">
        <input type="radio" name="payment" className="mr-2" />
        Thanh toán bằng ví MoMo
      </label>
    </div>
  </div>
);

export default PaymentInfo;
