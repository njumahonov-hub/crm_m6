import { Student } from "../model/student.model.js";
import { Op } from "sequelize";
Student.sync({ force: true });
export const getAllStudents = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search?.trim() ?? "";
        let whereClaus = {};
        if (search) {
            whereClaus = {
                [Op.or]: [
                    { full_name: { [Op.iLike]: `%${search}%` } },
                    { phone_number: { [Op.iLike]: `%${search}%` } },
                    { profession: { [Op.iLike]: `%${search}%` } },
                    { parent_name: { [Op.iLike]: `%${search}%` } }
                ]
            };
        }
        const { count, rows: students } = await Student.findAndCountAll({
            where: whereClaus,
            offset,
            limit,
            raw: true
        });
        const totalPage = Math.ceil(count / limit);
        res.status(200).json({
            totalPage,
            prev: page > 1 ? { page: page - 1, limit } : undefined,
            next: totalPage > page ? { page: page + 1, limit } : undefined,
            students
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const AddStudents = async (req, res, next) => {
    try {
        const { full_name, phone_number, profession, parent_name, parent_number, image_url } = req.body;
        await Student.create({ full_name, phone_number, profession, parent_name, parent_number, image_url, joined_at: new Date() });
        res.status(201).json({
            message: "Added student"
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const left_Students = async (req, res, next) => {
    try {
        const newID = Number(req.params.id);
        const foundedUser = await Student.findByPk(newID);
        if (!foundedUser) {
            return res.status(404).json({
                message: "not found"
            });
        }
        await Student.update({ left_at: new Date() }, { where: { id: newID } });
        res.status(200).json({
            message: "update student"
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const UpdateStudents = async (req, res, next) => {
    try {
        const newID = Number(req.params.id);
        const { full_name, phone_number, profession, parent_name, parent_number, image_url } = req.body;
        const foundedUser = await Student.findByPk(newID);
        if (!foundedUser) {
            return res.status(404).json({
                message: "not found"
            });
        }
        await Student.update({ full_name, phone_number, profession, parent_name, parent_number, image_url }, { where: { id: newID } });
        res.status(200).json({
            message: "update student"
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const DeleteStudents = async (req, res, next) => {
    try {
        const newID = Number(req.params.id);
        const foundedUser = await Student.findByPk(newID);
        if (!foundedUser) {
            return res.status(404).json({
                message: "not found"
            });
        }
        await Student.destroy({ where: { id: newID } });
        res.status(200).json({
            message: "delete student"
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//# sourceMappingURL=students.ctr.js.map