import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER;
const API_URL = `${BACKEND_URL}/api/orders/`;

console.log("BACKEND_URL:", BACKEND_URL)
console.log("API_URL:", API_URL)

// My order food 
const myOrderFood = async (email) => {
   const response = await axios.post(API_URL + "myOrder", {email});
    // console.log("response", response)
    return response.data
}



const foodService = {
    myOrderFood
}

export default foodService;