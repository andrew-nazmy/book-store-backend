import  express,{Request,Response} from "express";
import { Order,orderStore } from "../models/order";
import dotenv from 'dotenv';
import { auth } from "../middleware/auth";
dotenv.config();

const store = new orderStore()

const index=async (req:Request,res:Response)=>{
    try{
    const orders = await store.index()
    res.json(orders)
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}
const orderByUser = async (req: Request, res: Response) => {
    try {
        const order = await store.orderByUser(req.params.id as unknown as number)
    res.json(order)
} catch(err) {
    res.status(404)
    res.json(err)
}
 }
 
 const create = async (req:Request, res: Response) => {

     try {
         const order: Order = {
             id:0,
             book_id: req.body.book_id,
             quantity: req.body.quantity,
             user_id: req.body.user_id,
             status:req.body.status
         }
 
         const newOrder = await store.create(order)
         res.json(newOrder)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 
 const remove = async (req: Request, res: Response) => {
    try {
         const removed = await store.delete(req.body.id)
     res.json(removed)
    } catch(err) {
        res.status(404)
        res.json(err)
    }
 }

const order_routes = (app: express.Application)=>{
    app.get('/orders',auth,index)
    app.get('/orders/:id',auth, orderByUser)
    app.post('/orders',auth, create)
    app.delete('/orders',auth, remove)
}

export default order_routes