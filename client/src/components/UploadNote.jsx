import React, { useState } from 'react';
import api from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UploadNote = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.userData);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tags', tags);
      formData.append('file', file);
      formData.append('userId', user._id);

      const { data } = await api.post('/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload successful:', data);
      setLoading(false)
      alert('File uploaded successfully!');
      navigate('/');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      alert('Upload failed. Please try again.');
    }
  };



  return (
    <form onSubmit={handleUpload} className='flex flex-col items-center mx-auto p-5 max-w-[770px] mt-5 shadow-lg rounded-md'>
        <h1 className='text-2xl font-black mt-5 '>Upload Your Notes</h1>
        <div className='w-full my-10 space-y-5 max-w-[550px]'>
            <input 
                type="text"
                placeholder='Title'
                required
                onChange={(e) => setTitle(e.target.value)}
                className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE]'
            />
            <input 
                type="text"
                placeholder='Description'
                required
                onChange={(e) => setDescription(e.target.value)}
                className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE]'
            />
            <input 
                type="text"
                placeholder='Tags'
                required
                onChange={(e) => setTags(e.target.value)}
                className='rounded-lg border border-gray-300 outline-none text-sm p-3 max-w-550px w-full bg-[#EEEEEE]'
            />
        </div>
        <div className="flex w-full max-w-[550px] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100  "
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
              <span className="font-semibold">Click to Upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PDF</p>
            <input
              type="file"
              placeholder="File"
              accept="application/pdf"
              required
              id="dropzone-file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </div>
        </label>
      </div>
      <button type='submit' className="my-5 w-full max-w-[550px] rounded-xl bg-teal-500 py-3 font-bold text-white hover:bg-teal-600 duration-200">
        {loading ? 'Uploading...' : 'Submit'}
      </button>

    </form>
  )
}

export default UploadNote