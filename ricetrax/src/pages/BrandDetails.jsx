import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DateTime from "../components/DateTimeDisplay";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/branddetails.css";
import mockBrandData from "../data/mockBrandData";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
        borderColor: "#388e3c",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const revenueData = {
    labels: sortedChartTxns.map((txn) => txn.date),
    datasets: [
      {
        label: "Revenue (₱)",
        data: sortedChartTxns.map((txn) => txn.quantity * txn.price),
        backgroundColor: "#81c784",
      },
    ],
  };

  if (!brand) return <p>Loading brand details...</p>;

  const years = generateYearOptions();

  function exportToExcel() {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    // Prepare data for worksheet
    const wsData = filteredTransactions.map((txn) => ({
      "Transaction ID": txn.id,
      Date: txn.date,
      Quantity: txn.quantity,
      "Unit Price (₱)": txn.price,
      "Total Price (₱)": (txn.quantity * txn.price).toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, `${brand.name}_transactions.xlsx`);
  }

  return (
    <div className="branddetails-container">
      <Sidebar />
      <main className="branddetails-main">
        <DateTime />
        <header className="branddetails-header">
          <h1>{brand.name} Details</h1>
        </header>

        <section className="branddetails-stats">
          <div className="card stat-card green">
            <h3>Total Stock</h3>
            <p>{brand.totalStock} sacks</p>
          </div>
          <div className="card stat-card yellow">
            <h3>Sold Stock</h3>
            <p>{brand.soldStock} sacks</p>
          </div>
          <div className="card stat-card blue">
            <h3>Price/Sack</h3>
            <p>₱{brand.pricePerSack}</p>
          </div>
        </section>

        <section className="branddetails-filters">
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
        </section>

        {/* Download Excel Button */}
        <div className="excel-export-container">
          <button className="btn-excel" onClick={exportToExcel}>
            Download Excel
          </button>
        </div>

        {/* Desktop Table */}
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
                  <td>{(txn.quantity * txn.price).toFixed(2)}</td>
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

        {/* Mobile Cards */}
        <div className="branddetails-cardlist">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn) => (
              <div key={txn.id} className="txn-card">
                <p>
                  <strong>Transaction ID:</strong> {txn.id}
                </p>
                <p>
                  <strong>Date:</strong> {txn.date}
                </p>
                <p>
                  <strong>Quantity:</strong> {txn.quantity} kg
                </p>
                <p>
                  <strong>Unit Price:</strong> ₱{txn.price}
                </p>
                <p>
                  <strong>Total:</strong> ₱{(txn.quantity * txn.price).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No transactions found</p>
          )}
        </div>

        <section className="branddetails-graph">
          <h3>Sales & Revenue Trend</h3>
          <div className="chart-filter">
            <label>Show last:</label>
            <select
              value={chartMonths}
              onChange={(e) => setChartMonths(Number(e.target.value))}
            >
              {[1, 3, 6, 12].map((m) => (
                <option key={m} value={m}>
                  {m} month{m > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="chart-row">
            <div className="chart-box">
              <Line data={salesData} />
            </div>
            <div className="chart-box">
              <Bar data={revenueData} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
