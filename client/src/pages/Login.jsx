import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/authContext';


const Login = () => {
  const { login } = useGlobalContext();
  const [inputs, setInputs] = useState({
    username: "",
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
      login(inputs);
      navigate("/");
    }catch(err){
      setError(err.response.data);
    }

  }

  return (
    <div className='auth'>
      <h1>Login</h1>
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
          name='password'
          type="password" 
          placeholder='Password'
          onChange={handleChange}
          />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an acount? <Link to={"/register"}>Register</Link></span>
      </form>
    </div>
  )
}

export default Login