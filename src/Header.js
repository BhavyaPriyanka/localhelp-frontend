import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useCart } from "./CartContext";

function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  const [showLogin, setShowLogin] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/");
    window.location.reload();

  };


  return (
    <>

      <header className="app-header">


        <div className="left-section">


          <div
            className="logo"
            onClick={() => navigate("/")}
          >
            LocalHelp
          </div>



          {
            location.pathname !== "/" && (

              <nav className="nav-links">

                <Link to="/">
                  Home
                </Link>

              </nav>

            )
          }


        </div>





        <div className="user-section">


          {
            token && (

              <>


                {/* CART ICON */}
                <Link
                  to="/cart"
                  className="cart-link"
                >

                  🛒

                  {
                    totalItems > 0 && (

                      <span className="badge">
                        {totalItems}
                      </span>

                    )
                  }

                </Link>



                {/* ORDERS ICON */}
                <Link
                  to="/orders"
                  className="cart-link"
                >
                  📦
                </Link>



              </>

            )
          }





          {
            !token ? (

              <button

                className="green-btn"

                onClick={() => setShowLogin(true)}

              >

                Login

              </button>


            ) : (

              <>

                <span className="welcome-text">

                  Welcome, {username}

                </span>



                <button

                  className="red-btn"

                  onClick={logout}

                >

                  Logout

                </button>


              </>

            )
          }



        </div>


      </header>





      {
        showLogin && (

          <AuthModal

            type="signin"

            onClose={() => setShowLogin(false)}

          />

        )
      }


    </>
  );

}


export default Header;