import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Dropdown, Menu, Typography, Row, Col, Drawer, Form, Select, Avatar, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined, EllipsisOutlined, UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, ArrowUpOutlined, ArrowDownOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// Дані для карток метрик
const customerMetricCards = [
    { title: 'Total Customers', value: '850', icon: <UserOutlined />, progress: '+4.2%', trend: 'up' },
    { title: 'New Customers', value: '55', icon: <PlusOutlined />, progress: '+1.1%', trend: 'up' },
    { title: 'Returning Customers', value: '620', icon: <ArrowUpOutlined />, progress: '+2.8%', trend: 'up' },
    { title: 'Total Visitors', value: '18.5k', icon: <EnvironmentOutlined />, progress: '-0.5%', trend: 'down' },
];

const MetricCard = ({ title, value, icon, progress, trend }) => {
    const isUp = trend === 'up';
    return (
        <Card bordered={false} className="rounded-xl shadow-md !bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <Text type="secondary" className="block text-sm">{title}</Text>
                    <Title level={3} className="!mt-1 !mb-2 !text-black">{value}</Title>
                </div>
                <div className={`p-3 rounded-full text-white ${isUp ? 'bg-[#2c6e49]' : 'bg-red-500'}`}>
                    {icon}
                </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
                <Tag 
                    icon={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />} 
                    color={isUp ? 'success' : 'error'}
                    className="!mr-2"
                >
                    {progress}
                </Tag>
                <Text type="secondary">за останній місяць</Text>
            </div>
        </Card>
    );
};

// ==========================================
// Компонент: AddCustomerModal (Модальне вікно для додавання клієнта)
// ==========================================
const AddCustomerModal = ({ isVisible, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Customer Added:', values);
        onClose();
    };

    return (
        <Drawer
            title="Add New Customer"
            placement="right"
            onClose={onClose}
            visible={isVisible}
            width={400}
            className="!bg-gray-50"
            footer={
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={() => form.submit()}>
                        Save Customer
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ status: 'Active' }}
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input the full name!' }]}
                >
                    <Input placeholder="John Doe" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input placeholder="john.doe@example.com" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                >
                    <Input placeholder="+380 50 123 4567" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                >
                    <Input.TextArea rows={2} placeholder="123 Main St, Kyiv" />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                >
                    <Select>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                        <Option value="Blocked">Blocked</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};


// ==========================================
// Компонент: CustomerDetailsDrawer (Бічна панель з деталями)
// ==========================================
const CustomerDetailsDrawer = ({ customer, onClose }) => {
    if (!customer) return null;

    // Функція для генерації ініціалів
    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <Drawer
            title="Customer Details"
            placement="right"
            onClose={onClose}
            visible={!!customer}
            width={400}
            closable={false}
            className="!bg-gray-50"
            extra={<Button icon={<CloseOutlined />} onClick={onClose} type="text" />}
        >
            <Card className="rounded-xl shadow-lg mb-4 text-center">
                <Avatar size={80} style={{ backgroundColor: '#2c6e49', marginBottom: 16 }}>
                    <span style={{ fontSize: '32px' }}>{getInitials(customer.name)}</span>
                </Avatar>
                <Title level={3} className="!mt-2 !mb-1">{customer.name}</Title>
                <Text type="secondary" className="block">{customer.email}</Text>
                <Tag color="green" className="mt-3 rounded-full">{customer.status}</Tag>
            </Card>

            <Card title="Contact Information" className="rounded-xl shadow-lg mb-4">
                <Descriptions column={1} layout="vertical" size="small">
                    <Descriptions.Item label="Phone"><PhoneOutlined className="mr-2 text-gray-400" />{customer.phone}</Descriptions.Item>
                    <Descriptions.Item label="Address"><EnvironmentOutlined className="mr-2 text-gray-400" />{customer.address}</Descriptions.Item>
                    <Descriptions.Item label="Registration Date">{customer.registrationDate}</Descriptions.Item>
                </Descriptions>
            </Card>
            
            <Card title="Statistics" className="rounded-xl shadow-lg">
                <Descriptions column={2} size="small">
                    <Descriptions.Item label="Total Orders">{customer.orders}</Descriptions.Item>
                    <Descriptions.Item label="Total Spent">{customer.spent}</Descriptions.Item>
                </Descriptions>
            </Card>
            
            <Space className="mt-4 w-full justify-center">
                <Button type="primary">Edit Profile</Button>
                <Button danger>Delete Customer</Button>
            </Space>
        </Drawer>
    );
};

