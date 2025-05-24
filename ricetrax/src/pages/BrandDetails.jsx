import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DateTime from "../components/DateTimeDisplay";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/branddetails.css";

const mockBrandData = {
  1: {
    name: "Dinorado",
    totalStock: 150,
    soldStock: 90,
    pricePerSack: 1800,
    transactions: [
      { id: "T001", date: "2025-05-01", quantity: 20, price: 45 },
      { id: "T002", date: "2025-05-03", quantity: 15, price: 45 },
      { id: "T003", date: "2025-05-10", quantity: 5, price: 45 },
      { id: "T050", date: "2025-05-15", quantity: 30, price: 45 },
      { id: "T051", date: "2025-05-20", quantity: 20, price: 45 },
    ],
  },
  2: {
    name: "Sinandomeng",
    totalStock: 120,
    soldStock: 70,
    pricePerSack: 1700,
    transactions: [
      { id: "T004", date: "2025-05-02", quantity: 10, price: 42 },
      { id: "T005", date: "2025-05-07", quantity: 10, price: 42 },
      { id: "T006", date: "2025-05-11", quantity: 10, price: 42 },
      { id: "T052", date: "2025-05-13", quantity: 20, price: 42 },
      { id: "T053", date: "2025-05-17", quantity: 20, price: 42 },
    ],
  },
  3: {
    name: "Jasmine",
    totalStock: 90,
    soldStock: 50,
    pricePerSack: 1650,
    transactions: [
      { id: "T007", date: "2025-04-25", quantity: 15, price: 40 },
      { id: "T008", date: "2025-05-10", quantity: 5, price: 40 },
      { id: "T054", date: "2025-05-12", quantity: 10, price: 40 },
      { id: "T055", date: "2025-05-15", quantity: 10, price: 40 },
      { id: "T056", date: "2025-05-18", quantity: 10, price: 40 },
    ],
  },
  4: {
    name: "Well-Milled",
    totalStock: 110,
    soldStock: 65,
    pricePerSack: 1550,
    transactions: [
      { id: "T009", date: "2025-04-30", quantity: 25, price: 38 },
      { id: "T010", date: "2025-05-05", quantity: 20, price: 38 },
      { id: "T057", date: "2025-05-08", quantity: 10, price: 38 },
      { id: "T058", date: "2025-05-14", quantity: 10, price: 38 },
    ],
  },
  5: {
    name: "Premium",
    totalStock: 140,
    soldStock: 100,
    pricePerSack: 1850,
    transactions: [
      { id: "T011", date: "2025-05-01", quantity: 30, price: 48 },
      { id: "T012", date: "2025-05-09", quantity: 30, price: 48 },
      { id: "T059", date: "2025-05-15", quantity: 20, price: 48 },
      { id: "T060", date: "2025-05-20", quantity: 20, price: 48 },
    ],
  },
  6: {
    name: "Brown Rice",
    totalStock: 75,
    soldStock: 40,
    pricePerSack: 1750,
    transactions: [
      { id: "T013", date: "2025-04-20", quantity: 15, price: 43 },
      { id: "T014", date: "2025-05-03", quantity: 10, price: 43 },
      { id: "T061", date: "2025-05-10", quantity: 5, price: 43 },
      { id: "T062", date: "2025-05-16", quantity: 10, price: 43 },
    ],
  },
  7: {
    name: "Red Rice",
    totalStock: 55,
    soldStock: 30,
    pricePerSack: 1700,
    transactions: [
      { id: "T015", date: "2025-05-08", quantity: 15, price: 44 },
      { id: "T063", date: "2025-05-12", quantity: 10, price: 44 },
      { id: "T064", date: "2025-05-18", quantity: 5, price: 44 },
    ],
  },
  8: {
    name: "Glutinous",
    totalStock: 40,
    soldStock: 20,
    pricePerSack: 1900,
    transactions: [
      { id: "T016", date: "2025-04-27", quantity: 10, price: 50 },
      { id: "T065", date: "2025-05-10", quantity: 10, price: 50 },
    ],
  },
  9: {
    name: "Extra Brand",
    totalStock: 25,
    soldStock: 15,
    pricePerSack: 1500,
    transactions: [
      { id: "T017", date: "2025-05-12", quantity: 5, price: 35 },
      { id: "T066", date: "2025-05-14", quantity: 5, price: 35 },
      { id: "T067", date: "2025-05-16", quantity: 5, price: 35 },
    ],
  },
};
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

