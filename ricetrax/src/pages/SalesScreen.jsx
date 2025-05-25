import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import "../styles/salesScreen.css";
import { generateReceiptHTML } from "../utils/ReceiptWindow";
import Logo from "../assets/logo.png"; 

const products = [
  { id: 1, name: "Dinorado", stock: "50 sacks", price: 720 },
  { id: 2, name: "Sinandomeng", stock: "30 sacks", price: 680 },
  { id: 3, name: "Jasmine", stock: "20 sacks", price: 350 },
  { id: 4, name: "Well-Milled", stock: "45 sacks", price: 500 },
  { id: 5, name: "Premium", stock: "60 sacks", price: 800 },
  { id: 6, name: "Brown Rice", stock: "25 sacks", price: 750 },
  { id: 7, name: "Red Rice", stock: "15 sacks", price: 700 },
  { id: 8, name: "Glutinous", stock: "10 sacks", price: 450 },
  { id: 9, name: "Extra Brand", stock: "5 sacks", price: 400 },
];

const SalesScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cash, setCash] = useState("");
  const receiptWindowRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.12;
  const total = subtotal + tax;
  const change = cash ? cash - total : 0;

  const handlePreview = () => {
    if (receiptWindowRef.current && !receiptWindowRef.current.closed) {
      receiptWindowRef.current.focus();
      return;
    }
    receiptWindowRef.current = window.open(
      "",
      "ReceiptPreview",
      "width=400,height=700"
    );
    const htmlContent = generateReceiptHTML(
      cartItems,
      subtotal,
      tax,
      total,
      parseFloat(cash),
      change
    );
    receiptWindowRef.current.document.write(htmlContent);
    receiptWindowRef.current.document.close();
  };

  const handlePrint = () => {
    if (receiptWindowRef.current && !receiptWindowRef.current.closed) {
      receiptWindowRef.current.focus();
      receiptWindowRef.current.print();
    } else {
      const newWindow = window.open(
        "",
        "ReceiptPreview",
        "width=600,height=800"
      );
      const htmlContent = generateReceiptHTML(
        cartItems,
        subtotal,
        tax,
        total,
        parseFloat(cash),
        change
      );
      newWindow.document.write(htmlContent);
      newWindow.document.close();
      newWindow.focus();
      newWindow.onload = () => {
        newWindow.print();
      };
      receiptWindowRef.current = newWindow;
    }
  };

  const handleCheckout = () => {
    if (total === 0 || change < 0) return;
    setShowModal(true);
  };

  return (
    <div className="sales-page">
      <Sidebar />
      <div className="sales-container">
        <DateTimeDisplay />

        <div className="left-section">
          <h2>Available Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p>Stock: {product.stock}</p>
                <p>Price: ₱{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add</button>
              </div>
            ))}
          </div>

          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <span>{item.name}</span>
                  <span>₱{item.price}</span>
                </div>
                <div className="item-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>
                    +
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="right-section">
          <h2>Summary</h2>
          <div className="summary-box">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (12%):</span>
              <span>₱{tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <label>Cash:</label>
              <input
                type="number"
                value={cash}
                onChange={(e) => setCash(parseFloat(e.target.value) || "")}
                placeholder="Enter cash amount"
              />
            </div>
            <div className="summary-line change">
              <span>Change:</span>
              <span>{change < 0 ? "₱0.00" : `₱${change.toFixed(2)}`}</span>
            </div>

            <button
              className="checkout-btn"
              disabled={total === 0 || change < 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              className="print-btn"
              onClick={handlePreview}
              disabled={cartItems.length === 0}
              style={{ backgroundColor: "#0288d1", marginTop: "0.5rem" }}
            >
              Preview Receipt
            </button>

            <button
              className="print-btn"
              onClick={handlePrint}
              disabled={cartItems.length === 0 || change < 0}
              style={{ backgroundColor: "#2e7d32", marginTop: "0.5rem" }}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <img src={Logo} alt="RiceTrax Logo" className="modal-logo" />
            <h2>Thank you for your purchase!</h2>
            <p>Your transaction was successful.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesScreen;
