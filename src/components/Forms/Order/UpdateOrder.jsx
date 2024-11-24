import { useState } from 'react';
import { updateOrder } from '../../../services/order';

const FormUpdateOrder = ({ id, onOrderUpdate }) => {
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [stock, setStock] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(id, { status });
            onOrderUpdate();
        } catch (error) {
            alert('Failed to update Order');
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Update Order
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Status
                            </label>
                            <Select placeholder="Select a status">
                                <Option value="Paid">Paid</Option>
                                <Option value="Unpaid">Unpaid</Option>
                                <Option></Option>
                            </Select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        UPDATE
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormUpdateProduct;
