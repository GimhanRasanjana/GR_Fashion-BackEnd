const express = require('express');
const router= express.Router();
const path = require('path');
const customerMD= require('../models/user');

router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'static')));


router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body)
    if(username=="admin123" && password=="adminpsw123"){
        res.json({
            message:"login successful",
            data:{
                name:"Gimhan Admin"
            }
        } )
        res.end()
    }else{
        res.json({
            message:"login faild"
        } )
        res.end()
    }

})



module.exports = router
