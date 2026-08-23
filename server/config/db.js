import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import * as Sentry from '@sentry/node'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false   // set true if you want to see every SQL query in console
  }
)

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ MySQL connected successfully')
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error.message)
    Sentry.captureException(error)   // 👈 reports this error to your Sentry dashboard
  }
}

export default sequelize