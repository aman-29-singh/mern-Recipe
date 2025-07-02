import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const {register} = useContext(AuthContext);// register() function that comes from useCcontext i.e AuthContext
    const navigate = useNavigate();//lets Navigate our User to Home.jsx Home page after Registration


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await register(username, email, password)
            navigate('/');//i.e Navigate to Home page after Registration
            
        } catch(error){
            console.error("Register Error:", error)
        }
    }

  return (
    <div className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form onSubmit={handleSubmit}  className='space-y-4'>
        <div>
            <label className='block text-gray-700'>Username</label>
            <input type='text' value={username} onChange={(e)=> setUsername(e.target.value)} required
            className='w-full p-2 bordert-rounded'/>
        </div>

        <div>
            <label className='block text-gray-700'>Email</label>
            <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} required
            className='w-full p-2 bordert-rounded'/>
        </div>

        <div>
            <label className='block text-gray-700'>password</label>
            <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} required
            className='w-full p-2 bordert-rounded'/>
        </div>

        <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
            Register
        </button>


      </form>
    </div>
  )
}

export default Register
