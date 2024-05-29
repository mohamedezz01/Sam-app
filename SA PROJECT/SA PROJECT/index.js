
import path from 'path'
import { config } from 'dotenv'
import { Conn } from './DB/connection.js'
import cors from 'cors'
config({path:path.resolve('./config/config.env')})
import * as allRouters from './src/modules/index.routes.js'



const express = require('express');
const app = express();
app.use(express.json())
Conn()
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.options('/User/signup', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });



app.use('/User',allRouters.userRouter)
app.use('/Buy',allRouters.forBuyRouter)
app.use('/Rent',allRouters.forRentRouter)
app.all('*',(req,res,next)=>{
    res.status(404).json({message:'404 Not Found URL'})
})

app.listen(3000,()=>console.log(`Server Connected`))


