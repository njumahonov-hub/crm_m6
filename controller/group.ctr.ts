
import type { NextFunction, Request, Response } from "express"
import { Op } from "sequelize"
import sequelize from "../config/config.js"
import type { GroupCreateDto, GroupUpdateDto } from "../dto/group.dto.js"
import { Group } from "../model/assocation.js"




Group.sync({force:false})

export const getAllGroups = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const offset = (page - 1) * limit

        const search = (req.query.search as string)?.trim() ?? ""

        let whereClaus = {}

        if(search){
            whereClaus = {
                [Op.or]: [
                    {title: {[Op.iLike]: `%${search}%`}},
                    {days: {[Op.iLike]: `%${search}%`}},
                ]
            }
        }

        const {count, rows: groups} = await Group.findAndCountAll({
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
            groups
        })
     
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}


export const AddGroup = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {title, days, time, image_url, added_by, teacher_id} = req.body as GroupCreateDto
        await Group.create({title, days, time, image_url ,added_by, teacher_id} )

        res.status(201).json({
            message: "Added Group"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const UpdateGroup= async (req:Request, res:Response, next:NextFunction) => {
    try {
        const newID = Number(req.params.id )

    
        const  {title, days, time, image_url, added_by, teacher_id} = req.body as GroupUpdateDto

       
        const foundedUser = await Group.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Group.update( {title, days, time, image_url, added_by, teacher_id} , {where:{id: newID}})

        res.status(200).json({
            message: "update group"
        })
    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const DeleteGroup = async (req:Request, res:Response, next:NextFunction) => {
    try {
         const newID = Number(req.params.id )

       
        const foundedUser = await Group.findByPk(newID)

        if(!foundedUser) {
            return res.status(404).json({
                message: "not found"
            })
        }

        await Group.destroy({where:{id: newID}})

        res.status(200).json({
            message: "delete group"
        })

    } catch (error: any) {
        res.status(500).send({
            message: error.message
        })
    }
}



