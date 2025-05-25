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
    products: [{ product: "", quantity: "", unitCost: "" }],
  });

  const openModal = () => {
    const uniqueId = `B-${Date.now().toString().slice(-6)}`;
    setNewBatch({
      batchId: uniqueId,
      date: "",
      supplier: "",
      contact: "",
      products: [{ product: "", quantity: "", unitCost: "" }],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewBatch({
      batchId: "",
      date: "",
      supplier: "",
      contact: "",
      products: [{ product: "", quantity: "", unitCost: "" }],
    });
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedProducts = [...newBatch.products];
      updatedProducts[index][name] = value;
      setNewBatch({ ...newBatch, products: updatedProducts });
    } else {
      setNewBatch({ ...newBatch, [name]: value });
    }
  };

  const addProductField = () => {
    setNewBatch({
      ...newBatch,
      products: [...newBatch.products, { product: "", quantity: "", unitCost: "" }],
    });
  };

  const addBatch = () => {
    const { batchId, date, supplier, contact, products } = newBatch;
    if (
      batchId &&
      date &&
      supplier &&
      contact &&
      products.every((p) => p.product && p.quantity && p.unitCost)
    ) {
      setBatches([...batches, newBatch]);
      closeModal();
    } else {
      alert("Please complete all fields.");
    }
  };

  const deleteBatch = (id) => {
    setBatches(batches.filter((b) => b.batchId !== id));
  };

  return (
    <div className="supplier-page">
      <Sidebar />
      <DateTime />
      <div className="main-content">
        <div className="supplier-header">
          <h2 className="supplier-header-title">Supplier Management</h2>
          <button className="add-btn" onClick={openModal}>+ Add Batch</button>
        </div>

        <div className="supplier-section">
          <h3 className="section-title">Batch Purchases</h3>

          {/* Desktop Table */}
          <div className="table-wrapper desktop-only">
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>Batch ID</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Total Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-records">No records available</td>
                  </tr>
                ) : (
                  batches.map((batch) => (
                    <tr key={batch.batchId}>
                      <td>{batch.batchId}</td>
                      <td>{batch.date}</td>
                      <td>{batch.supplier}</td>
                      <td>{batch.contact}</td>
                      <td>
                        {batch.products.map((p, i) => (
                          <div key={i}>
                            {p.product} - {p.quantity}kg @ ₱{p.unitCost}
                          </div>
                        ))}
                      </td>
                      <td>
                        ₱{batch.products.reduce((acc, p) => acc + (p.quantity * p.unitCost), 0).toFixed(2)}
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteBatch(batch.batchId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="mobile-only">
            {batches.length === 0 ? (
              <p className="no-records">No records available</p>
            ) : (
              batches.map((batch) => (
                <div className="batch-card" key={batch.batchId}>
                  <div className="card-header">
                    <span className="card-batch-id">{batch.batchId}</span>
                    <button className="delete-btn" onClick={() => deleteBatch(batch.batchId)}>Delete</button>
                  </div>
                  <p><strong>Date:</strong> {batch.date}</p>
                  <p><strong>Supplier:</strong> {batch.supplier}</p>
                  <p><strong>Contact:</strong> {batch.contact}</p>
                  <div>
                    <strong>Products:</strong>
                    <ul>
                      {batch.products.map((p, i) => (
                        <li key={i}>{p.product} - {p.quantity}kg @ ₱{p.unitCost}</li>
                      ))}
                    </ul>
                  </div>
                  <p><strong>Total:</strong> ₱{batch.products.reduce((acc, p) => acc + (p.quantity * p.unitCost), 0).toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3 className="modal-title">Add New Batch</h3>
              <div className="modal-form">
                <div className="batch-id-display">
                  <strong>Batch ID:</strong> {newBatch.batchId}
                </div>
                <input name="date" type="date" value={newBatch.date} onChange={handleInputChange} />
                <input name="supplier" type="text" placeholder="Supplier" value={newBatch.supplier} onChange={handleInputChange} />
                <input name="contact" type="text" placeholder="Contact" value={newBatch.contact} onChange={handleInputChange} />
                <hr />
                <h4>Products</h4>
                {newBatch.products.map((p, i) => (
                  <div key={i} className="product-input-group">
                    <input type="text" name="product" placeholder="Product" value={p.product} onChange={(e) => handleInputChange(e, i)} />
                    <input type="number" name="quantity" placeholder="Quantity (kg)" value={p.quantity} onChange={(e) => handleInputChange(e, i)} />
                    <input type="number" name="unitCost" placeholder="Unit Cost" value={p.unitCost} onChange={(e) => handleInputChange(e, i)} />
                  </div>
                ))}
                <button className="add-product-btn" onClick={addProductField}>+ Add Product</button>
              </div>
              <div className="modal-actions">
                <button className="save-btn" onClick={addBatch}>Save</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
