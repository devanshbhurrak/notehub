import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setUserData } from '../redux/slices/user-slice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import api from '../api'

function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('');

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const loginUser = async(e) => {
    try {
      e.preventDefault();
      const { data } = await api.post('/auth/login', {
        userEmail,
        userPassword
      });
  
      // Save token and user data
      dispatch(setUserData({
        ...data.user,
        token: data.token
      }));
      navigate('/');
  
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 
                          'Login failed. Check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err.message);
    }
  }

  return (
    <div className='h-[80vh] flex items-center justify-center p-5 w-full'>
      <form onSubmit={loginUser} className='w-full space-y-5 shadow-xl p-8 max-w-[550px] rounded-xl'>
      <h1 className='font-bold text-2xl text-center'>Login</h1>
      {error && (
        <div className="text-red-500 text-center text-sm p-2 bg-red-100 rounded-lg">
          ⚠️ {error}
        </div>
      )}
        <div className='space-y-6'>
          <div className=''>
            <label className='font-bold' htmlFor='userEmail'>Email</label>
            <input 
                  type="email"
                  id='userEmail'
                  name='userEmail'
                  placeholder='youremail@example.com'
                  required
                  onChange={(e) => setUserEmail(e.target.value)}
                  className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
              />
          </div>
          <div className=''>
            <label className='font-bold' htmlFor='userPassword'>Password</label>
            <input 
                  id='userPassword'
                  name='userPassword'
                  type="password"
                  placeholder='*********'
                  required
                  onChange={(e) => setUserPassword(e.target.value)}
                  className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
              />
          </div>

          <button type='submit' className='px-5 w-full py-2 rounded-xl font-semibold bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer'>
            Submit
          </button>

          <div className="text-sm text-gray-600">
              New to NoteHub?{" "}
              <Link to="/signup" className="font-bold text-teal-500 hover:underline">
                  Signup
              </Link>
          </div>
        </div>
        
      </form>
    </div>
  )
}

export default Login