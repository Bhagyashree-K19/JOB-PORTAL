import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);

  //function to fetch company job applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to update job applications status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } },
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? applicants.length === 0 ? (
    <div className="flex items-center justify-center h-[70vh]">
    <p className="text-xl sm:text-2xl">No Applications Available</p>
  </div>
  ) : (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-white max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">User name</th>
              <th className="px-4 py-2 text-left max-sm:hidden">Job Title</th>
              <th className="px-4 py-2 text-left max-sm:hidden">Location</th>
              <th className="px-4 py-2 text-left">Resume</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index} className="text-gray-700 ">
                <td className="py-2 px-4 border-b border-gray-100 text-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-100 text-center flex ">
                  <img
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                    src={applicant.User?.image}
                    alt=""
                  />
                  <span>{applicant.User?.name}</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-100 max-sm:hidden">
                  {applicant.Job?.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-100 max-sm:hidden">
                  {applicant.Job?.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-100 text-center">
                  <a
                    href={applicant.User?.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 text-blue-400 py-1 px-3  inline-flex gap-2 items-center rounded "
                  >
                    Resume{" "}
                    <img
                      className="w-4"
                      src={assets.resume_download_icon}
                      alt=""
                    />
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-100 relative">
                  {applicant.status === "Pending"
                    ? <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button">...</button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-full pt-2 w-20 group-hover:block">
                      <div className="bg-white rounded border border-gray-200 shadow">
                        <button
                          onClick={() =>
                            changeJobApplicationStatus(applicant.id, "Accepted")
                          }
                          className="block w-full text-left px-3 py-1 text-blue-500 hover:bg-gray-100"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            changeJobApplicationStatus(applicant.id, "Rejected")
                          }
                          className="block w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                  : 
                  <div>{applicant.status}</div>
                  
                  } 
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
};

export default ViewApplications;
