import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import {useSelector, useDispatch} from 'react-redux'
import {remove} from '../redux/slices/cartSlice'

const Navbar = (props) => {
   
  const [cartView, setCartView] = useState(false);
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "green" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("token")) ?
              <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                My Orders
              </Link>
            </li>
            
           : "" }
           {(localStorage.getItem("token")) ?
           <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/openai">
                  OpenAI
                </Link>
              </li>
              : ""}
            </ul>
          
            {(!localStorage.getItem("token")) ?
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1 fs-5" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text-success mx-1 fs-5" to="/register">
                SignUp
              </Link>
            </div>
            :
            <div>
            <button className="mx-2 fs-5" onClick={() => setCartView(true)}
            style={{background: "white", color: "green", borderRadius: "1.5rem" }}
            >
              My Cart
              <Badge pill bg='danger' style={{color: "red"}}>{data.length}</Badge>
            </button> 
            {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}

            <button className="mx-2 fs-5" 
            onClick={() => {
              handleLogOut()
              dispatch(remove({index: 0}))
            }}
            style={{background: "white", color: "red", borderRadius: "1.5rem"}}
            >
              Logout
            </button>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;