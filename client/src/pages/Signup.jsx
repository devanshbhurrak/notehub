import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [profilePreviewImage, setProfilePreviewImage] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const registerUser = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('userBio', userBio)
            formData.append('userEmail', userEmail)
            formData.append('userMobile', userMobile)
            formData.append('userName', userName)
            formData.append('userPassword', userPassword)
            formData.append('profileImage', profileImage)

            const result = await axios.post(
                'http://localhost:6969/auth/signup',
                 formData,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                 }
            )
            setLoading(false);
            console.log('Data: ', result)
            alert('User Entry saved in Database')
            navigate('/login')
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message;
            setError(errorMessage);
            console.error('Login error:', err.response?.data || err.message);
          }
        }

  return (
    <div className='flex items-center justify-center p-5 w-full'>
      <form onSubmit={registerUser} className='w-full space-y-5 shadow-xl p-8 max-w-[550px] rounded-xl'>
        <h1 className='font-bold text-2xl text-center'>Register</h1>

        <div className='space-y-5' >
            <div className='flex justify-between gap-4'>
                <div className=''>
                    <label className='font-bold' htmlFor='firstName'>Frist Name</label>
                    <input 
                        type="text"
                        id='firstName'
                        name='firstName'
                        placeholder='first name'
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
                    />
                </div>
                <div className=''>
                    <label className='font-bold' htmlFor='lastName'>Last Name</label>
                    <input 
                        type="text"
                        id='lastName'
                        name='lastName'
                        placeholder='last name'
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
                    />
                </div>
            </div>

            <div className=''>
                <label className='font-bold' htmlFor='userBio'>Bio</label>
                <textarea 
                    id='userBio'
                    name='userBio'
                    rows='3'
                    type="text"
                    placeholder='Tell us something about yourself'
                    required
                    onChange={(e) => setUserBio(e.target.value)}
                    className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
                />
            </div>
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
                <label className='font-bold' htmlFor='userMobile'>Mobile Number</label>
                <input 
                    type="tel"
                    id='userMobile'
                    name='userMobile'
                    placeholder='00000 00000'
                    required
                    onChange={(e) => setUserMobile(e.target.value)}
                    className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE] focus:ring focus:ring-teal-500'
                />
            </div>
            <div className=''>
                <label className='font-bold' htmlFor='userName'>Username</label>
                <input 
                    id='userName'
                    name='userName'
                    type="text"
                    placeholder='username'
                    required
                    onChange={(e) => setUserName(e.target.value)}
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

            <div className="flex w-full flex-col items-center justify-center">
                <div className="mb-4 grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black">
                    
                    {profilePreviewImage == "" ? (
                    <p className="text-sm font-bold text-gray-500">Profile Image</p>
                    ) : (
                    <img src={profilePreviewImage} alt="" className="" />
                    )}
                </div>
                <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                        className="mb-4 h-8 w-8 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2 "
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                        Click to Upload your profile image
                        </span>
                    </p>
                    <input
                        type="file"
                        placeholder="File"
                        accept="application/png"
                        required
                        id="dropzone-file"
                        onChange={(e) => {
                        setProfilePreviewImage(
                            URL.createObjectURL(e.target.files[0]),
                        );
                        setProfileImage(e.target.files[0]);
                        }}
                        className="hidden"
                    />
                    </div>
                </label>
            </div>

            <button className="rounded-lg w-full bg-teal-500 px-5 py-2 font-bold text-white hover:bg-teal-600">
                {loading ? 'Please wait...' : 'Register'}
            </button>
            <div className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-teal-500 hover:underline">
                    Login
                </Link>
            </div>
            {error && (
                <div className="text-red-500 text-center text-sm p-2 bg-red-100 rounded-lg">
                ⚠️ {error}
                </div>
            )}
        </div>
      </form>
    </div>
  )
}

export default Signup