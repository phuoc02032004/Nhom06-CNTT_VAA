import React, { useState, useEffect } from 'react';
import { getAllProducts, updateProduct, deleteProduct } from '../../services/product';
import FormUpdateProduct from '../Forms/Product/UpdateProduct';

const TableProduct = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    const handleButtonClick = (id) => {
        setCurrentProductId(id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setCurrentProductId(null);
    };

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const handleProductUpdate = () => {
        fetchProducts();
        closeForm();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                ID
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Product Name
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Category
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Price
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    {product.id}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    {product.name}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {product.category}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {product.price}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleButtonClick(product.id)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product.id)}>
                                            Delete
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
                        <FormUpdateProduct id={currentProductId} onProductUpdate={handleProductUpdate} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableProduct;
