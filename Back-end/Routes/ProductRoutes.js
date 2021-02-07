const express=require('express');
const router=express.Router();
const productControllers=require('../controllers/productControllers');

//Ajouter un nouveau produit
router.post('/addNew',productControllers.addNew);
//voire tous les produits
router.get('/getAll',productControllers.getAll);
//Avoire un produits
router.get('/getOne/:id',productControllers.getOne);
//supprimer un produit
router.delete('/deleteOne/:id',productControllers.deleteOne);
//mettre à jours un produit
router.put('/update/:id',productControllers.update);
//avoir le montant total du stock
router.get('/total',productControllers.total);
module.exports=router;
