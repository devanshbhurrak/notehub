import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="min-h-[90vh] relative flex-col">
      <div 
        className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat opacity-30"
        aria-hidden="true" 
      ></div>

      <div className="relative z-10 p-8 text-center max-w-[860px] mx-auto pt-30">
        <h1 className="text-5xl font-bold text-[#27445D] md:text-6xl mb-8">NoteHub</h1>
        <p className="m-14 text-[#015551] text-xl md:text-xl leading-relaxed">
          Your collaborative platform for sharing and discovering academic resources. Whether you're exchanging lecture notes, 
          research papers, or study guides, our community-driven space helps you:
          
          <ul className="mt-6 text-left list-disc text-lg list-inside space-y-3">
            <li>Organize and share educational materials with peers</li>
            <li>Discover high-quality resources across disciplines</li>
            <li>Collaborate on projects with version-controlled documents</li>
            <li>Connect with students and educators worldwide</li>
          </ul>

          <p className="mt-8 font-semibold">
            Join thousands of learners and educators in building the ultimate knowledge repository. 
            Your next breakthrough study resource is just a click away!
          </p>
        </p>
        {isAuthenticated ? (
          <Link to='/search'>
              <button className='px-8 py-3 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer text-lg'>
                  Explore Resources Now →
              </button>
          </Link>
        ) : (
          <div className='space-x-6 space-y-4 md:space-y-0 font-semibold'>
              <Link to='/login'>
                  <button className='px-8 py-3 rounded-xl bg-teal-500 hover:bg-teal-700 duration-200 text-white cursor-pointer text-lg'>
                      Join Our Community
                  </button>
              </Link>
              <span className="hidden md:inline-block text-teal-100">|</span>
              <Link to='/signup'>
                  <button className='px-8 py-3 rounded-xl border-2 border-teal-500 text-teal-500 hover:bg-teal-50 duration-200 cursor-pointer text-lg'>
                      Start Sharing
                  </button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;