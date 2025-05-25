import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DateTime from "../components/DateTimeDisplay";
import "../styles/supplier.css";

const Supplier = () => {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBatch, setNewBatch] = useState({
    batchId: "",
    date: "",
    supplier: "",
    contact: "",
    product: "",
    quantity: "",
    unitCost: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewBatch({
      batchId: "",
      date: "",
      supplier: "",
      contact: "",
      product: "",
      quantity: "",
      unitCost: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBatch((prev) => ({ ...prev, [name]: value }));
  };

  const addBatch = () => {
    if (
      newBatch.batchId &&
      newBatch.date &&
      newBatch.supplier &&
      newBatch.contact &&
      newBatch.product &&
      newBatch.quantity &&
      newBatch.unitCost
    ) {
      setBatches([...batches, newBatch]);
      closeModal();
    } else {
      alert("Please complete all fields.");
    }
  };

  const deleteBatch = (id) => {
    const updated = batches.filter((b) => b.batchId !== id);
    setBatches(updated);
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <DateTime />
      <div className="main-content">
        
        <div className="supplier-header">
          <h2 className="supplier-header1">Supplier Management</h2>
          <button className="add-btn" onClick={openModal}>
            + Add Batch
          </button>
        </div>

        <div className="supplier-section">
          <h3>Batch Purchases</h3>
          <div className="table-wrapper">
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Product</th>
                  <th>Qty (kg)</th>
                  <th>Unit Cost</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-records">No records available</td>
                  </tr>
                ) : (
                  batches.map((batch) => (
                    <tr key={batch.batchId}>
                      <td>{batch.batchId}</td>
                      <td>{batch.date}</td>
                      <td>{batch.supplier}</td>
                      <td>{batch.contact}</td>
                      <td>{batch.product}</td>
                      <td>{batch.quantity}</td>
                      <td>₱{batch.unitCost}</td>
                      <td>₱{(batch.unitCost * batch.quantity).toFixed(2)}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteBatch(batch.batchId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Batch</h3>
              <div className="modal-form">
                {["batchId", "date", "supplier", "contact", "product", "quantity", "unitCost"].map((field) => (
                  <input
                    key={field}
                    type={field === "date" ? "date" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newBatch[field]}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
              <div className="modal-actions">
                <button onClick={addBatch} className="save-btn">Save</button>
                <button onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
