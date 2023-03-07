import Router from 'next/router';
import React from 'react'
import { useState } from 'react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      alert('Please enter all fields');
      return;
    }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password }),
      });
      if (response.ok) {
        
     response.json().then((res)=> {
      console.log(res.status);
      if(res.status == 0) Router.push('/dashboard');
      else alert('email or password is incorrect');
     });
      
      } else {
        alert('Error occurred during sign up');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder='Email'
          value={email}
          className="lock w-full rounded-md  shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder='Password'
          value={password}
          className="lock w-full rounded-md  shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/12" type="submit">Login</button>
      </form>
    </div>
  )
}
