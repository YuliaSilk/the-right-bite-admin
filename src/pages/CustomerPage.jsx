import React, {useState, useEffect} from "react";
import {
 Table,
 Card,
 Button,
 Input,
 Space,
 Tag,
 Dropdown,
 Menu,
 Typography,
 Row,
 Col,
 Drawer,
 Avatar,
 Descriptions,
} from "antd";
import {
 SearchOutlined,
 PlusOutlined,
 EllipsisOutlined,
 UserOutlined,
 EnvironmentOutlined,
 ArrowUpOutlined,
 ArrowDownOutlined,
 CloseOutlined,
 PhoneOutlined,
 MailOutlined,
} from "@ant-design/icons";
import {getAllOrders} from "../api/ordersAPI"; // 👈 твоя функція з бекенду

const {Title, Text} = Typography;

const customerMetricCards = [
 {title: "Total Customers", value: "850", icon: <UserOutlined />, progress: "+4.2%", trend: "up"},
 {title: "New Customers", value: "55", icon: <PlusOutlined />, progress: "+1.1%", trend: "up"},
 {title: "Returning Customers", value: "620", icon: <ArrowUpOutlined />, progress: "+2.8%", trend: "up"},
 {title: "Total Visitors", value: "18.5k", icon: <EnvironmentOutlined />, progress: "-0.5%", trend: "down"},
];