const MONTH_NAMES = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// Generate a range of years including past 5 years, current year, and next 2 years
function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear + 2; y >= currentYear - 5; y--) {
    years.push(String(y));
  }
  return years;
}

export default function BrandDetails() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartMonths, setChartMonths] = useState(3);

  useEffect(() => {
    const data = mockBrandData[brandId];
    setBrand(data);
    setFilteredTransactions(data?.transactions || []);
    setSelectedYear("");
    setSelectedMonth("");
  }, [brandId]);

  useEffect(() => {
    if (!brand) return;

    if (!selectedYear) {
      setFilteredTransactions(brand.transactions);
      setSelectedMonth("");
    } else if (selectedYear && !selectedMonth) {
      const filtered = brand.transactions.filter((txn) =>
        txn.date.startsWith(selectedYear)
      );
      setFilteredTransactions(filtered);
    } else if (selectedYear && selectedMonth) {
      const filterStr = `${selectedYear}-${selectedMonth}`;
      const filtered = brand.transactions.filter((txn) =>
        txn.date.startsWith(filterStr)
      );
      setFilteredTransactions(filtered);
    }
  }, [selectedYear, selectedMonth, brand]);

  const now = new Date();
  const chartTransactions = brand
    ? brand.transactions.filter((txn) => {
        const txnDate = new Date(txn.date);
        return now - txnDate <= chartMonths * MONTH_MS;
      })
    : [];

  const sortedChartTxns = [...chartTransactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const salesData = {
    labels: sortedChartTxns.map((txn) => txn.date),
    datasets: [
      {
        label: "Sales (kg)",
        data: sortedChartTxns.map((txn) => txn.quantity),
        fill: false,
        borderColor: "#4caf50",
        tension: 0.3,
      },
    ],
  };

  if (!brand) return <p>Loading brand details...</p>;

  // Use dynamic years options instead of only those from data
  const years = generateYearOptions();

  return (
    <div className="branddetails-container">
      <Sidebar />
      <main className="branddetails-main">
        <DateTime />
        <div className="branddetails-header">
          <h1>{brand.name} Details</h1>
        </div>

        <div className="branddetails-stats">
          <div className="card green">
            <h3>Total Stock</h3>
            <p>{brand.totalStock} sacks</p>
          </div>
          <div className="card yellow">
            <h3>Sold Stock</h3>
            <p>{brand.soldStock} sacks</p>
          </div>
          <div className="card blue">
            <h3>Price/Sack</h3>
            <p>₱{brand.pricePerSack}</p>
          </div>
        </div>

        <div className="branddetails-filters">
          <div className="filter-group">
            <label htmlFor="yearFilter">Year</label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedMonth("");
              }}
            >
              <option value="">All Years</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="monthFilter">Month</label>
            <select
              id="monthFilter"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              disabled={!selectedYear}
            >
              <option value="">All Months</option>
              {MONTH_NAMES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="branddetails-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Quantity (kg)</th>
              <th>Unit Price (₱)</th>
              <th>Total (₱)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>{txn.quantity}</td>
                  <td>{txn.price}</td>
                  <td>{txn.quantity * txn.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="branddetails-graph">
          <h3>Sales Trend</h3>
          <div className="chart-filter">
            <label>Show last:</label>
            <select
              value={chartMonths}
              onChange={(e) => setChartMonths(Number(e.target.value))}
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>
          <Line data={salesData} />
        </div>
      </main>
    </div>
  );
}
