import axios  from "axios";
import {toast} from "react-toastify"

const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER;
const API_URL = `${BACKEND_URL}/api/users/`;


export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/   
    );
};

// Register 
const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + "register", userData,
        {withCredentials: true}
    );
    return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
            toast.toString();
        toast.error(message)
    }
};

// Login 
const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + "login", userData,
            {withCredentials: true}
        );
        return response.data;    
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
            toast.toString();
        toast.error(message)
    }
    
};

// Login With Google

const loginWithGoogle = async (userToken) => {
    try {
        const response = await axios.post(API_URL + "google/callback", userToken);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
            toast.toString();
        toast.error(message)
    }
}

const authService = {
    register,
    login,
    loginWithGoogle
}

export default authService;