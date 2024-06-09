const express=require('express');
const cors=require('cors');
const http=require('http');
const {MongoClient}=require('mongodb');
const socketIo=require('socket.io');
const port=process.env.PORT||5000;

const app=express();
app.use(cors());
const server=http.createServer(app);


server.listen(port,()=>{
    console.log(`server running on port: ${port}`);
})