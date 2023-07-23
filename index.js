const express = require('express')
const  cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const informationcollection = client.db('collegDB').collection('addinfo');


    app.post('/addinfo',async(req,res)=>{
        const userInfo = req.body;
        console.log(userInfo)
        const result = await informationcollection.insertOne(userInfo);
        res.send(result);
      });

       app.get('/addinfo', async (req, res) => {
        const userdata = informationcollection.find();
        const result = await userdata.toArray()
        res.send(result)
       })

    app.get('/allcollege', async (req, res) => {
            const search = req.query.search;
            console.log(search)
            const query = {
                college_name: { $regex: `${search}`, $options: 'i'}}
            const cursor =  collegecollection.find( query);
        const result = await cursor.toArray();
        res.send(result);
    })
     

    app.get('/allcollege/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await collegecollection.findOne(query)
        res.send(result)
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