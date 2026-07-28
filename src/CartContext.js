import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  const addToCart = (medicine) => {

  setLastOrder(null);

  setCartItems((prev) => {
      const exists = prev.find((i) => i.id === medicine.id);

      if (exists) {
        return prev.map((i) =>
          i.id === medicine.id && i.quantity < 5
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity < 5
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  // 🚀 REAL BACKEND ORDER CALL
  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      const token = localStorage.getItem("token");

const response = await fetch("http://localhost:8080/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    items: cartItems.map((i) => ({
      medicineId: i.id,
      quantity: i.quantity
    }))
  })
});

      if (!response.ok) throw new Error("Order failed");

      const data = await response.json();

      setLastOrder({
        items: cartItems,
        totalItems: cartItems.reduce((s, i) => s + i.quantity, 0),
        time: new Date().toLocaleString(),
        orderId: data.orderId,
        totalAmount: data.totalAmount
      });

      setCartItems([]);

    } catch (err) {
      console.error(err);
      alert("Order failed. Check backend.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        placeOrder,
        lastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
