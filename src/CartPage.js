import React from "react";
import Header from "./Header";
import { useCart } from "./CartContext";

function CartPage() {
  const { cartItems, placeOrder, lastOrder } = useCart();

  return (
    <div className="cart-container">

      <Header />

      <h2>Your Cart</h2>

      {/* CART EMPTY */}
      {cartItems.length === 0 && !lastOrder && (
        <p>No items in cart</p>
      )}

      {/* CART ITEMS */}
      {cartItems.length > 0 && cartItems.map((item) => (
        <div key={item.id} className="card">
          <h4>{item.name}</h4>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}

      {/* PROCEED BUTTON */}
      {cartItems.length > 0 && (
        <button
          className="primary-btn"
          onClick={placeOrder}
        >
          Proceed to Buy
        </button>
      )}

      {/* ORDER SUCCESS */}
      {lastOrder && (
        <div className="order-box">
          <h3>🎉 Order Placed Successfully!</h3>

          <p>Total Items: {lastOrder.totalItems}</p>
          <p>Order ID: {lastOrder.orderId}</p>
          <p>Total Amount: ₹{lastOrder.totalAmount}</p>
          <p>Time: {lastOrder.time}</p>

          <h4>Items:</h4>

          {lastOrder.items.map((i) => (
            <p key={i.id}>
              {i.name} × {i.quantity}
            </p>
          ))}
        </div>
      )}

    </div>
  );
}

export default CartPage;