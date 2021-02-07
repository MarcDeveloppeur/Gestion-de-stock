import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './PageStyle/ListeProduit.css';

function ListeProduit() {
   const [produits,setProduits]=useState([]);
   const [total,setTotal]=useState(0);
   const history=useHistory();

    useEffect(()=>{
  //Afficher la liste des produits lorsque la page est chargé
      axios.get('http://localhost:5000/product/getAll')
      .then((resultat)=>{
        setProduits(resultat.data);
      });
   //la valeur totale du stock
      axios.get('http://localhost:5000/product/total')
      .then((resultat)=>{
        resultat.data[0] && setTotal(resultat.data[0].total);
      });
    },[]);
    //supprimer le produit
    const supprimer=(id)=>{
      axios.delete('http://localhost:5000/product/deleteOne/'+id)
      .then(()=>{
        setProduits(produits.filter((produit)=>produit._id!==id));
        //mettre à jours le total apres la suppression d'un produit
        axios.get('http://localhost:5000/product/total')
        .then((resultat)=>{
          resultat.data[0]?setTotal(resultat.data[0].total):setTotal(0);
        });

      });
      }


  return (
    <div className="ListeConteneur">
    <h1 className="title">La liste de tous les produits en stock</h1>
    <div className="HeadBlock">
        <button className="lien" onClick={()=>history.push('/Enregistrement')}>Enregistrer un nouveau produit</button>
        <table className="tableau">
           <thead>
               <td className="titreTableau">Valeur total du stock (Ariary)</td>
           </thead>
           <tbody>
              <td className="nombre">{total}</td>
           </tbody>
        </table>
    </div>
    <table className="tableau">
        <thead>
            <td className="titreTableau">Nom du produit</td>
            <td className="titreTableau">Unité</td>
            <td className="titreTableau">Prix unitair (Ariary)</td>
            <td className="titreTableau">Nombre d'unité</td>
            <td className="titreTableau">Valeur en stock (Ariary)</td>
            <td className="titreTableau">Disponible</td>
            <td className="titreTableau">Actions</td>
        </thead>
        <tbody>
             {produits.map((product,index)=><tr key={index}>
               <td>{product.nom}</td>
               <td>{product.unite}</td>
               <td className="nombre">{product.prix}</td>
               <td className="nombre">{product.nombre}</td>
               <td className="nombre">{product.valeurEnStock}</td>
               <td>{product.estDispo?"OUI":"NON"}</td>
               <td>
                   <button className="boutonAction modif" onClick={()=>{
                       const id=product._id;
                       history.push('/EditerProduit/'+id);
                   }}>Modifier</button>
                   {/*supprimer le produit selon son id fornie en parametre dans le fonction supprimer*/}
                   <button className="boutonAction suppr" onClick={()=>{
                         const id=product._id;
                         supprimer(id);
                       }
                   }>Supprimer</button>
               </td>
             </tr>)}
        </tbody>
    </table>

    </div>
  );
}

export default ListeProduit;
