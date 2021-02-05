import React,{useState} from 'react';
import './PageStyle/Enregistrement.css';
import axios from 'axios';

function Enregistrement() {
    const [nom,setNom]=useState("");
    const [prix,setPrix]=useState();
    const [nombre,setNombre]=useState();
    const [dispo,setDispo]=useState(false);
    const [message,setMessage]=useState('');
    const [messageClasse,setMessageClasse]=useState('');

    const enregistrer=(e)=>{
      e.preventDefault();
      if(nom!==''||prix!==''||nombre!==''){
        const data={
          nom:nom,
          prix:prix,
          nombre:nombre,
          estDispo:dispo
        }
        axios.post('http://localhost:5000/product/addNew',data)
        .then(()=>{
          setMessage('Enregistrement éfféctuée');
          setMessageClasse('success');
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
        <h1>Enregistrer un nouveau produit</h1>

        <p className={messageClasse}>{message}</p>

        <form onSubmit={enregistrer}>
           <input type="text" placeholder="Nom du produit" className="inputClass" value={nom} onChange={(e)=>setNom(e.target.value)}/><br/>
           <input type="number" placeholder="Prix unitaire" min={0} className="inputClass" value={prix} onChange={(e)=>setPrix(e.target.value)}/><br/>
           <input type="number" placeholder="Nombre" min={0} className="inputClass" value={nombre} onChange={(e)=>setNombre(e.target.value)}/><br/>
           <p>Disponible:</p>
           <label htmlFor="Oui">OUI
               <input type="radio" id="Oui" name="dispo" value={dispo} onChange={(e)=>setDispo(true)}/>
          </label>
           <label htmlFor="Non">NON
               <input type="radio" id="Non" name="dispo" value={dispo} onChange={(e)=>setDispo(false)}/>
           </label><br/>
           <button type="submit" className="boutonEnregistrer">Enregistrer</button>
        </form>

    </div>
  );
}

export default Enregistrement;
