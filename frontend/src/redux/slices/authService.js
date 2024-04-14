import axios  from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER;
const API_URL = `${BACKEND_URL}/api/users/`;


export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/   
    );
};

// Register 
const register = async (userData) => {
 const response = await axios.post(API_URL + "register", userData,
{withCredentials: true}
);
return response.data
};

// Login 
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)
    return response.data;
};

// Login With Google

const loginWithGoogle = async (userToken) => {
    const response = await axios.post(API_URL + "google/callback", userToken);
    return response.data;
}

const authService = {
    register,
    login,
    loginWithGoogle
}

export default authService;