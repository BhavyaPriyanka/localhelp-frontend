import React, { useEffect, useState } from "react";
import Header from "./Header";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {

  const token = localStorage.getItem("token");

  fetch("http://localhost:8080/orders/my-orders", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    return res.json();

  })
  .then(data => {

    setOrders(data);

  })
  .catch(err => {

    console.error("ORDER API ERROR:", err);
    setError("Unable to load orders");

  });

}, []);



  return (

    <div className="cart-container">

      <Header />


      <h2>
        My Orders
      </h2>



      {
        error && (
          <p>
            {error}
          </p>
        )
      }



      {
        orders.length === 0 && !error && (

          <p>
            No previous orders found
          </p>

        )
      }

{
  orders.map(order => (

    <div
      key={order.orderId}
      className="card"
    >


      <h3>
        Order ID: #{order.orderId}
      </h3>



      <p>
        Total Amount: ₹{order.totalAmount}
      </p>



      {
        order.orderDate && (

          <p>
            Date: {order.orderDate}
          </p>

        )
      }



      <h4>
        Items
      </h4>



      {
        order.items.map(item => (

          <div
            key={item.medicineId}
            className="order-item"
          >

            <p>
              Medicine: {item.medicineName}
            </p>


            <p>
              Quantity: {item.quantity}
            </p>


            <p>
              Price: ₹{item.price}
            </p>


          </div>

        ))
      }



    </div>

  ))
}


    </div>

  );

}


export default Orders;