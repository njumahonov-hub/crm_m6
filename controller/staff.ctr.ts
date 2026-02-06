
import type { NextFunction, Request, Response } from "express"
import { Op } from "sequelize"
import sequelize from "../config/config.js"
import type { StaffCreateDto, StaffUpdateDto } from "../dto/staff.dto.js"
import { Staff } from "../model/assocation.js"



Staff.sync({force:false})

export const getAllStaffs = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const offset = (page - 1) * limit

        const search = (req.query.search as string)?.trim() ?? ""

        let whereClaus = {}

        if(search){
            whereClaus = {
                [Op.or]: [
                    {full_name: {[Op.iLike]: `%${search}%`}},
                    {phone_number: {[Op.iLike]: `%${search}%`}},
                    {profession: {[Op.iLike]: `%${search}%`}},
                ]
            }
        }

        const {count, rows: staffs} = await Staff.findAndCountAll({
            where: whereClaus,
            offset,
            limit,
            raw: true
        })


    const totalPage = Math.ceil(count/limit)


        res.status(200).json({
            totalPage,
            prev: page > 1 ? {page: page -1, limit}: undefined,
            next: totalPage > page ? {page: page + 1, limit}: undefined,
            staffs
        })
     
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const AddStuff = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {full_name, phone_number, profession, image_url} = req.body as StaffCreateDto
        await Staff.create({full_name, phone_number, profession, image_url } )

        res.status(201).json({
            message: "Added staff"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const UpdateStaff= async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newID = Number(req.params.id )

    
        const {full_name, phone_number, profession, image_url} = req.body as StaffUpdateDto

       
        const foundedUser = await Staff.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Staff.update({full_name, phone_number, profession,  image_url}, {where:{id: newID}})

        res.status(200).json({
            message: "update staff"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const DeleteStuff = async (req:Request, res:Response, next:NextFunction) => {
    try {
         const newID = Number(req.params.id )

       
        const foundedUser = await Staff.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Staff.destroy({where:{id: newID}})

        res.status(200).json({
            message: "delete staff"
        })

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}



