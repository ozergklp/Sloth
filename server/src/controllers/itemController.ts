import mongoose from 'mongoose';
import Item, { IItem } from '../models/itemModel';
import { Request, Response } from 'express';
import { getFileStream, uploadFile } from '../s3';

// get a single item
export const getImage = (req: Request, res: Response) => {
    const key = req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res)

}

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find({}).sort({createdAt: -1})
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
