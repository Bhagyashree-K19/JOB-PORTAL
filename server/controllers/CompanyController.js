import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExist = await Company.findOne({ where: { email } });
    if (companyExist) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });
    res.json({
      success: true,
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company.id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, company.password);

    if (isMatch) {
      res.json({
        success: true,
        company: {
          id: company.id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company.id),
      });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company.id;

  try {
    const newJob = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      companyId,
      date: Date.now(),
      level,
      category,
    });

    res.json({ success: true, message: "Job Posted Successfully", newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company.id;

    const applications = await JobApplication.findAll({
      where: { companyId },
      include: [
        {
          model: User,
          attributes: ["name", "image", "resume"],
        },
        {
          model: Job,
          attributes: ["title", "location", "category", "level", "salary"],
        },
      ],
    });

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get company posted job list
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company.id;
    const jobs = await Job.findAll({ where: { companyId } });

    //adding no.of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.count({
          where: { jobId: job.id },
        });
        const plainJob = job.get({ plain: true });
        return {
          ...plainJob,
          applicants: applicants,
        };
      }),
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job application status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    //find job application and update status
    const application = await JobApplication.findByPk(id)

    if (!application) {
      return res.json({ success: false, message: "Application not found" });
    }

    application.status = status
    await application.save()

    res.json({ success: true, message: "Status Changed" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company.id;

    const job = await Job.findByPk(id);

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    if (companyId === job.companyId) {
      job.visible = !job.visible;
      await job.save();
    }

    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
