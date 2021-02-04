const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
  nom:{type:String,required:true},
  prix:{type:Number,required:true},
  nombre:{type:Number,required:true},
  estDispo:{type:Boolean,required:true}
});

module.exports=mongoose.model('productModel',ProductSchema);
