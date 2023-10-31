import {Router} from 'express'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const authRouter = Router()
const SECRET_KEY =process.env.SECRET_KEY

authRouter
    .use('/priv',verifyToken)
    .get('/',(req,res)=>{
        res.json({message: 'Ruta desprotegida'})
    })
    .post('/login',(req,res)=>{
        try{
            const {user, password}=req.body
            console.log(`User ${user} is trying to login.`)
    
            if(user=='asmin'&& password=='admin'){
                return res.status(201).json({
                    token:jwt.sign({user: 'admin'}, SECRET_KEY)
                })
            }

        }catch(err){
            return res.json({error:err})
        }
    })
    .get('/priv/rutaprivada',(req,res)=>{
        res.status(200).json({message:"Ruta protegida"})
    })
async function verifytoken(req,res,next){
    if(!req.headers.authorization){
        res.status(401).send('Acceso autorizado')
    }
    console.log(req.headers.authorization)
    const token=req.headers.authorization.split(' ')[1]
    console.log(token)
    try{
        jwt.verify(token,SECRET_KEY,(err)=>{
            if(err) return res.json({error: 'Token invalido'})
            next()
        })
    }catch(err){
        res.json({error:err})
    }
}

export default authRouter