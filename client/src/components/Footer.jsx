import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
      <footer className='flex justify-center items-center p-16 bg-gray-50'>
          <div className='flex w-full flex-col gap-10 lg:flex-row justify-evenly max-w-7xl'>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      About NoteHub
                  </h2>
                  <p className='text-gray-600 max-w-lg'>
                      NoteHub is a collaborative academic platform empowering students and educators worldwide 
                      to share knowledge seamlessly. Founded in 2023, we've grown into a community of 50,000+ 
                      active users sharing educational resources across 120+ disciplines.
                  </p>
              </div>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      Quick Links
                  </h2>
                  <ul className='text-gray-600 space-y-2'>
                      <li className='mb-1 hover:text-teal-600 transition-colors'>
                          <Link to='/about'>Our Story</Link>
                      </li>
                      <li className='mb-1 hover:text-teal-600 transition-colors'>
                          <Link to='/faq'>Help Center</Link>
                      </li>
                      <li className='mb-1 hover:text-teal-600 transition-colors'>
                          <Link to='/blog'>Blog</Link>
                      </li>
                      <li className='mb-1 hover:text-teal-600 transition-colors'>
                          <Link to='/privacy'>Privacy Policy</Link>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      Contact Us
                  </h2>
                  <ul className='text-gray-600 space-y-2'>
                      <li className='mb-1'>
                          📞 +1 (555) 123-4567
                      </li>
                      <li className='mb-1'>
                          📧 support@notehub.com
                      </li>
                      <li className='mb-1'>
                          🏢 123 Academia Street<br/>
                          Boston, MA 02115
                      </li>
                  </ul>
              </div>
          </div>
      </footer>
    )
  }

export default Footer