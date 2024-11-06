import React, { useEffect, useState } from 'react';
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from '../services/product';
import { getAllCategory } from '../services/category';
import {
    Modal,
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    message,
    Table,
    Select,
    Row,
    Col,
} from 'antd';
import {
    UploadOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const Productt = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            message.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getAllCategory();
            setCategories(data);
        } catch (error) {
            message.error('Failed to fetch categories');
        }
    };

    const showAddProductModal = () => {
        setIsModalVisible(true);
        setIsEditMode(false);
        form.resetFields();
    };

    const showEditProductModal = (product) => {
        setIsModalVisible(true);
        setIsEditMode(true);
        setCurrentProduct(product);
        form.setFieldsValue({
            ...product,
            category: product.category.id, // Set category to its ID for Select component
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteProduct(id);
            message.success('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            message.error('Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        try {
            const { images, ...productData } = values;
            const imageFiles = images
                ? images.fileList.map((file) => file.originFileObj)
                : [];

            if (isEditMode) {
                await updateProduct(currentProduct._id, productData, imageFiles);
                message.success('Product updated successfully');
            } else {
                await createProduct(productData, imageFiles);
                message.success('Product created successfully');
            }
            fetchProducts();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to save product');
        } finally {
            setLoading(false);
            form.resetFields();
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="text-lg font-bold">{text}</span>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>${price.toFixed(2)}</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Decription',
            dataIndex: 'description',
            key: 'description',
            render: (description) => description,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => category,
            key: 'category',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Style',
            dataIndex: 'style',
            key: 'style',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, product) => (
                <div className="flex space-x-2">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditProductModal(product)}
                        className="border-none text-green-500"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(product._id)}
                        className="border-none"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-bold">Product Manager</h1>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddProductModal}
                className="mb-4"
            >
                Add Product
            </Button>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
                className="rounded-lg bg-white shadow-md"
            />

            <Modal
                title={isEditMode ? 'Edit Product' : 'Add Product'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    { required: true, message: 'Please enter product name' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    { required: true, message: 'Please enter product price' },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="description"
                                rules={[
                                    { required: true, message: 'Please enter product description' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="stock"
                                label="Stock"
                                rules={[
                                    { required: true, message: 'Please enter product stock' },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[
                                    { required: true, message: 'Please select a category' },
                                ]}
                            >
                                <Select placeholder="Select a category">
                                    {categories.map((category) => (
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="material"
                                label="Material"
                                rules={[
                                    { required: true, message: 'Please enter product material' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="weight" label="Weight">
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="dimensions" label="Dimensions">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="color" label="Color">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="style" label="Style">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="origin" label="Origin">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="manufacturer" label="Manufacturer">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="images" label="Images">
                                <Upload listType="picture" beforeUpload={() => false} multiple>
                                    <Button icon={<UploadOutlined />}>Upload Images</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {isEditMode ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Productt;