// Тестові дані для таблиці
const data = [
    { key: '1', name: 'Юлія Шевчук', email: 'yulia.s@example.com', phone: '+380501234567', orders: 15, spent: '$560.50', status: 'Active', registrationDate: '2024-01-10', address: 'Kyiv, UA' },
    { key: '2', name: 'Олег Іванов', email: 'oleg.i@example.com', phone: '+380679876543', orders: 2, spent: '$89.00', status: 'Inactive', registrationDate: '2024-07-20', address: 'Lviv, UA' },
    { key: '3', name: 'Ірина Мельник', email: 'iryna.m@example.com', phone: '+380931112233', orders: 40, spent: '$1,800.75', status: 'Active', registrationDate: '2023-11-05', address: 'Odesa, UA' },
    { key: '4', name: 'Петро Сміт', email: 'petro.s@example.com', phone: '+380995554433', orders: 8, spent: '$250.00', status: 'Blocked', registrationDate: '2024-03-15', address: 'Kharkiv, UA' },
];

// Колонки таблиці
const columns = (handleViewDetails) => [
    {
        title: 'Customer',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <Space>
                <Avatar style={{ backgroundColor: '#2c6e49' }}>
                    <span style={{ fontSize: '12px' }}>{record.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                </Avatar>
                <div>
                    <Text strong className="block">{text}</Text>
                    <Text type="secondary">{record.email}</Text>
                </div>
            </Space>
        ),
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { title: 'Orders', dataIndex: 'orders', key: 'orders', sorter: (a, b) => a.orders - b.orders },
    { title: 'Total Spent', dataIndex: 'spent', key: 'spent', responsive: ['md'] },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', responsive: ['lg'] },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            let color;
            if (status === 'Active') color = 'success';
            else if (status === 'Inactive') color = 'default';
            else color = 'error';
            return <Tag color={color} className="rounded-full px-3">{status.toUpperCase()}</Tag>;
        },
    },
    {
        title: 'Action',
        key: 'action',
        width: 80,
        render: (text, record) => (
            <Dropdown overlay={
                <Menu items={[
                    { key: 'view', label: 'View Details', onClick: () => handleViewDetails(record) },
                    { key: 'edit', label: 'Edit Customer' },
                    { key: 'delete', label: 'Delete', danger: true },
                ]} />
            } trigger={['click']}>
                <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
        ),
    },
];


export default function CustomersPage() {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // Для додавання клієнта
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Для деталей клієнта (Drawer)

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
    };
    
    const closeDrawer = () => {
        setSelectedCustomer(null);
    };

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Секція метрик */}
            <Row gutter={[24, 24]}>
                {customerMetricCards.map((card, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <MetricCard {...card} />
                    </Col>
                ))}
            </Row>

            {/* Секція Customer List */}
            <Card 
                title={
                    <Title level={4} className="!mb-0 !text-black">Customer List</Title>
                }
                bordered={false}
                className="rounded-xl shadow-lg !bg-white"
                bodyStyle={{ padding: 0 }}
            >
                {/* Хедер та екшн-кнопки */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <Input 
                        placeholder="Search customers..." 
                        prefix={<SearchOutlined className="text-gray-400" />} 
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 250 }}
                        className="rounded-lg shadow-sm"
                    />
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        className="rounded-lg shadow-md bg-[#2c6e49] hover:bg-[#1e583d]"
                        onClick={showModal}
                    >
                        Add Customer
                    </Button>
                </div>
                
                {/* Таблиця */}
                <div className="p-4">
                    <Table 
                        columns={columns(handleViewDetails)} // Передаємо функцію в колонки
                        dataSource={filteredData} 
                        pagination={{ pageSize: 10 }} 
                        scroll={{ x: 'max-content' }}
                        className="w-full"
                    />
                </div>
            </Card>

            {/* Модальні вікна */}
            <AddCustomerModal isVisible={isModalVisible} onClose={handleCancel} />
            <CustomerDetailsDrawer customer={selectedCustomer} onClose={closeDrawer} />
        </div>
    );
}
