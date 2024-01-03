import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify' 

const initialState = {
    name: '',
    email: '',
    password: '',
    location: ''
}
const Signup = () => {

  const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState);
    const{name, email, password, location} = formData;

     const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
     };

   const handleSubmit = async(e) => {
   e.preventDefault();

   try {
    const response = await axios.post("http://localhost:5000/api/users/register", formData)
    console.log("Registered Successfully", response.data)
    toast.success("Registered Successfully")
    navigate("/login")
   } catch (error) {
    console.log(error);
   }
   };

  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputName1" className="form-label">Name</label>
    <input type="text" 
    className="form-control"
    name='name'
    value={name}
    onChange={handleChange}
    />
  </div>      
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" 
    className="form-control" 
    id="exampleInputEmail1" 
    aria-describedby="emailHelp"
    name='email'
    value={email}
    onChange={handleChange}
    />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"
     className="form-control"
     id="exampleInputPassword1"
     name='password'
     value={password}
     onChange={handleChange}
     />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text"
     className="form-control"
     id="exampleInputLocation1"
     name='location'
     value={location}
     onChange={handleChange}
     />
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
</form>
</div>
    </>
  )
}

export default Signup