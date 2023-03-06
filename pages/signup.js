import { useState } from 'react';
import Router from 'next/router';


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password) {
      alert('Please enter all fields');
      return;
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        Router.push('/success');
      } else {
        alert('Error occurred during sign up');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-2/3 m-auto flex flex-col gap-3'>
      <input
        type="text"
        id="name" 
        placeholder='Name'
        value={name}
        className="lock w-full rounded-md  shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(event) => setName(event.target.value)}
      />
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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-2/12" type="submit">Sign up</button>
    </form>
  );
}
