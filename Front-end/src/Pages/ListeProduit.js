import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './PageStyle/ListeProduit.css';

function ListeProduit() {
   const [produits,setProduits]=useState([]);
   const [total,setTotal]=useState(0);
   const history=useHistory();
    //Afficher la liste des produits lorsque la page est chargé
    useEffect(()=>{

      axios.get('http://localhost:5000/product/getAll')
      .then((resultat)=>{
        setProduits(resultat.data);
        calculeTotal();
      });
    },[]);
    //supprimer le produit
    const supprimer=(id)=>{
      axios.delete('http://localhost:5000/product/deleteOne/'+id)
      .then(()=>{
        setProduits(produits.filter((produit)=>produit._id!==id));
      })
    }
    //calculer le montant total du stock
    const calculeTotal=()=>{
      const prixTotal=0;
      produits.forEach((produit, i) => {
        prixTotal+=produit.prix;
      });
      setTotal(prixTotal);
    }

  return (
    <div className="ListeConteneur">
    <h1 className="title">La liste de tous les produits</h1>
    <table className="tableau">
        <thead>
            <td className="titreTableau">Nom du produit</td>
            <td className="titreTableau">Prix unitair (Ariary)</td>
            <td className="titreTableau">Nombre</td>
            <td className="titreTableau">Valeur en stock (Ariary)</td>
            <td className="titreTableau">Disponible</td>
            <td className="titreTableau">Actions</td>
        </thead>
        <tbody>
             {produits.map((product,index)=><tr key={index}>
               <td>{product.nom}</td>
               <td>{product.prix}</td>
               <td>{product.nombre}</td>
               <td>{product.nombre*product.prix}</td>
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
    <table className="tableau">
       <thead>
           <td className="titreTableau">Montant total (Ariary)</td>
       </thead>
       <tbody>
          <td>{total}</td>
       </tbody>
    </table>
     <button className="lien" onClick={()=>history.push('/Enregistrement')}>Enregistrer un nouveau produit</button>
    </div>
  );
}

export default ListeProduit;
