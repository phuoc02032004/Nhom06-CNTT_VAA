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
      render: (price) => <span>{price.toFixed(2)} vnđ</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description,
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
          <button
            onClick={() => showEditProductModal(product)}
            className="hover:text-primary"
          >
            <svg
              className="h-5 w-4 text-white-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className="hover:text-primary"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>

      <div className="container mx-auto ">
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
                    {
                      required: true,
                      message: 'Please enter product description',
                    },
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
                    {
                      required: true,
                      message: 'Please enter product material',
                    },
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
                  <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    multiple
                  >
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
    </>
  );
};

export default Productt;
