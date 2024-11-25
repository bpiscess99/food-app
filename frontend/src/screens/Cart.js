import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, drop } from '../redux/slices/cartSlice';
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../App';
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {

    const data = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    if (data.length === 0) {
      return (
        <div>
          <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
        </div>
      );
    }

    const handleCheckOut = async () => {
      try {
          const stripe = await loadStripe('pk_test_51NWgMnExICbPENGVQa4fSOLrdgVXUzKzTRdON9TUaVwSZejWNQLoN32tqT8OIBmucwpyKWo2bEyDyh7gQsdXbyfe00i1Lh6Juh');
          const userEmail = localStorage.getItem('userEmail');
  
          if (!userEmail) {
            console.error("User email not found in localStorage.");
            toast.error("User email not found.");
            return;
        }
  
          // Send data to backend
          const response = await axios.post(`${URL}/api/payments/stripe`, {
              products: data,
              email: userEmail,
          });
  
          // Redirect to Stripe Checkout
          const sessionId = response.data.sessionId;
          const {error} = await stripe.redirectToCheckout({
              sessionId: sessionId
          });
  
          if (error) {
              console.log("Error redirecting to checkout:", error);
              toast.error("Error redirecting to checkout:", error.message);
          } 
          
      } catch (error) { 
          console.error("Error during checkout:", error);
        toast.error("Error during checkout:", error.message);
        }
  };

    const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>

    <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
      <table className='table table-hover '>
        <thead className=' text-success fs-4'>
          <tr>
            <th scope='col' >#</th>
            <th scope='col' >Name</th>
            <th scope='col' >Quantity</th>
            <th scope='col' >Option</th>
            <th scope='col' >Amount</th>
            <th scope='col' ></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope='row' >{index + 1}</th>
              <td >{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td ><button type="button" className="btn p-0">
              <RiDeleteBinLine onClick={() => { dispatch(remove(index))}} />
              </button> </td></tr>
          ))}
        </tbody>
      </table>
      <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div>
        <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
      </div>
    </div>



  </div>
  )
}

export default Cart