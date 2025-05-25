import React, { useState } from 'react';
import '../styles/supplier.css';
import Sidebar from '../components/Sidebar';
import DateTime from '../components/DateTimeDisplay';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Supplier() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    batchId: '',
    date: '',
    supplier: '',
    contact: '',
    products: '',
    quantity: '',
    unitCost: '',
  });

  const openModal = (record = null) => {
    if (record) setForm(record);
    else setForm({
      id: null,
      batchId: '',
      date: '',
      supplier: '',
      contact: '',
      products: '',
      quantity: '',
      unitCost: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    const totalCost = form.quantity * form.unitCost;
    const newRecord = { ...form, totalCost };

    if (form.id) {
      setRecords(records.map((r) => (r.id === form.id ? newRecord : r)));
    } else {
      setRecords([...records, { ...newRecord, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="supplier-container">
      <Sidebar />
      <div className="supplier-content">
        <div className="supplier-header">
          <h1>Supplier Purchases</h1>
          <DateTime />
        </div>

        <div className="supplier-card">
          <div className="supplier-actions">
            <h2>Purchase Records</h2>
            <button className="btn-green" onClick={() => openModal()}>
              <Plus size={16} /> Add Batch
            </button>
          </div>

          <div className="supplier-table-wrapper">
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Qty (kg)</th>
                  <th>Unit Cost</th>
                  <th>Total Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.batchId}</td>
                    <td>{record.date}</td>
                    <td>{record.supplier}</td>
                    <td>{record.contact}</td>
                    <td>{record.products}</td>
                    <td>{record.quantity}</td>
                    <td>₱{record.unitCost.toLocaleString()}</td>
                    <td className="text-green">₱{record.totalCost.toLocaleString()}</td>
                    <td>
                      <button className="icon-btn" onClick={() => openModal(record)}><Edit2 size={16} /></button>
                      <button className="icon-btn" onClick={() => handleDelete(record.id)}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="9" className="no-data">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{form.id ? 'Update' : 'Add'} Batch</h3>
            <input placeholder="Batch ID" value={form.batchId} onChange={(e) => setForm({ ...form, batchId: e.target.value })} />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <input placeholder="Supplier Name" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} />
            <input placeholder="Contact Number" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            <input placeholder="Products" value={form.products} onChange={(e) => setForm({ ...form, products: e.target.value })} />
            <input type="number" placeholder="Quantity (kg)" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            <input type="number" placeholder="Unit Cost" value={form.unitCost} onChange={(e) => setForm({ ...form, unitCost: Number(e.target.value) })} />
            <button className="btn-blue" onClick={handleSave}>{form.id ? 'Update' : 'Add'} Batch</button>
          </div>
        </div>
      )}
    </div>
  );
}
