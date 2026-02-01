import { Student } from "../model/student.model.js";
Student.sync({ force: false });
export const getAllStudents = async (req, res, next) => {
    try {
        const student = await Student.findAll();
        res.status(200).json(student);
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
        await Student.create({ full_name, phone_number, profession, parent_name, parent_number, image_url });
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