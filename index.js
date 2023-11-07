const express=require('express')
const cors=require('cors')
require('dotenv').config()
const app=express()
const port =process.env.PORT || 5000
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trqhxan.mongodb.net/?retryWrites=true&w=majority`;

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
    const database = client.db("assignment-11").collection("users");
    const wishlist = client.db("assignment-11").collection("wishlist");
    const comment = client.db("assignment-11").collection("comment");
    
  //   app.post('/comment',async(req,res)=>{
  //     const newuser=req.body;
  //     console.log(newuser)
  //     const result = await comment.insertOne(newuser);
  //       res.send(result)
  // })
  //   app.get('/comment',async(req,res)=>{
  //       const getuser=comment.find()
  //       const result= await getuser.toArray()
  //       console.log(result)
  //       res.send(result)
  //     })
    // app.get('/datas',async(req,res)=>{
    //     const getuser=database.find()
    //     const result= await getuser.toArray()
    //     console.log(result)
    //     res.send(result)
    //   })
    // app.get('/wishlist_data',async(req,res)=>{
    //     const getuser=wishlist.find()
    //     const result= await getuser.toArray()
    //     console.log(result)
    //     res.send(result)
    //   })
    app.post('/datas',async(req,res)=>{
        const newuser=req.body;
        const oldDate = new Date('2023-11-05T10:30:00.000Z');
        const newDate=new Date()
        const totalMinutes = Math.floor((oldDate - newDate) / 1000);
        newuser.postDate=totalMinutes
        console.log(newuser)
        const result = await database.insertOne(newuser);
        res.send(result)
    })
    // app.put('/datas/:id',async(req,res)=>{
    //   const id=req.params.id
    //   const filter={_id: new ObjectId(id)}
    //   const options={upsert: true}
    //   const update=req.body
    //   const updateuser={
    //     $set:{
    //       image:update.image,
    //       title:update.title,
    //       category:update.category,
    //       shortDes:update.shortDes,
    //       longDes:update.longDes
    //     }
    //   }
    //   const result=await database.updateOne(filter,updateuser,options)
    //   res.send(result)
    // })
    app.post('/wishlist_data',async(req,res)=>{
        const newuser=req.body;
        const oldDate = new Date('2023-11-05T10:30:00.000Z');
        const newDate=new Date()
        const totalMinutes = Math.floor((oldDate - newDate) / 1000);
        newuser.postDate=totalMinutes
        console.log(newuser)
        const result = await wishlist.insertOne(newuser);
        res.send(result)
    })
    // app.delete('/wishlist_data/:id',async(req,res)=>{
    //   const id=req.params.id
    //   const query={_id: new ObjectId(id)}
    //   const result=await wishlist.deleteOne(query)
    //   res.send(result)
    // })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('data in running')
})
app.listen(port,()=>{
    console.log('port is successfull : ',port)
})