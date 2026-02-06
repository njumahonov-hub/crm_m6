
import {DataTypes, Model} from "sequelize"
import sequelize from "../config/config.js"
import { GroupEnum } from "../enum/group.enum.js";

export class Group extends Model {
    title?: string;
    days?: string;
    time?: string;
    image_url?: string;
   added_by?: number;
   teacher_id?: number
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
     title: {
        type: DataTypes.STRING,
        allowNull: false
    },
     days: {
        type: DataTypes.ENUM(...Object.values(GroupEnum)),
        allowNull: false
    },
     time: {
        type: DataTypes.STRING,
        allowNull: false
    },
     image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    added_by: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "staff",
            key: "id"
        }
    },
    teacher_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "teacher",
            key: "id"
        }
    },
},
{
    tableName: "groups",
    timestamps: true,
    sequelize
})

