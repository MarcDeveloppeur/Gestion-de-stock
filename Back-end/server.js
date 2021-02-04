const express=require('express');
const mongoose=require('mongoose');
const productRouter=require("./Routes/ProductRoutes");
const app=express();

//connecter l'application avec mongodb
mongoose.connect('mongodb://127.0.0.1:27017/todoBase')
.then(()=>console.log('Connection avec mongodb éfféctuée'));

//les middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Les routeurs
app.use('/product/',productRouter);

//creation du serveur sur le port 5000
app.listen(5000,()=>console.log('serveur connécté sur le port 5000'));
