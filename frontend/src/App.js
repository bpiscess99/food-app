import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-night.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screens/Signup.js";
import MyOrder from "./screens/MyOrder.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from "./components/Success.js";
import Cancel from "./components/Cancel.js";
import {GoogleOAuthProvider} from "@react-oauth/google";
import OrderTracking from "./screens/OrderTracking.js";
import ChatMessage from "./screens/ChatMessage.js";
import axios from "axios"
export const URL = process.env.REACT_APP_BACKEND_SERVER;

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
          
      <Router>
      <ToastContainer/>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/cancel" element={<Cancel/>} />
            <Route path="/order-tracking" element={<OrderTracking/>} />
            <Route exact path="/openai" element={<ChatMessage/>} />
          </Routes>
          </GoogleOAuthProvider>
      </Router>
    </>
  );
}

export default App;