const MetricCard = ({title, value, icon, progress, trend}) => {
 const isUp = trend === "up";
 return (
  <Card
   bordered={false}
   className="rounded-xl shadow-md !bg-white"
  >
   <div className="flex items-center justify-between">
    <div>
     <Text
      type="secondary"
      className="block text-sm"
     >
      {title}
     </Text>
     <Title
      level={3}
      className="!mt-1 !mb-2 !text-black"
     >
      {value}
     </Title>
    </div>
    <div className={`p-3 rounded-full text-white ${isUp ? "bg-[#2c6e49]" : "bg-red-500"}`}>{icon}</div>
   </div>
   <div className="mt-2 flex items-center text-xs">
    <Tag
     icon={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
     color={isUp ? "success" : "error"}
     className="!mr-2"
    >
     {progress}
    </Tag>
    <Text type="secondary">за останній місяць</Text>
   </div>
  </Card>
 );
};

const CustomerDetailsDrawer = ({customer, onClose}) => {
 if (!customer) return null;

 return (
  <Drawer
   title="Customer Details"
   placement="right"
   onClose={onClose}
   open={!!customer}
   width={400}
   closable={false}
   extra={
    <Button
     icon={<CloseOutlined />}
     onClick={onClose}
     type="text"
    />
   }
   className="!bg-gray-50"
  >
   <Card className="rounded-xl shadow-lg mb-4 text-center">
    <Avatar
     size={80}
     style={{backgroundColor: "#2c6e49", marginBottom: 16}}
    >
     {customer.firstname[0]}
    </Avatar>
    <Title
     level={3}
     className="!mt-2 !mb-1"
    >
     {customer.firstname} {customer.lastname}
    </Title>
    <Tag
     color="green"
     className="mt-3 rounded-full"
    >
     {customer.orderStatus}
    </Tag>
   </Card>

   <Card
    title="Contact Info"
    className="rounded-xl shadow-lg mb-4"
   >
    <Descriptions
     column={1}
     size="small"
    >
     <Descriptions.Item label="Phone">
      <PhoneOutlined className="mr-2 text-gray-400" />
      {customer.phoneNumber}
     </Descriptions.Item>
     {customer.email && (
      <Descriptions.Item label="Email">
       <MailOutlined className="mr-2 text-gray-400" />
       {customer.email}
      </Descriptions.Item>
     )}
     <Descriptions.Item label="Address">
      <EnvironmentOutlined className="mr-2 text-gray-400" />
      {customer.streetName} {customer.houseNumber}, {customer.city}, {customer.country}, {customer.zipCode}
     </Descriptions.Item>
    </Descriptions>
   </Card>

   <Card
    title="Order Info"
    className="rounded-xl shadow-lg"
   >
    <Descriptions
     column={1}
     size="small"
    >
     <Descriptions.Item label="Total Price">${customer.totalPrice}</Descriptions.Item>
     <Descriptions.Item label="Updated At">{new Date(customer.updatedAt).toLocaleString()}</Descriptions.Item>
    </Descriptions>
   </Card>
  </Drawer>
 );
};

export default function CustomersPage() {
 const [customers, setCustomers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchText, setSearchText] = useState("");
 const [selectedCustomer, setSelectedCustomer] = useState(null);

 useEffect(() => {
  const fetchOrders = async () => {
   try {
    const res = await getAllOrders();

    const mapped = res.map((order) => {
     const d = order.orderDeliveryDetails || {};
     return {
      id: order.id,
      firstname: d.firstname,
      lastname: d.lastname,
      phoneNumber: d.phoneNumber,
      email: order.user?.email || d.email || "—",
      city: d.city,
      country: d.country,
      streetName: d.streetName,
      houseNumber: d.houseNumber,
      zipCode: d.zipCode,
      orderStatus: order.orderStatus,
      totalPrice: order.totalPrice,
      updatedAt: order.updatedAt,
     };
    });

    setCustomers(mapped.slice().reverse());
   } catch (err) {
    console.error("Error fetching customers:", err);
   } finally {
    setLoading(false);
   }
  };

  fetchOrders();
 }, []);

 const handleSearch = (value) => setSearchText(value);

 const filteredData = customers.filter((c) => {
  const fullName = `${c.firstname ?? ""} ${c.lastname ?? ""}`.toLowerCase();
  return (
   fullName.includes(searchText.toLowerCase()) ||
   c.phoneNumber?.includes(searchText) ||
   c.email?.toLowerCase().includes(searchText.toLowerCase())
  );
 });

 const columns = [
  {
   title: "Order ID#",
   key: "id",
   render: (_, record) => (
    <Space>
     <div>
      <Text
       strong
       className="flex justify-center items-center self-center"
      >
       {record.id}
      </Text>
     </div>
    </Space>
   ),
  },
  {
   title: "Name",
   key: "name",
   render: (_, record) => (
    <Space>
     <Avatar style={{backgroundColor: "#2c6e49"}}>{record.firstname?.[0] || "?"}</Avatar>
     <div>
      <Text
       strong
       className="block"
      >
       {record.firstname} {record.lastname}
      </Text>
      <Text type="secondary">{record.email}</Text>
     </div>
    </Space>
   ),
  },
  {
   title: "Phone",
   dataIndex: "phoneNumber",
   key: "phoneNumber",
  },
  {
   title: "Address",
   key: "address",
   render: (_, record) => (
    <Text>
     {record.streetName} {record.houseNumber}, {record.city}, {record.country}
    </Text>
   ),
  },
  {
   title: "Total Price",
   dataIndex: "totalPrice",
   key: "totalPrice",
   render: (val) => `$${val}`,
  },
  {
   title: "Status",
   dataIndex: "orderStatus",
   key: "orderStatus",
   render: (status) => <Tag color={status === "CREATED" ? "blue" : "green"}>{status}</Tag>,
  },
  {
   title: "Action",
   key: "action",
   width: 80,
   render: (_, record) => (
    <Dropdown
     overlay={<Menu items={[{key: "view", label: "View Details", onClick: () => setSelectedCustomer(record)}]} />}
     trigger={["click"]}
    >
     <Button
      type="text"
      icon={<EllipsisOutlined />}
     />
    </Dropdown>
   ),
  },
 ];

 return (
  <div className="space-y-6">
   {/* Метрики */}
   <Row gutter={[24, 24]}>
    {customerMetricCards.map((card, index) => (
     <Col
      xs={24}
      sm={12}
      lg={6}
      key={index}
     >
      <MetricCard {...card} />
     </Col>
    ))}
   </Row>

   {/* Таблиця користувачів */}
   <Card
    title={
     <Title
      level={4}
      className="!mb-0 !text-black"
     >
      Customer List
     </Title>
    }
    className="rounded-xl shadow-lg !bg-white"
   >
    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
     <Input
      placeholder="Search customers..."
      prefix={<SearchOutlined className="text-gray-400" />}
      onChange={(e) => handleSearch(e.target.value)}
      style={{width: 250}}
      className="rounded-lg shadow-sm"
     />
    </div>

    <div className="p-4">
     <Table
      columns={columns}
      dataSource={filteredData}
      loading={loading}
      pagination={{pageSize: 10}}
      rowKey="id"
      scroll={{x: "max-content"}}
     />
    </div>
   </Card>

   <CustomerDetailsDrawer
    customer={selectedCustomer}
    onClose={() => setSelectedCustomer(null)}
   />
  </div>
 );
}
