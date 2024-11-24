import { getAllOrder } from '../../services/order';
import React, { useState, useEffect } from 'react';
import FormOrderItem from '../Forms/Order/OrderItems';

const TableOrder = () => {
    const [orders, setOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentOrderProducts, setCurrentOrderProducts] = useState([]);

    const handleButtonClick = (id) => {
        // setCurrentOrderId(id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setCurrentOrderProducts([]);
    };

    const fetchOrders = async () => {
        try {
            const data = await getAllOrder();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSeeDetail = (orderId) => {
        const order = orders.find((order) => order.id === orderId);
        if (order) {
            setCurrentOrderProducts(order.products);
            setShowForm(true);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                ID
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                User
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Total
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Shipping Address
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Payment Method
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((packageItem, key) => (
                            <tr key={key}>

                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {packageItem.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.user}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.total}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === 'Paid'
                                            ? 'bg-success text-success'
                                            : packageItem.status === 'Unpaid'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                    >
                                        {packageItem.status}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.shippingAddress}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem.paymentMethod}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary" onClick={() => handleSeeDetail(packageItem.id)}>
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative p-6 rounded-md w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <button onClick={closeForm} className="absolute top-2 right-2">X</button>
                        <FormOrderItem
                            products={currentOrderProducts}
                            onClose={closeForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableOrder;
