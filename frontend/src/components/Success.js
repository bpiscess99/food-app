import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
    <h2>Payment Successful Received!</h2>
    <p>Thank you for your order </p>
    <button style={{borderRadius: ".8rem", marginTop: "15px", backgroundColor: "yellowgreen", font: "bold"}}> 
      <Link to="/myOrder" style={{"color" : "white", textDecoration: "none"}}>My Orders Detail</Link>
    </button>
    <br/>
    <button style={{borderRadius: ".8rem", marginTop: "15px", backgroundColor: "yellowgreen", font: "bold"}}>
    <Link to="/" style={{"color" : "white", textDecoration: "none"}}>Continue Shopping</Link>
    </button>
    </div>
  )
}

export default Success