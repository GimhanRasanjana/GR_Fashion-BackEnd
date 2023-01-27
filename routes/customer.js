const express = require('express');
const router= express.Router();
const path = require('path');
const customerMD= require('../models/user');

router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'static')));

router.post('/login', (request, res)=>{
    try {
		
		
		let email = request.body.email;
		let password = request.body.password;

		customerMD.findByEmail(email,function(err,user){
			if(err) {
				res.json({
					"message":"login failed"
				})
				res.end()
			}
		
			if(user){
				customerMD.passwordCheck(password, user.password, (err,match)=>{
					if (err) throw err;
					
					if(match==true){
						console.log(match)
						res.json(
							{
								message:"login successful",
								data:{
									name:user.name,
									email:user.email
								
								}
							}
						);
						res.end()
					}else{

						res.json({
							message:"login failed"
						})
						res.end()
					}
					

				})
					
				
			}
		})
	
	}
	catch(err) {
		console.log(err)
		res.status(500)
		const resposneObj ={ status: "server error", message:"login failed" }
		res.json(resposneObj)
		
	}

	
})
router.post('/sign', (req, res)=>{
	const newUser = new customerMD({

		name:req.body.name,
		email:req.body.email,
		password:req.body.password
  
	  });
  
  
	  customerMD.saveUser(newUser,function(err,user){
		if(err){
		  res.json({state:false,msg:"data not inserted"})};
  
		if(user){
		  res.json({state:true,msg:"data  inserted"})
		};
	  });
})


module.exports = router
