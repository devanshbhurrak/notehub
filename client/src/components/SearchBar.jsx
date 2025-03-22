import axios from 'axios'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import api from '../api'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');


    const user = useSelector((state) => state.user.userData)
    const username = user.userName

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
          const { data } = await api.get('/notes/getFiles', { params: { title: searchQuery } });
          setSearchResults(data.data);
          setSearchStatus(data.data.length ? 'Found' : 'Not-Found');
        } catch (error) {
          console.error('Search failed:', error);
        }
      };

      const showPDF = (fileData) => {
        // Access the URL from the file object
        window.open(fileData.url, "_blank", "noreferrer");
      };

  return (
    <div className='flex min-h-screen items-center justify-start flex-col p-4'>
        <div className='flex w-full items-center justify-center  my-12'>
            <form onSubmit={handleSearch} className='w-full max-w-[700px] rounded-xl bg-[#EEEEEE]'>
                <div className='relative flex justify-between'>
                    <FaSearch className='m-4 text-2xl '/>
                    <input 
                        type="search" 
                        placeholder='Search for Notes'
                        className='outline-none w-full p-4'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                        type='submit'
                        className='rounded-xl px-4 py-4 font-medium text-white bg-teal-600 hover:bg-teal-700 duration-200'
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>

        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                searchStatus === 'Found' && searchResults.length > 0 && searchResults.map((notes) => (
                    <div key={notes._id}
                        className='w-[290px] bg-[#F6F8D5] font-semibold flex justify-between items-center rounded-xl'
                    >
                        <p className='p-3 '>
                            <span className='font-bold'>File Name: </span>
                            <span className='font-bold'>{notes.fileName}</span>
                        </p>
                        <button 
                            type='submit'
                            onClick={() => showPDF(notes.files)}
                            className='rounded-xl px-4 py-3 font-medium text-white bg-teal-600 hover:bg-teal-700 duration-200 '
                        >
                            Show File
                        </button>
                    </div>
                ))
            }

            {
                searchStatus === 'Not-Found' && (
                    <div className='mt-4 text-center text-gray-600'>
                        No Notes Found
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default SearchBar