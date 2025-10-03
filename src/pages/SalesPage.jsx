/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Dropdown, Menu, Typography, Row, Col, Progress } from 'antd';
import { SearchOutlined, EllipsisOutlined, AreaChartOutlined, DollarCircleOutlined, ShoppingOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// ==========================================
// 1. ДАНІ ДЛЯ КАРТОК МЕТРИК
// ==========================================
const salesMetricCards = [
    { title: 'Total Sales', value: '$85,400', icon: <DollarCircleOutlined />, progress: '+4.2%', trend: 'up' },
    { title: 'New Sales', value: '1,200', icon: <ShoppingOutlined />, progress: '+1.1%', trend: 'up' },
    { title: 'Gross Profit', value: '$40,100', icon: <AreaChartOutlined />, progress: '+2.8%', trend: 'up' },
    { title: 'Conversion Rate', value: '4.5%', icon: <AreaChartOutlined />, progress: '-0.5%', trend: 'down' },
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
// 2. ДАНІ ТА КОЛОНКИ ДЛЯ ТАБЛИЦІ
// ==========================================
const data = [
    { key: '1', product: 'Vegan Burger Deluxe', date: '2025-10-01', price: 15.00, sold: 120, revenue: 1800, netProfit: 720 },
    { key: '2', product: 'Spicy Chicken Wrap', date: '2025-10-01', price: 12.50, sold: 90, revenue: 1125, netProfit: 450 },
    { key: '3', product: 'Fresh Salad Bowl', date: '2025-09-30', price: 9.00, sold: 250, revenue: 2250, netProfit: 900 },
    { key: '4', product: 'Espresso Double Shot', date: '2025-09-30', price: 3.00, sold: 500, revenue: 1500, netProfit: 600 },
];

const columns = [
    { 
        title: 'Product', 
        dataIndex: 'product', 
        key: 'product', 
        sorter: (a, b) => a.product.localeCompare(b.product),
        render: (text) => <Text strong className="text-gray-800">{text}</Text>
    },
    { 
        title: 'Date', 
        dataIndex: 'date', 
        key: 'date', 
        width: 120, 
        responsive: ['md'] 
    },
    { 
        title: 'Price', 
        dataIndex: 'price', 
        key: 'price', 
        width: 100,
        render: (price) => `$${price.toFixed(2)}`
    },
    { 
        title: 'Sold', 
        dataIndex: 'sold', 
        key: 'sold', 
        width: 80, 
        responsive: ['md'],
        sorter: (a, b) => a.sold - b.sold
    },
    { 
        title: 'Revenue', 
        dataIndex: 'revenue', 
        key: 'revenue', 
        width: 100, 
        sorter: (a, b) => a.revenue - b.revenue,
        render: (revenue) => <Text className="text-green-600 font-semibold">${revenue.toLocaleString()}</Text>
    },
    { 
        title: 'Net Profit', 
        dataIndex: 'netProfit', 
        key: 'netProfit', 
        width: 100, 
        responsive: ['lg'],
        sorter: (a, b) => a.netProfit - b.netProfit,
        render: (profit) => <Text className="text-blue-600 font-semibold">${profit.toLocaleString()}</Text>
    },
    {
        title: 'Action',
        key: 'action',
        width: 80,
        render: (_, __) => ( // Використовуємо _ та __ для невикористаних аргументів
            <Dropdown overlay={
                <Menu items={[
                    { key: 'view', label: 'View Details' },
                    { key: 'edit', label: 'Edit Sale' },
                    { key: 'delete', label: 'Delete', danger: true },
                ]} />
            } trigger={['click']}>
                <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
        ),
    },
];

// ==========================================
// 3. ОСНОВНИЙ КОМПОНЕНТ SALESPAGE
// ==========================================
export default function SalesPage() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredData = data.filter(item => 
        item.product.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Секція метрик */}
            <Row gutter={[24, 24]}>
                {salesMetricCards.map((card, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <MetricCard {...card} />
                    </Col>
                ))}
            </Row>

            {/* Секція Sales Transactions */}
            <Card 
                title={
                    <Title level={4} className="!mb-0 !text-black">Sales Transactions</Title>
                }
                bordered={false}
                className="rounded-xl shadow-lg !bg-white"
                bodyStyle={{ padding: 0 }}
            >
                {/* Хедер та екшн-кнопки */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <Input 
                        placeholder="Search product..." 
                        prefix={<SearchOutlined className="text-gray-400" />} 
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 250 }}
                        className="rounded-lg shadow-sm"
                    />
                    <Space size="middle" className="flex flex-wrap justify-end">
                        <Button type="primary" className="rounded-lg shadow-md bg-[#2c6e49] hover:bg-[#1e583d]">
                            Add Sale
                        </Button>
                    </Space>
                </div>
                
                {/* Таблиця */}
                <div className="p-4">
                    <Table 
                        columns={columns} 
                        dataSource={filteredData} 
                        pagination={{ pageSize: 10 }} 
                        scroll={{ x: 'max-content' }}
                        className="w-full"
                    />
                </div>
            </Card>
        </div>
    );
}
