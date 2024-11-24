import axios from "axios";
import { getProductId } from "./product";

const getAllOrder = async () => {
    try {
        const response = await axios.get('http://localhost:3003/api/v1/orders');
        console.log(response.data);

        const ordersWithProductNames = await Promise.all(
            response.data.map(async (order) => {
                // Lấy thông tin từng sản phẩm trong order.products
                const productsWithNames = await Promise.all(
                    order.products.map(async (product) => {
                        const productData = await getProductId(product.product);
                        return {
                            ...product,
                            name: productData.name,
                        };
                    })
                );

                return {
                    id: order._id,
                    user: order.user,
                    total: order.total,
                    status: order.status,
                    shippingAddress: order.shippingAddress,
                    paymentMethod: order.paymentMethod,
                    products: productsWithNames,
                };
            })
        );
        return ordersWithProductNames;
    } catch (error) {
        console.error('Error fetching category: ', error);
        throw error;
    }
};


const updateOrder = async (id, status) => {
    try {
        const response = await axios.put(`http://localhost:3003/api/v1/orders/${id}`, {
            status: status,
        });
        if (response.status === 200) {
            console.log('Order updated successfully:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3003/api/v1/categories/${id}`);
        console.log('Category Deleted:', response.data);
    } catch (error) {
        console.error('Error deleting Category:', error.response ? error.response.data : error.message);
    }
}

export { getAllOrder, updateOrder, deleteCategory };