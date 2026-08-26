import jobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import {v2 as cloudinary} from 'cloudinary'
import { clerkClient } from '@clerk/express'

//get user data
export const getUserData = async (req, res) => {
  const { userId } = req.auth();
  console.log('userId:', userId)

  try {
    let user = await User.findByPk(userId);

    if (!user) {
      // User doesn't exist yet in MySQL — fetch their info from Clerk and create them
      const clerkUser = await clerkClient.users.getUser(userId)

      user = await User.create({
        id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName + " " + clerkUser.lastName,
        image: clerkUser.imageUrl,
        resume: ''
      })
    }

    return res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId } = req.auth();

  try {
    const isAlreadyApplied = await jobApplication.findOne({
      where: { jobId, userId },
    });
    if (isAlreadyApplied) {
      return res.json({ success: false, message: "Already applied" });
    }

    const jobData = await Job.findByPk(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await jobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

//get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const { userId } = req.auth();

    const applications = await jobApplication.findAll({
      where: { userId },
      include: [
        {
          model: Company,
          attributes: ["name", "email", "image"],
        },
        {
          model: Job,
          attributes: [
            "title",
            "description",
            "location",
            "category",
            "level",
            "salary",
          ],
        },
      ],
    });

    if (!applications) {
        return res.json({ success: false, message: "No job applications found for this user" });
    }
    res.json({ success: true, applications });

  } catch (error) {
        res.json({ success: false, message: error.message });
  }
};

//update user profile(resume)
export const updateUserResume = async (req, res) => {
     try {
        const { userId } = req.auth()
        const resumeFile = req.file

        const userData = await User.findByPk(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()
        return res.json({ success: true, message: "Resume updated"});
     } catch (error) {
          res.json({ success: false, message: error.message });
     }
};