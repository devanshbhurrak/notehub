import React from 'react'

const About = () => {
    return (
      <div className='min-h-screen flex flex-col lg:flex-row p-8 lg:p-16 items-center justify-center gap-12 bg-white'>
          <div className='w-full lg:w-1/2 max-w-2xl'>
              <img 
                  src="/about_image.png" 
                  alt="Collaborative learning" 
                  className='rounded-lg shadow-xl'
              />
          </div>
  
          <div className='space-y-10 lg:w-1/2 max-w-2xl'>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      Revolutionizing Knowledge Sharing
                  </h2>
                  <p className='text-gray-600'>
                      At NoteHub, we're transforming how academic resources are shared and accessed. Our platform 
                      bridges the gap between learners and educators through:
                      <ul className='mt-4 list-disc list-inside space-y-2'>
                          <li>Peer-to-peer note exchange system</li>
                          <li>AI-powered resource recommendations</li>
                          <li>Collaborative document editing tools</li>
                          <li>Quality-verified educational materials</li>
                      </ul>
                  </p>
              </div>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      Our Vision
                  </h2>
                  <p className='text-gray-600'>
                      We envision a world where quality education knows no boundaries. By creating a global 
                      network of knowledge sharing, we're breaking down barriers to educational access and 
                      fostering academic success for all.
                  </p>
              </div>
              <div>
                  <h2 className='relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-teal-500'>
                      Join Our Movement
                  </h2>
                  <p className='text-gray-600'>
                      With over 250,000 resources shared and 95% user satisfaction rate, we're building more 
                      than a platform - we're creating a global learning community. Whether you're sharing 
                      lecture notes or research papers, your contributions make education accessible to all.
                  </p>
              </div>
          </div>
      </div>
    )
  }

export default About