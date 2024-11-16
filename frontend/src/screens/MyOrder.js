import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import {URL} from '../App'


const MyOrder = () => {
  const [orderData, setOrderData] = useState(null);

    useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {

    try {
      const response = await axios.post(
        `${URL}/api/orders/myOrder`,
        {
          email: localStorage.getItem("userEmail"),
        }
      );
      console.log("Response:", response.data)
      setOrderData(response.data.orderData);
    } catch (error) {
      console.error("Error Fetching order:", error);
    }
  };

  

  return (
<div>
    <Navbar />
    <div className="container">
      <div className="row">
        {Array.isArray(orderData) && orderData.length > 0 ? (
          <div className="col-12">
            <h3>Your Orders</h3>
            <span>{localStorage.getItem("userEmail")}</span>
            {orderData.map((order) => (
              <div key={order._id} className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                  <p><strong>Total Amount:</strong> Rs {order.total_amount}</p>
                  
                  <h6>Items:</h6>
                  {order.order_data.map((item) => (
                    <div key={item._id} className="mb-2">
                      <p><strong>Item:</strong> {item.item}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> Rs {item.price}</p>
                      <p><strong>Size:</strong> {item.size}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-12">No orders found.</div>
        )}
      </div>
    </div>
    <Footer />
  </div>

  );
};

export default MyOrder;