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
  
    // const saveProduct = async () => {
    //   try {
    //     const userEmail = localStorage.getItem("userEmail");
    //     // console.log("User Email:", userEmail); 
    //     const response = await axios.post(`${URL}/api/orders/foodData`, {
    //       order_data: data,
    //       email: userEmail,
    //       order_date: new Date().toDateString()
    //     }); 
    //     console.log("Order Saved:", response.data);
    //     toast.success("Order Placed");
    //     if (response.status === 200) {
    //       dispatch(drop());
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }             
    // }


  //   const handleCheckOut = async () => {

  //      // Load Stripe
  //     const stripe = await loadStripe('pk_test_51NWgMnExICbPENGVQa4fSOLrdgVXUzKzTRdON9TUaVwSZejWNQLoN32tqT8OIBmucwpyKWo2bEyDyh7gQsdXbyfe00i1Lh6Juh');
  //     try {
  //      // Get user email from localStorage
  //       const userEmail = localStorage.getItem('userEmail');
  //         // Create checkout session
  //       const response = await axios.post(`${URL}/api/payment/create-checkout-session`,{
  //         products: data,
  //         email: userEmail,
  //         order_date: new Date().toDateString()
  //       });
  //       // Get session ID from response
  //       const sessionId = response.data.sessionId;
  //       // Redirect to Stripe checkout
  //       const {error} = await stripe.redirectToCheckout({
  //         sessionId: sessionId // this session.id will come from backend API
  //       });
  //       if(error){
  //         console.log("Error redirecting to checkout:", error)
  //         toast.error("Error redirecting to checkout:", error)
  //       }else{
  //         saveProduct(data)
  //       } 
  // } catch (error) {
  //       console.log(error)
  //       toast.error("Error redirecting to checkout:", error)
  //     }
  //   };
    

  const handleCheckOut = async () => {
       try {
        const stripe = await loadStripe('pk_test_51NWgMnExICbPENGVQa4fSOLrdgVXUzKzTRdON9TUaVwSZejWNQLoN32tqT8OIBmucwpyKWo2bEyDyh7gQsdXbyfe00i1Lh6Juh');
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.post(`${URL}/api/payment/create-checkout-session`,{
          products: data,
          email: userEmail,
          orderDate: new Date().toDateString()
        });
        const sessionId = response.data.sessionId;
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId // this sessionId will come from backend API
        });
        if(result.error){
          console.log("Error redirecting to checkout:", result.error)
          toast.error("Error redirecting to checkout:", result.error)
        }
      } catch (error) {
                console.log(error)
                toast.error("Error redirecting to checkout:", error)
                
              }
                   
              }

    //  const handleCheckOut = async () => {
    //    try {
    //     const stripe = await loadStripe('pk_test_51NWgMnExICbPENGVQa4fSOLrdgVXUzKzTRdON9TUaVwSZejWNQLoN32tqT8OIBmucwpyKWo2bEyDyh7gQsdXbyfe00i1Lh6Juh');
    //     const userEmail = localStorage.getItem('userEmail');
    //     const response = await axios.post(`${URL}/api/payment/create-checkout-session`,{
    //       products: data,
    //       email: userEmail,
    //       orderDate: new Date().toDateString()
    //     });
    //     const sessionId = response.data.sessionId;
    //     const result = await stripe.redirectToCheckout({
    //       sessionId: sessionId // this sessionId will come from backend API
    //     });
    //     if(result.error){
    //       console.log("Error redirecting to checkout:", result.error)
    //       toast.error("Error redirecting to checkout:", result.error)
    //       return;
    //     }else{
    //       try {
    //         console.log("Redirect to Stripe checkout successfully")
    //         console.log("Saving Order....")
    //         const userEmail = localStorage.getItem("userEmail");
    //         // console.log("User Email:", userEmail); 
    //         const savedResponse = await axios.post(`${URL}/api/orders/foodData`, 
    //         {
    //           products: data,
    //           email: userEmail,
    //           orderDate: new Date().toDateString()
    //         }); 
            
    //         console.log("Order Saved:", savedResponse.data);
    //         toast.success("Order Placed");

    //         if (savedResponse.status === 200) {
    //           dispatch(drop());
    //         }
    //       } catch (error) {
    //         console.log(error)
    //         toast.error("Saved Product error:", error)
    //       }
    //     }
       
    //       } catch (error) {
    //         console.log(error)
    //         toast.error("Error redirecting to checkout:", error)
            
    //       }
               
    //       }
    
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
            <tr>
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