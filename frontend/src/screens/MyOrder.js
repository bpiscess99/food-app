import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import {toast} from 'react-toastify';
import {URL} from '../App'
import { useDispatch, useSelector } from "react-redux";
import { myOrderFood } from "../redux/slices/food/foodSlice";

const MyOrder = () => {
  // const [orderData, setOrderData] = useState([]);
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.food.orderData)

  // const fetchOrder = async () => {

    // try {
    //   const response = await axios.post(
    //     `${URL}/api/orders/myOrder`,
    //     {
    //       email: localStorage.getItem("userEmail"),
    //     }
    //   );
    //   setOrderData(response.data);
    //   console.log("Response:", response.data)
    //   toast.success("Your Placed Orders")
    // } catch (error) {
    //   console.error("Error Fetching order:", error);
    // }
  // };

  useEffect(() => {
    dispatch(myOrderFood(localStorage.getItem("userEmail")))
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData?.products?.products
            ?.slice(0)
            .reverse()
            .map((item) =>
              item.map((arrayData) => (
                <div key={arrayData._id} className="col-12 col-md-6 col-lg-3">
                  <div
                    className="card mt-3"
                    style={{ width: "16rem", maxHeight: "360px" }}
                  >
                    {/* <img
                      src={arrayData.img}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "120px", objectFit: "fill" }}
                    /> */}
                    <div className="card-body">
                      <h5 className="card-title">{arrayData.name}</h5>
                      <div
                        className="container w-100 p-0"
                        style={{ height: "38px" }}
                      >
                        <span className="m-1">{arrayData.qty}</span>
                        <span className="m-1">{arrayData.size}</span>
                        <span className="m-1">{arrayData.Order_date}</span>
                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                          Rs{arrayData.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrder;