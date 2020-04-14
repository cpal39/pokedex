import React, { Component } from 'react';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined
		};
	}
render() {
	let body = null;
	body = (
		<div className='home-body'>
		<h1>Hiya!</h1>
		<p>Hello there! Welcome to your first step on the wonderful jounrey to Pokemon mastery. On this website you will find information on various pokemon, berries, and machines. Now you may ask yourself, what the heck are these things? Well, uh, I don't know. But you know who does know? Google knows! So stay right here! Don't leave! (please) Below you will find the best descriptions ever for these three wonderful terms.</p>

		<p>Pokemon - Pokémon are creatures of all shapes and sizes who live in the wild or alongside humans. For the most part, Pokémon do not speak except to utter their names. There are currently more than 700 creatures that inhabit the Pokémon universe. Pokémon are raised and commanded by their owners (called “Trainers”). During their adventures, Pokémon grow, level up and become more experienced and even, on occasion, evolve into stronger Pokémon.</p>

		<p>Berries - Berries are small, juicy, fleshy fruit. As in the real world, a large variety exists in the Pokémon world, with a large range of flavors, names, and effects. First found in the Generation II games, many Berries have since become critical held items in battle, where their various effects include HP and status condition restoration, stat enhancement, and even damage negation.</p>

		<p>Machines - A Technical Machine, or TM for short, is an item that can be used to teach a Pokémon a move. Silph Co. has distributed a pamphlet containing information on TMs and HMs, indicating they are, at least partially, developed or produced by the company.</p>
		</div>

	);
	return body;
}
}

export default Home;
