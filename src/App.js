import React from 'react';
import psyduck from './img/psyduck.png';
import groudon from './img/groudon.png';
import './App.css';
import Home from './components/Home';
import FourOhFour from './components/FourOhFour';
import PokemonList from './funcomponents/PokemonList';
import Pokemon from './funcomponents/Pokemon';
import BerryList from './components/BerryList';
import Berry from './components/Berry';
import MachineList from './components/MachineList';
import Machine from './components/Machine';
import {BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom';

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<div className="App">
				<header className="App-header">
					<img src={groudon} className='groudon' alt='groudon'/>
					<img src={psyduck} className='App-logo' alt='psyduck'/>
					<Link className="homeLink" to='/'>
						<h1>Pokedex</h1>
					</Link>
					<br/>
					<Link className="navLink" to="/pokemon/page/0">
						Pokemon
					</Link>
					<Link className="navLink" to="/berries/page/0">
						Berries
					</Link>
					<Link className="navLink" to="/machines/page/0">
						Machines
					</Link>
				</header>
				<div className='App-body'>
				<Switch>
					<Route path='/' exact component={Home}/>
					<Route path='/pokemon/page/:page' exact component={PokemonList}/>
					<Route path='/pokemon/:id' exact component={Pokemon}/>
					<Route path='/berries/page/:page' exact component={BerryList}/>
					<Route path='/berries/:id' exact component={Berry}/>
					<Route path='/machines/page/:page' exact component={MachineList}/>
					<Route path='/machines/:id' exact component={Machine}/>
					<Route path="*" exact component={FourOhFour} status={404}/>
				</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
