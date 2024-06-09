const express = require("express");
const cors = require("cors");
const http = require("http");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CLUSTER_URL}`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run() {
    try {
 
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
  }
    run().catch(console.dir);
server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
