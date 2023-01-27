const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;


const userSchema = new schema({
// collection field and type(ex  for registation form data )
   name:{type:String,required:true},
   email:{type:String,required:true},
   password:{type:String,required:true}


});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.saveUser = function (newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("newUser.password", salt, function(err, hash) {
            newUser.password = hash;

            if(err) throw err;
            newUser.save(callback);
        });
    });
};

module.exports.findByEmail = function (email,callback){
    const query = {email:email};
    User.findOne(query,callback);
};
module.exports.findByEmailPassword = function (email,password,callback){
    const query = {email:email, password:password};
    User.findOne(query,callback);
};

module.exports.passwordCheck = function(plainpassword, hash, callback){
    bcrypt.compare(plainpassword, hash , function(err, res){
           console.log(res);
        if(err) throw err;

           
            callback(null,res);
           
    });
};

module.exports.findUserbyId = function(id,callback){
     User.findOne(id,callback);
};