import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { validateEmail } from "../redux/slices/authService";
import {useDispatch} from "react-redux";
import { login, loginWithGoogle } from "../redux/slices/cartSlice";
import {GoogleLogin} from "@react-oauth/google"
import FacebookLogin from "./FacebookLogin";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;


    const handleChange = (e) => {
      const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      return toast.error("All fields are required")
    }

    if(!validateEmail){
      toast.error("Please enter a valid email")
    }

    const userData = {
      email, 
      password
    }
   
    await dispatch(login(userData));
    toast.success("login successfully")
    navigate("/")
    };

    const googleLogin = async(credentialResponse) => {
      console.log(credentialResponse)
    const response =  await dispatch(
        loginWithGoogle({userToken: credentialResponse.credential})
      )
      // console.log("Dispatch Response:", response)

      localStorage.setItem("userEmail", response.payload.email)
      localStorage.setItem("token", response.payload.token)
      navigate("/")   
    };
  
  return (
    <>
      <div className="container">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/register" className="m-3 btn btn-danger">Register</Link>
        </form>
        <div style={{width: "100px", margin: "5px"}}>
          <GoogleLogin
          onSuccess={googleLogin}
          onError={() => {
            console.log("Login Failed");
            toast.error("Login Failed");
          }}
          useOneTap
          />
        </div>
          <FacebookLogin/>

      </div>
    </>
  );
};

export default Login;