import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ""
}

const JobCard = ({ job }) => {

  const navigate = useNavigate()
  return (
    <div className='border border-gray-300 p-6 shadow rounded-lg flex flex-col justify-between h-full'>
      <div className='flex justify-between items-center'>
        <img className='h-8 w-auto object-contain' src={job.Company?.image} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>
        {job.title}
      </h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
          {job.location}
        </span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
          {job.level}
        </span>
      </div>
      <p className='text-gray-500 line-clamp-3 text-sm mt-4'>
        {stripHtml(job.description).slice(0, 150)}
      </p>
      <div className='mt-4 flex gap-4 text-sm'>
        <button onClick={() => { navigate(`/apply-job/${job.id || job._id}`); scrollTo(0, 0) }} className='bg-blue-600 text-white px-4 py-2 rounded'>
          Apply now
        </button>
        <button onClick={() => { navigate(`/apply-job/${job.id || job._id}`); scrollTo(0, 0) }} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard