const express = require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
app.use(express.json());
app.use(cors());
const port=process.env.PORT || 4000;
const u="mongodb+srv://anujkumar666768:anuj@cluster0.lrkdlig.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(u,{useNewUrlParser:true});
const myschema=mongoose.Schema({
    Imgurl:String,
    Title:String,
    Date:String,
    Content:String
})
const Data=mongoose.model("blogdata",myschema);

app.post("/",async(req,res)=>{
    const data=new Data({
        Imgurl:req.body.imgurl,
        Title:req.body.title,
        Date:req.body.date,
        Content:req.body.content
    })
    await data.save();
    res.send("successfully posted")
})

app.get("/",async(req,res)=>{
    const data=await Data.find();
    res.send(data);
})
app.get("/:id" ,async(req,res)=>{
    const id=req.params.id;
    const d=await Data.findById(id);
    res.send(d);
})
app.listen(port,async()=>{
    console.log("the server is runnin on port 4000")
})
