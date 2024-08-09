const express= require ('express');
const cors = require("cors");
require('./db/config');
const User =require("./db/User")
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const JwtKey='e-comm'
const app = express();
// const mongoose = require ('mongoose')
app.use(express.json());
app.use(cors());

app.post("/register",async(req,res)=>{
    // res.send("api in progress...")
    let user= new User(req.body);
    let result = await user.save();
    result = result.toObject();  //this is fun to convert into Object
    delete result.password;
    Jwt.sign({result},{expiresIn:"2h"} ,(err,token)=>{
      if(err){
        res.send({result:'Somethin went wrong, Please try after some time'})
        
      } // the token will expire after 2 hours
      
        res.send(result,{auth:token})
       })
});


app.post("/login", async(req,res)=>{
    //res.send(req.body)
    console.log(req.body)
    if(req.body.password && req.body.email){

        let user= await User.findOne(req.body).select("-password");
        if(user)
        { 
          Jwt.sign({user},{expiresIn:"2h"} ,(err,token)=>{
          if(err){
            res.send({result:'Somethin went wrong, Please try after some time'})
            
          }
          
            res.send(user,{auth:token})
           })
            
        }else
        {
            res.send({result:'No User Fount'})
        }
    }else
    {
        res.send({result:'No User Fount'})
    }
})

//he
app.post("/add-product",verifyToken,async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.status(201).send(result);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send({ error: 'An error occurred while adding the product' });
  }
});

app.get("/products",verifyToken ,async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: 'No Products Found' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ error: 'An error occurred while fetching products' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.delete('/product/:id',verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ error: 'An error occurred while deleting the product' });
  }
});

app.get("/product/:id",verifyToken, async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No record found" });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send({ error: 'An error occurred while fetching the product' });
  }
});

app.post("/product/:id",verifyToken, async (req,res)=>{
   let result = await Product.updateOne(
   {_id: req.params.id  },
   {
    $set : req.body
   })
   res.send(result)
})

app.get("/search/:key",verifyToken ,async(req,res)=>{
  let result = await Product.find({
     "$or":[
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
     ]
  })
   res.send(result)

})

function verifyToken(req,res,next){
  const token = req.headers["Authentication"];
  if(token){
     token = token.split(' ')[1];
     //console.warn('middleware called if'.token)
     jwt.verify(token,jwtkey, (err,valid)=>{
if(err){
  res.status(401).send({result:"Provide valid  token with header"})
}else {
  next();
}
     })
  } else{
     res.status(403).send({result:"Please add token with header"})

  }
 // console.warn('middleware called'.token)
  


}


 

// get method are not working
// app.post("/add-product", async(req,res)=>{
//     let product = new  Product(req.body);
//     let result = await product.save();
//     res.send(result)
 
// })

// app.get("/products",async(req,res)=> {
//      let products = await Product.find();
//      if(products.lendgth > 0){
//         res.send(products)
//      }else{
//         res.send({result: 'No Products Found'})
//      }

// })


// app.listen(5000)


// const connectDB=async ()=> {
//  mongoose.connect("mongodb://localhost:27017/e-COM");
//  const productSchema = new mongoose.Schema({});
//  const product= mongoose.model('product',productSchema);
//  const data = await product.find();
//  console.warn(data);
// }
// connectDB();



