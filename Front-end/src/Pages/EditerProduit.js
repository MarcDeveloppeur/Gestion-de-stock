import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './PageStyle/Enregistrement.css';
import axios from 'axios';

function EditerProduit(props) {
    const [nom,setNom]=useState("");
    const [prix,setPrix]=useState();
    const [nombre,setNombre]=useState();
    const [dispo,setDispo]=useState(false);
    const [message,setMessage]=useState('');
    const [messageClasse,setMessageClasse]=useState('');
    const history=useHistory();

    //charger les information du produit à modifier
    useEffect(()=>{
      axios.get('http://localhost:5000/product/getOne/'+props.match.params.id)
      .then((res)=>{
        setNom(res.data.nom);
        setPrix(res.data.prix);
        setNombre(res.data.nombre);
        setDispo(res.data.estDispo);
      })
    },[]);

    const enregistrer=(e)=>{
      e.preventDefault();
      if(nom!==''||prix!==''||nombre!==''){
        const data={
          nom:nom,
          prix:prix,
          nombre:nombre,
          estDispo:dispo
        }
        axios.put('http://localhost:5000/product/update/'+props.match.params.id,data)
        .then(()=>{
          setMessage('Enregistrement éfféctuée');
          setMessageClasse('success');
          history.push('/');
      })
        .catch(()=>{
          setMessage('Erreur d\'enregistrement')
           setMessageClasse('error');
        });
      }else{
        setMessage('Tous les champs sont obligatoires');
         setMessageClasse('error');
      }

    }

  return (
    <div className="Conteneur">
        <h1>Modifier un produit</h1>

        <p className={messageClasse}>{message}</p>

        <form onSubmit={enregistrer}>
           <label htmlFor="nom"><p>Nom du produit:</p></label>
           <input type="text" id="nom" placeholder="Nom du produit" className="inputClass" value={nom} onChange={(e)=>setNom(e.target.value)}/><br/>
           <label htmlFor="prix"><p>Prix unitair (Ariary):</p></label>
           <input type="number" id="prix" placeholder="Prix unitaire" min={0} className="inputClass" value={prix} onChange={(e)=>setPrix(e.target.value)}/><br/>
           <label htmlFor="nombre"><p>Nombre:</p></label>
           <input type="number" id="nombre" placeholder="Nombre" min={0} className="inputClass" value={nombre} onChange={(e)=>setNombre(e.target.value)}/><br/>
           <p>Disponible:</p>
           <label htmlFor="Oui">OUI
               <input type="radio" className="inputRadio" id="Oui" name="dispo" value={dispo} onChange={(e)=>setDispo(true)}/>
          </label>
           <label htmlFor="Non">NON
               <input type="radio" className="inputRadio" id="Non" name="dispo" value={dispo} onChange={(e)=>setDispo(false)}/>
           </label><br/>
           <button type="submit" className="bouton btnEnregistrer">Modifier</button>
           <button onClick={()=>history.push('/')} className="bouton btnAnnuler">Annuler</button>
        </form>

    </div>
  );
}

export default EditerProduit;
