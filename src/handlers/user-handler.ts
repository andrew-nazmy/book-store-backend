import  express,{Request,Response} from "express";
import { User,userStore } from "../models/user";
import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import { auth } from "../middleware/auth";
dotenv.config();
const store = new userStore()

const index=async (req:Request,res:Response)=>{
    try { const users = await store.index()
    res.json(users)
} catch(err) {
    res.status(400)
    res.json(err)
}
}
const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id as unknown as number)
    res.json(user)
} catch(err) {
    res.status(404)
    res.json(err)
}
 }
 
 const create = async (req: Request, res: Response) => {
     try {
         const user: User = {
             username: req.body.username,
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             password: req.body.password,
             id: 0
         }
         let newUser = await store.create(user)
         res.json(newUser)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
 }
 
 const login = async (req: Request, res: Response) => {
    try {
        const user = await store.login(req.body.username,req.body.password);
        var token=Jwt.sign({user:user}, process.env.TOKEN_SECRET as string)
        res.json(token)
} catch(err) {
    res.status(404)
    res.json(err)
}

 }

const user_routes = (app: express.Application)=>{
    app.get('/users',auth,index)
    app.get('/users/:id',auth, show)
    app.post('/users',create)
    app.post('/users/login', login)
}

export default user_routes