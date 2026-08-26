import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Company from './Company.js'

const Job = sequelize.define('Job', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    }
})
Job.belongsTo(Company, { foreignKey: 'companyId'});

export default Job