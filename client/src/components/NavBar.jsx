import React, { useState } from 'react'
import { GiCrossMark, GiHamburgerMenu } from "react-icons/gi";
import { FaSearch, FaFileUpload  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData, setUserData } from '../redux/slices/user-slice';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(removeUserData());
        navigate('/login');
      };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <header className='h-[80px]'>
        <div className='absolute flex w-full mx-auto max-w-[1550px] justify-between items-center px-10 py-[15px] shadow-sm'>
            <Link to='/'>
                <div className='w-[60px]  items-center justify-center '>
                    <img src="/logo.png" alt="LOGO" className='rounded-2xl'/>
                </div>
            </Link>

            <button 
                onClick={toggleMenu}
                className='md:hidden text-xl z-50'
                aria-label="Toggle navigation menu"
            >
                {isMenuOpen ? <GiCrossMark /> : <GiHamburgerMenu />}
            </button>


            <div className='hidden md:flex gap-4 font-semibold justify-between items-center'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>

                {isAuthenticated ? (
                    <>
                        <Link to='/profile'>
                            Profile
                        </Link>
                        <Link to='/search'>
                            <FaSearch className='text-[24px] mx-2'/>
                        </Link>
                        <Link to='/upload'>
                            <FaFileUpload className='text-[24px] mr-3'/>
                        </Link>
                        <button onClick={handleLogout}
                        className='px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer'>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <button className='px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer'>
                                Login
                            </button>
                        </Link>
                        <Link to='/signup'>
                            <button className='px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer'>
                                Signup
                            </button>
                        </Link>
                    </>
                )}
                

            </div>
            {isMenuOpen && (
                    <div className='md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40'>
                        <div className='flex flex-col items-center gap-4 p-4'>
                            <Link to='/' className='w-full text-center py-2 hover:bg-gray-100'>
                                Home
                            </Link>
                            <Link to='/about' className='w-full text-center py-2 hover:bg-gray-100'>
                                About
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to='/profile' className='w-full text-center py-2 hover:bg-gray-100'>
                                        Profile
                                    </Link>
                                    <Link to='/search' className='w-full text-center py-2 hover:bg-gray-100'>
                                        <FaSearch className='inline-block mr-2' />
                                        Search
                                    </Link>
                                    <Link to='/upload' className='w-full text-center py-2 hover:bg-gray-100'>
                                        <FaFileUpload className='inline-block mr-2' />
                                        Upload
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className='w-full px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white'
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to='/login' 
                                        className='w-full px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white text-center'
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to='/signup' 
                                        className='w-full px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white text-center'
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
        </div>
    </header>
  )
}

export default NavBar
