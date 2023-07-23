const express = require('express')
const  cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const { request } = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()) 

 

// const uri = "mongodb+srv://allCollege:azrfsufzS5cBLnKI@cluster0.b1f0ncj.mongodb.net/?retryWrites=true&w=majority";

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1f0ncj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const collegecollection = client.db('collegDB').collection('allcollege');

    app.get('/allcollege', async (req, res) => {
        const cursor =  collegecollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
        res.send('college booking running')
})
app.listen(port, ( ) => {
        console.log(`college is run for: ${port}`)
})