const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productSchema = new schema({
    // collection field and type(ex  for registation form data )
        category:{type:String,required:true},
        name :{type:String,required:true},
        materialType:{type:String,required:true},
        description  :{type:String,required:true},
        brand :{type:String,required:true},
        price :{type: Number,required:true},
        image:{type: String,required:true}
    
    
    
});


const Product = module.exports = mongoose.model("Product",productSchema);

module.exports.saveProduct = function (newProduct,callback){
    newProduct.save(callback);
};
module.exports.findByCategory = function (Category,callback){
    const query = {category:Category};
    Product.find(query,callback);
};