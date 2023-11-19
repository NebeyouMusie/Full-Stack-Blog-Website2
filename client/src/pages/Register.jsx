import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev =>{
      return {...prev, [e.target.name]: e.target.value}
    } );
  }

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    }catch(err){
      setError(err.response.data);
    }

  }

  // console.log(inputs);

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input 
          required 
          name='username'
          type="text" 
          placeholder='Username'
          onChange={handleChange}
          />
        <input 
          required 
          name='email'
          type="email" 
          placeholder='Email'
          onChange={handleChange}
          />
        <input 
          required 
          name='password'
          type="password" 
          placeholder='Password'
          onChange={handleChange}
          />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Do you have an acount? <Link to={"/login"}>Login</Link></span>
      </form>
    </div>
  )
}

export default Register