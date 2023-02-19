import  express,{Request,Response} from "express";
import { Book,bookStore ,category} from "../models/book";
import dotenv from 'dotenv';
import { auth } from "../middleware/auth";
dotenv.config();

const store = new bookStore()

const index=async (req:Request,res:Response)=>{
    try{
    const books = await store.index()
    res.json(books)
    }
    catch(err){
        res.status(400).json(err)
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const book = await store.show(req.params.id as unknown as number)
    res.json(book)
} catch(err) {
    res.status(404)
    res.json(err)
}
 }

 const showByCategory = async (req: Request, res: Response) => {
    try {
        const book = await store.showByCategory(req.params.num as unknown as number)
    res.json(book)
} catch(err) {
    res.status(404)
    res.json(err)
}
 }
 
 const create = async (req:Request, res: Response) => {

     try {
         const book: Book = {
            id:0,
             name: req.body.name,
             price: req.body.price,
             category : req.body.category,
         }
 
         const newBook = await store.create(book)
         res.json(newBook)
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

const book_routes = (app: express.Application)=>{
    app.get('/books',index)
    app.get('/books/:id', show)
    app.get('/books/category/:num', showByCategory)
    app.post('/books',auth, create)
    app.delete('/books',auth, remove)
}

export default book_routes