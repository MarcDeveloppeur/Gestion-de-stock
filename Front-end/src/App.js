import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Enregistrement from './Pages/Enregistrement';
import ListeProduit from './Pages/ListeProduit';
import EditerProduit from './Pages/EditerProduit';
import NotFound from './Pages/NotFound';


function App() {
  return (
    <Router>

       <Switch>
           <Route exact path="/" component={ListeProduit}/>
           <Route path="/Enregistrement" component={Enregistrement}/>
           <Route path="/EditerProduit/:id" component={EditerProduit}/>
           <Route component={NotFound}/>
       </Switch>

    </Router>
  );
}

export default App;
