
import {DataTypes, Model} from "sequelize"
import sequelize from "../config/config.js"

export class Attendance extends Model {
    student_id?: number;
    group_id?: number;
    present?: boolean;
    reason?: string;
   
}

Attendance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
     student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "students",
            key: "id"
        }
    },
     group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "groups",
            key: "id"
        }
    },
     present: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
     reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    tableName: "attendances",
    timestamps: true,
    sequelize
})

