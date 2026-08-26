import Job from "../models/Job.js"
import Company from '../models/Company.js'


//get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { visible: true },
            include: {
                model: Company,
                attributes: { exclude: ['password'] }
            }
        })

        res.json({ success: true, jobs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get a single job by id
export const getJobById = async(req,res) => {
   try {
      const {id} = req.params
      const job = await Job.findByPk(id, {
            include: {
                model: Company,
                attributes: { exclude: ['password'] }
            }
        })

        if (!job) {
            return  res.json({ success: false, message: "Job not found" })
        }

         res.json({ success: true, job})
   } catch (error) {
        res.json({ success: false, message: error.message })
   }
}