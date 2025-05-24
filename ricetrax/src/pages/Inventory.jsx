import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar"; 
import DateTime from "../components/DateTimeDisplay"; 
import "../styles/inventory.css";

const initialBrands = [
  { id: 1, name: "Dinorado", stock: "50 sacks" },
  { id: 2, name: "Sinandomeng", stock: "30 sacks" },
  { id: 3, name: "Jasmine", stock: "20 sacks" },
  { id: 4, name: "Well-Milled", stock: "45 sacks" },
  { id: 5, name: "Premium", stock: "60 sacks" },
  { id: 6, name: "Brown Rice", stock: "25 sacks" },
  { id: 7, name: "Red Rice", stock: "15 sacks" },
  { id: 8, name: "Glutinous", stock: "10 sacks" },
  { id: 9, name: "Extra Brand", stock: "5 sacks" }, 
];

export default function Inventory() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState(initialBrands);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [form, setForm] = useState({ name: "", stock: "" });

  const openAddModal = () => {
    setSelectedBrand(null);
    setForm({ name: "", stock: "" });
    setDialogOpen(true);
  };

  const openEditModal = (brand, e) => {
    e.stopPropagation();
    setSelectedBrand(brand);
    setForm({ name: brand.name, stock: brand.stock });
    setDialogOpen(true);
  };

  const openDeleteConfirm = (brand, e) => {
    e.stopPropagation();
    setSelectedBrand(brand);
    setDeleteConfirmOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.stock.trim()) {
      alert("Please fill in both brand name and stock.");
      return;
    }
    if (selectedBrand) {
      setBrands(brands.map(b => b.id === selectedBrand.id ? { ...b, ...form } : b));
    } else {
      const newBrand = {
        id: Date.now(),
        name: form.name,
        stock: form.stock,
      };
      setBrands([...brands, newBrand]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setBrands(brands.filter(b => b.id !== selectedBrand.id));
    setDeleteConfirmOpen(false);
  };

  const getStockLevel = (stock) => {
    const qty = parseInt(stock);
    if (qty <= 10) return "out-of-stock";
    if (qty <= 25) return "low-stock1";
    return "in-stock1";
  };

  return (
    <>
      <Sidebar />
      <main className="inventory-main">
        <header className="inventory-header">
          <h1>Inventory</h1>
          <div className="inventory-header-controls">
            <DateTime />
          </div>
        </header>

        <div className="inventory-legend">
          <span><span className="dot in-stock-dot" /> In Stock</span>
          <span><span className="dot low-stock-dot" /> Low Stock</span>
          <span><span className="dot out-of-stock-dot" /> Out of Stock</span>
        </div>

        <button className="inventory-btn-add" onClick={openAddModal}>
          <Plus className="icon" /> Add Brand
        </button>

        <section className="inventory-brand-grid">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`inventory-brand-card ${getStockLevel(brand.stock)}`}
              onClick={() => navigate(`/inventory/${brand.id}`)}
            >
              <div className="inventory-brand-info">
                <h2>{brand.name}</h2>
                <p>Stock: {brand.stock}</p>
              </div>
              <div className="inventory-brand-actions">
                <button className="btn btn-edit" onClick={(e) => openEditModal(brand, e)}>
                  <Edit2 className="icon" />
                </button>
                <button className="btn btn-delete" onClick={(e) => openDeleteConfirm(brand, e)}>
                  <Trash2 className="icon" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {dialogOpen && (
          <div className="modal-overlay" onClick={() => setDialogOpen(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>{selectedBrand ? "Edit Brand" : "Add New Brand"}</h2>
              <label>
                Brand Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoFocus
                />
              </label>
              <label>
                Stock
                <input
                  type="text"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </label>
              <div className="modal-actions">
                <button className="btn btn-cancel" onClick={() => setDialogOpen(false)}>Cancel</button>
                <button className="btn btn-save" onClick={handleSave}>
                  {selectedBrand ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteConfirmOpen && (
          <div className="modal-overlay" onClick={() => setDeleteConfirmOpen(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete <strong>{selectedBrand?.name}</strong>?</p>
              <div className="modal-actions">
                <button className="btn btn-cancel" onClick={() => setDeleteConfirmOpen(false)}>Cancel</button>
                <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
