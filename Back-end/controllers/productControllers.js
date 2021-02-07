const productModel=require('../Models/productModel');

exports.addNew=(req,res)=>{
  if(req.body.nom||req.body.prix||req.body.nombre){

    //Ajouter le nouveau produit dans la base
      const model=new productModel({
        ...req.body
      });
     model.save()
     .then(()=>res.status(200).send({message:"Enregistrement éffectué"}))
     .catch((err)=>console.log(err));

  }else{
    res.status(500).send({message:"Erreur d'enregistrement"});
  }

}

exports.getAll=(req,res)=>{
   productModel.find()
   .then((resultat)=>{
     res.status(200).send(resultat)
   }).catch((err)=>console.log(err));

}

exports.deleteOne=(req,res)=>{
   productModel.remove({_id:req.params.id})
   .then((resultat)=>{
     res.status(200).send({message:"Suppression éfféctué avec success"});
   }).catch((err)=>console.log(err));
}

exports.update=(req,res)=>{
   productModel.updateOne({_id:req.params.id},{
     ...req.body
   })
   .then((resultat)=>{

     res.status(200).send({message:"Mise à jours éfféctué avec success"});
   }).catch((err)=>console.log(err));
}

exports.getOne=(req,res)=>{
   productModel.findById({_id:req.params.id})
   .then((resultat)=>{
     res.status(200).send(resultat)
   }).catch((err)=>console.log(err));

}
exports.total=(req,res)=>{
  //la somme de toutes les valeurs en stock et retourner le total des valeurs
  productModel.aggregate([{$group:{_id:"",total:{$sum:"$valeurEnStock"}}}])
  .then((result)=>res.status(200).send(result));
}
