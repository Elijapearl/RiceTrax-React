import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaDollarSign,
  FaBoxes,
  FaShoppingCart,
  FaExclamationTriangle,
} from "react-icons/fa";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import "../styles/dashboard.css";

Modal.setAppElement("#root");

const pieData = [
  { name: "Maharlika", value: 400 },
  { name: "Angelica", value: 150 },
  { name: "Dinurado", value: 300 },
  { name: "Jasmin", value: 80 },
];

const barData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 200 },
  { month: "May", sales: 300 },
];

const COLORS = ["#4caf50", "#81c784", "#a5d6a7", "#c8e6c9"];

const salesData = [
  {
    id: "TXN001",
    date: "2025-05-23",
    product: "Maharlika",
    quantitySold: 25,
    unitPrice: 500,
    totalAmount: 12500,
  },
  {
    id: "TXN002",
    date: "2025-05-23",
    product: "Angelica",
    quantitySold: 10,
    unitPrice: 550,
    totalAmount: 5500,
  },
    {
    id: "TXN002",
    date: "2025-05-23",
    product: "Jasmin",
    quantitySold: 10,
    unitPrice: 550,
    totalAmount: 5500,
  },
    {
    id: "TXN002",
    date: "2025-05-23",
    product: "Dinurado",
    quantitySold: 10,
    unitPrice: 550,
    totalAmount: 5500,
  },
];

const Dashboard = () => {
  const totalStock = 400 + 150 + 300 + 80;
  const soldStocks = 250;
  const lowStockItems = 1;
  const totalSalesToday = 15400;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Records");
    XLSX.writeFile(workbook, "sales_records.xlsx");
  };

  return (
    <>
      <Sidebar />
      <DateTimeDisplay />
      <main className="dashboard-content">
        <h1>Dashboard</h1>

        <section className="dashboard-cards">
          <div className="card">
            <div className="card-icon">
              <FaDollarSign />
            </div>
            <div className="card-text">
              <h3>Total Sales Today</h3>
              <p>₱ {totalSalesToday.toLocaleString()}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaBoxes />
            </div>
            <div className="card-text">
              <h3>Total Stock (sacks)</h3>
              <p>{totalStock.toLocaleString()}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaShoppingCart />
            </div>
            <div className="card-text">
              <h3>Sold Stocks (sacks)</h3>
              <p>{soldStocks.toLocaleString()}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-icon">
              <FaExclamationTriangle />
            </div>
            <div className="card-text">
              <h3>Low Stocks</h3>
              <p>{lowStockItems} item{lowStockItems > 1 ? "s" : ""}</p>
            </div>
          </div>
        </section>

        <section className="dashboard-charts">
          <div className="chart pie-chart">
            <h3>Inventory Breakdown (sacks)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={{ fill: "#2e7d32", fontWeight: "600" }}
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} sacks`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart bar-chart">
            <div className="chart-header">
              <h3>Monthly Sales (₱)</h3>
              <button className="sales-record-btn" onClick={openModal}>
                View Sales Records
              </button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" stroke="#4caf50" fontWeight="600" />
                <YAxis stroke="#4caf50" />
                <Tooltip formatter={(value) => `₱ ${value}`} />
                <Bar dataKey="sales" fill="#4caf50" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-table">
          <h3>Rice Inventory Stock</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rice Type</th>
                  <th>Quantity (sacks)</th>
                  <th>Price per Sack</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dinurado</td>
                  <td>400</td>
                  <td>₱ 500</td>
                  <td className="in-stock">In Stock</td>
                </tr>
                <tr>
                  <td>Angelica</td>
                  <td>150</td>
                  <td>₱ 550</td>
                  <td className="low-stock">Low Stock</td>
                </tr>
                <tr>
                  <td>Maharlika</td>
                  <td>300</td>
                  <td>₱ 530</td>
                  <td className="in-stock">In Stock</td>
                </tr>
                <tr>
                  <td>Jasmin</td>
                  <td>80</td>
                  <td>₱ 520</td>
                  <td className="out-stock">Out of Stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Sales Records"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <h2>Sales Records</h2>
          <button onClick={closeModal} className="close-btn">X</button>
        </div>
        <div className="modal-body">
          <button className="download-btn" onClick={downloadExcel}>
            Download Excel
          </button>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity Sold (kg)</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.date}</td>
                  <td>{record.product}</td>
                  <td>{record.quantitySold}</td>
                  <td>₱ {record.unitPrice}</td>
                  <td>₱ {record.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
