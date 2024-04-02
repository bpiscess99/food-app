import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { drop } from '../redux/slices/cartSlice';


const Success = () => {
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // if (data.length === 0) {
  //   return (
  //     <div>
  //       <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
  //     </div>
  //   );
  // }

  const saveProduct = async() => {
    try {
                const userEmail = localStorage.getItem("userEmail");
                // console.log("User Email:", userEmail); 
                const response = await axios.post(`${URL}/api/orders/foodData`, {
                  order_data: data,
                  email: userEmail,
                  order_date: new Date().toDateString()
                }); 
                console.log("Order Saved:", response.data);
                toast.success("Order Placed");
                if (response.status === 200) {
                  dispatch(drop());
                }
              } catch (error) {
                console.log(error);
              } 
  }

  useEffect(() => {
    saveProduct()
  }, [])
  
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