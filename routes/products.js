const express = require('express');
const router= express.Router();
const path = require('path');
const productMD= require('../models/product')


router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'static')));




router.get("/mens",(req, res)=>{
    productMD.findByCategory("Men", function(err,products){
        if(err) {
            res.json({
                "message":"error"
            })
            res.end()
        }
    
        if(products){
            console.log("/* products */")
          console.log(products)
            res.json(products);
            res.end()
        }
    })
   
    
})
router.get("/women",(req, res)=>{
    productMD.findByCategory("Women", function(err,products){
        if(err) {
            res.json({
                "message":"error"
            })
            res.end()
        }
    
        if(products){
            console.log("/* products */")
          console.log(products)
            res.json(products);
            res.end()
        }
    })
   
    
})

router.get("/kids",(req, res)=>{
    productMD.findByCategory("Kids", function(err,products){
        if(err) {
            res.json({
                "message":"error"
            })
            res.end()
        }
    
        if(products){
            console.log("/* products */")
          console.log(products)
            res.json(products);
            res.end()
        }
    })
   
    
})

router.post("/addNew",(req,res)=>{

    // const productName = req.body.name;
    // const productCategory= req.body.category;
    // const productMaterialType= req.body.material;
    // const productDescription = req.body.description;
    // const productBrand = req.body.brand;
    // const productPrice = req.body.price;

    console.log(req.body)

    //code here 
    const newProduct = new productMD({

        name : req.body.name,
        category : req.body.category,
        
        materialType : req.body.material,
        description : req.body.description,
        brand : req.body.brand,
        price : req.body.price,
        image: req.body.productImage
  
    });
  
    console.log(newProduct)
    productMD.saveProduct(newProduct,function(err,productStatus){
        if(err){
            res.json({
                actionStatus:"failed",
                message:"Something Went Wrong"
            })
            res.end()
        }
        
        if(productStatus){
            console.log("This is going to work")
            console.log(productStatus)
            res.json({
                actionStatus:"completed",
                message:"Successfully Added"
            })
        
            
            res.end()
        }
    });
    



})


module.exports= router