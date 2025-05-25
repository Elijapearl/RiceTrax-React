export function generateReceiptHTML(cartItems, subtotal, tax, total, cash, change, autoPrint = false) {
  const itemsHTML = cartItems
    .map(
      (item) =>
        `<tr>
          <td>${item.name}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">₱${item.price.toFixed(2)}</td>
          <td style="text-align: right;">₱${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  // The URL embedded in QR code can be customized here:
  const qrDataURL = encodeURIComponent('https://www.ricetrax.com/thankyou');

  return `
  <html>
  <head>
    <title>RiceTrax Receipt</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

      body {
        font-family: 'Montserrat', Arial, sans-serif;
        margin: 50px auto;
        max-width: 350px;
        color: #222;
        background:rgb(255, 255, 255);
        font-size: 12px;
        line-height: 1.3;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 12px;
      }
      header img.logo {
        width: 60px;
        height: auto;
      }
      header h1 {
        margin: 0;
        font-weight: 700;
        font-size: 1.4rem;
        color: #2e7d32;
        letter-spacing: 1.5px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 6px 8px;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #e8f5e9;
        color: #2e7d32;
        font-weight: 700;
        font-size: 0.85rem;
      }
      tbody tr:hover {
        background-color: #f9fbe7;
      }
      tfoot td {
        font-weight: 700;
        padding: 8px;
        border-top: 2px solid #2e7d32;
        font-size: 0.9rem;
      }
      tfoot tr.total-row td {
        font-size: 1rem;
        color: #1b5e20;
      }
      .qr-section {
        margin-top: 20px;
        text-align: center;
      }
      .qr-section img.qr {
        width: 100px;
        height: 100px;
        margin: 0 auto;
      }
      .footer {
        text-align: center;
        margin-top: 14px;
        font-size: 10px;
        color: #555;
        border-top: 1px solid #ccc;
        padding-top: 8px;
      }
      p.thanks {
        margin-top: 18px;
        font-weight: 700;
        color: #2e7d32;
        text-align: center;
        font-size: 1rem;
      }
    </style>
    ${autoPrint ? `<script>window.onload = () => { window.print(); }</script>` : ""}
  </head>
  <body>
    <header>
      <img class="logo" src="/Logo.png" alt="RiceTrax Logo" />
      <h1>RiceTrax</h1>
    </header>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align: right;">Subtotal:</td>
          <td style="text-align: right;">₱${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right;">Tax (12%):</td>
          <td style="text-align: right;">₱${tax.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td colspan="3" style="text-align: right;">Total:</td>
          <td style="text-align: right;">₱${total.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right;">Cash:</td>
          <td style="text-align: right;">₱${isNaN(cash) ? "0.00" : cash.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right;">Change:</td>
          <td style="text-align: right;">₱${change < 0 ? "0.00" : change.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <div class="qr-section">
      <p>Scan to visit RiceTrax</p>
      <img
        class="qr"
        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${qrDataURL}"
        alt="RiceTrax QR Code"
      />
    </div>

    <p class="thanks">Thank you for shopping at RiceTrax!</p>

    <div class="footer">
      <p>www.ricetrax.com | Contact: (123) 456-7890</p>
    </div>
  </body>
  </html>
  `;
}
