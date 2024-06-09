const express = require("express");
const cors = require("cors");
const http = require("http");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io=socketIo(server,{
    cors: {
      origin: "https://chat-i-4976a.web.app/"
    }
  });
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CLUSTER_URL}`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      
    }
  });

 async  function run() {
    try {
       

    const chatDB=client.db('chatDb');
    const chatCollection=await chatDB.collection('chatCollection');

    io.on('connection',(socket)=>{
        

       chatCollection.find({}).toArray()
       .then(messages=>socket.emit('initialchats',messages));
        
        socket.on('message', async(data)=>{
            const message={
                chat:data
            };

          await  chatCollection.insertOne(message) 
                    io.emit('message',message);
                
            
        })

       
    })

       client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
  }
    run();

app.get('/',(req,res)=>{
  res.send('running');
})
server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
