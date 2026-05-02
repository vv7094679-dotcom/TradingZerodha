import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [status, setStatus] = useState("");
  const generalContext = useContext(GeneralContext);

  const handleSubmit = async () => {
    const qtyNum = Number(stockQuantity);
    const priceNum = Number(stockPrice);
    if (!uid || !qtyNum || !priceNum || qtyNum <= 0 || priceNum <= 0) {
      setStatus("Enter valid quantity and price");
      return;
    }

      try {
        const res = await axios.post(`${API_URL}/newOrder`, {
          name: uid,
          qty: qtyNum,
          price: priceNum,
          mode,
        });
      setStatus(res.data || "Order saved!");
      setTimeout(() => {
        generalContext.closeBuyWindow();
      }, 800);
    } catch (err) {
      setStatus("Failed to place order");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleSubmit}>
            {mode === "SELL" ? "Sell" : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
      {status && (
        <div className="text-center" style={{ marginTop: 10 }}>
          <span>{status}</span>
        </div>
      )}
    </div>
  );
};

export default BuyActionWindow;
