import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

export const protectCompany = async (req, res, next) => {
     const token = req.headers.token
     if (!token) {
        return res.json({ success: false, message: 'Not authorized, Login Again' })
     }

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const company = await Company.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!company) {
            return res.json({ success: false, message: 'Company not found, please login again' });
        }
        req.company = company;
        next()

     } catch (error) {
        res.json({ success: false, message: error.message })
     }
}