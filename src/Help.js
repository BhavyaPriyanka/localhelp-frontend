import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Header from "./Header";

function Help() {

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const [selectedService, setSelectedService] = useState("Medicines");
  const [medicines, setMedicines] = useState([]);


  // Fetch medicines from backend
 useEffect(() => {

  const token = localStorage.getItem("token");

  fetch("http://localhost:8080/medicines", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => setMedicines(data))
    .catch((err) => console.error(err));

}, []);



  const services = [
    "Medicines",
    "Food",
    "Transport",
    "Home Services",
    "Emergency"
  ];



  return (

    <div className="help-container">


      <Header />


      {/* PAGE HEADER */}
      <div className="help-header">

        <h2>
          Services
        </h2>

      </div>



      {/* SERVICES */}
      <div className="services-row">

        {services.map((service) => (

          <div

            key={service}

            className={`service-box ${
              selectedService === service ? "active" : ""
            }`}

            onClick={() => setSelectedService(service)}

          >

            {service}

          </div>

        ))}

      </div>




      {/* UNDER DEVELOPMENT */}
      {
        selectedService !== "Medicines" && (

          <div className="maintenance-msg">

            🚧 {selectedService} service is under development

          </div>

        )
      }






      {/* MEDICINES */}

      {
        selectedService === "Medicines" && (

          <div className="medicine-vertical">


            {
              medicines.map((med) => {


                const item = cartItems.find(
                  (i) => i.id === med.id
                );


                const qty = item ? item.quantity : 0;



                return (

                  <div

                    key={med.id}

                    className="medicine-card"

                  >


                    {/* MEDICINE DETAILS */}

                    <div>

                      <h4>
                        {med.name}
                      </h4>


                      <small>
                        {med.description}
                      </small>


                      <p>
                        ₹{med.price}
                      </p>


                      <small>
                        Stock: {med.stock}
                      </small>


                    </div>





                    {/* ACTION */}

                    <div className="med-actions">


                      {
                        qty === 0 ? (


                          <button

                            className="add-btn"

                            onClick={() =>

                              addToCart({

                                id: med.id,

                                name: med.name,

                                price: med.price

                              })

                            }

                          >

                            Add

                          </button>


                        ) : (


                          <div className="qty-controls">


                            <button

                              onClick={() =>
                                decreaseQty(med.id)
                              }

                            >

                              -

                            </button>



                            <span>
                              {qty}
                            </span>




                            <button

                              onClick={() =>
                                increaseQty(med.id)
                              }

                              disabled={qty >= 5}

                            >

                              +

                            </button>



                          </div>


                        )
                      }



                    </div>



                  </div>


                );


              })

            }



          </div>


        )
      }



    </div>


  );

}


export default Help;