import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Company from './Company.js'
import Job from './Job.js'
import User from './User.js'

const jobApplication = sequelize.define('jobApplication', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Job,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
        allowNull: false
    }
})

jobApplication.belongsTo(Company, { foreignKey: 'companyId' })
jobApplication.belongsTo(Job, { foreignKey: 'jobId' })
jobApplication.belongsTo(User, { foreignKey: 'userId' })

export default jobApplication