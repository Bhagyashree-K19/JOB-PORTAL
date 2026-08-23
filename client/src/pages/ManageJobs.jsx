import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import {Navigate, useNavigate} from 'react-router-dom'

const ManageJobs = () => {

  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="px-4 py-3 font-semibold text-center max-sm:hidden">
                #
              </th>
              <th className="px-4 py-3 font-semibold text-left">Job Title</th>
              <th className="px-4 py-3 font-semibold text-left max-sm:hidden">
                Date
              </th>
              <th className="px-4 py-3 font-semibold text-left max-sm:hidden">
                Location
              </th>
              <th className="px-4 py-3 font-semibold text-center">
                Applicants
              </th>
              <th className="px-4 py-3 font-semibold text-center">Visible</th>
            </tr>
          </thead>

          <tbody>
            {manageJobsData.map((job, index) => (
              <tr
                key={index}
                className="text-gray-700 border-b border-gray-100"
              >
                <td className="px-4 py-2 text-center max-sm:hidden">
                  {index + 1}
                </td>
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2 max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="px-4 py-2 max-sm:hidden">{job.location}</td>
                <td className="px-4 py-2 text-center">{job.applicants}</td>
                <td className="px-4 py-2 text-center">
                  <input className="scale-125 cursor-pointer" type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <div className="mt-4 flex justify-end">
        <button onClick={()=>navigate('/dashboard/add-job')} className="bg-black text-white py-2 px-4 rounded">Add new job</button>
       </div>

    </div>
  );
};
<div className='container mx-auto p-4'>
  <div className='overflow-x-auto'>
    <table className='w-full max-w-4xl bg-white border border-gray-200 rounded-lg'>
      <thead>
        <tr className='border-b border-gray-200 text-left'>
          <th className='px-4 py-3 font-semibold text-center max-sm:hidden'>#</th>
          <th className='px-4 py-3 font-semibold text-left'>Job Title</th>
          <th className='px-4 py-3 font-semibold text-left max-sm:hidden'>Date</th>
          <th className='px-4 py-3 font-semibold text-left max-sm:hidden'>Location</th>
          <th className='px-4 py-3 font-semibold text-center'>Applicants</th>
          <th className='px-4 py-3 font-semibold text-center'>Visible</th>
        </tr>
      </thead>

      <tbody>
        {manageJobsData.map((job, index) => (
          <tr key={index} className='text-gray-700 border-b border-gray-100'>
            <td className='px-4 py-2 text-center max-sm:hidden'>{index + 1}</td>
            <td className='px-4 py-2'>{job.title}</td>
            <td className='px-4 py-2 max-sm:hidden'>{moment(job.date).format('ll')}</td>
            <td className='px-4 py-2 max-sm:hidden'>{job.location}</td>
            <td className='px-4 py-2 text-center'>{job.applicants}</td>
            <td className='px-4 py-2 text-center'>
              <input className='scale-125 cursor-pointer' type="checkbox" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
export default ManageJobs;
