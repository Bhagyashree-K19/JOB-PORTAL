import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
     
    <div className='container mx-auto p-4'>
       <div className='overflow-x-auto'>
         <table className='w-full max-w-4xl bg-white border border-gray-100 rounded-lg'>
          <thead>
            <tr className='border-b border-gray-100 text-left'>
              <th className='px-4 py-3 font-semibold text-center'>#</th>
              <th className='px-4 py-3 font-semibold text-left'>User name</th>
              <th className='px-4 py-3 font-semibold text-left max-sm:hidden'>Job Title</th>
              <th className='px-4 py-3 font-semibold text-left max-sm:hidden'>Location</th>
              <th className='px-4 py-3 font-semibold text-center'>Resume</th>
              <th className='px-4 py-3 font-semibold text-center'>Action</th>
            </tr>
          </thead>

          <tbody>
             {viewApplicationsPageData.map((applicant, index)=>(
              <tr key={index} className='text-gray-700 border-b border-gray-100'>
                <td className='py-2 px-4 text-center'>{index+1}</td>
                <td className='py-2 px-4 flex items-center gap-3'>
                  <img className='w-10 h-10 rounded-full max-sm:hidden' src={applicant.imgSrc} alt="" />
                  <span>{applicant.name}</span>
                </td>
                <td className='py-2 px-4 max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-2 px-4 max-sm:hidden'>{applicant.location}</td>
                <td className='py-2 px-4 text-center'>
                  <a href="" target='_blank' rel='noreferrer' className='bg-blue-50 text-blue-400 py-1 border inline-flex gap-2 items-center rounded '>
                    Resume <img className='w-4' src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-4 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button px-3 py-1'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-8 w-32 bg-white rounded border border-gray-200 group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
             ))}
          </tbody>

         </table>
       </div>
    </div>

  )
}

export default ViewApplications
