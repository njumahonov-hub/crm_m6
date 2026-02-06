import { Group } from "./group.model.js";
import { Staff } from "./staff.model.js";
import { Student } from "./student.model.js";
import { Teacher } from "./teacher.model.js";

// Teacher
Staff.hasMany(Teacher, {foreignKey: "added_by", as: "fk_added_by"})
Teacher.belongsTo(Staff, {foreignKey: "added_by", as: "fk_added_by_belongs"})

// Group
Staff.hasMany(Group, {foreignKey: "added_by", as: "fk_added_by_Group"})
Group.belongsTo(Staff, {foreignKey: "added_by", as: "fk_added_by_group_belongs"})

Teacher.hasMany(Group, {foreignKey: "teacher_id", as: "fk_teacher_id_Group"})
Group.belongsTo(Teacher, {foreignKey: "teacher_id", as: "fk_teacher_id_belongs"})

// student 
Staff.hasMany(Student, {foreignKey: "added_by", as: "fk_added_by_student"})
Student.hasMany(Staff, {foreignKey: "added_by", as: "fk_added_by_student_belongs"})

Group.hasMany(Student, {foreignKey: "group_id", as: "fk_group_id_student"})
Student.hasMany(Group, {foreignKey: "group_id", as: "fk_groupo_id_belongs"})

export {Staff, Teacher, Group, Student}