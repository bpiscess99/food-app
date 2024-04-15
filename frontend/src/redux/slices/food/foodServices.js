import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/orders/`;

// My order food 
const myOrderFood = async (email) => {
   const response = await axios.get(API_URL + email);
   return response.data
}



const foodService = {
    myOrderFood
}

export default foodService;