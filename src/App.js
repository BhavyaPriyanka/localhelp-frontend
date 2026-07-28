import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Help from "./Help";
import CartPage from "./CartPage";
import Orders from "./Orders";

function App() {

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/help"
        element={
          isLoggedIn ? <Help /> : <Navigate to="/" replace />
        }
      />

  

      <Route
        path="/cart"
        element={
          isLoggedIn ? <CartPage /> : <Navigate to="/" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

          <Route
  path="/orders"
  element={
    isLoggedIn ? <Orders /> : <Navigate to="/" replace />
  }
/>

    </Routes>
  );
}

export default App;