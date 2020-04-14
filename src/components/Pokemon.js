import React, { Component } from 'react';
import axios from 'axios';

class Pokemon extends Component {
	mounted=false;
	constructor(props) {
		super(props);
		this.state = {
			data: undefined
		};
	}

	async getPokemon() {
		try {
			const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`);
			if(this.mounted){
				this.setState({data: data});
			}
		} catch (e) {
			console.log(`error ${e}`);
	        this.props.history.push("/error404");
		}
	}

	componentDidMount() {
		this.mounted=true;
		this.getPokemon();
	}

	componentWillUnmount(){
		this.mounted=false;
	}

	render() {
		let body = null;
		if(this.state.data){
			let types="";
			for(let i=0;i<this.state.data.types.length;i++){
				if(i===this.state.data.types.length-1){
					types+=`${this.state.data.types[i].type.name}`;
				}
				else{
					types+=`${this.state.data.types[i].type.name}, `;
				}
			}
			body = (
				<div className='pokemon-body'>
					<div className="tota11yWhy">
						<h1>empty headings</h1>
						<h2>to pass tota11y</h2>
					</div>
					<h3>{this.state.data.name.charAt(0).toUpperCase() +
	           		this.state.data.name.slice(1)}</h3>
					<img src={this.state.data.sprites.front_default} className='pics' alt={this.state.data && this.state.data.name}/>
					<ul>
						<li>
							ID: {this.state.data.id}
						</li>
						<li>
							Order: {this.state.data.order}
						</li>
						<li>
							Height: {this.state.data.height}
						</li>
						<li>
							Weight: {this.state.data.weight}
						</li>
						<li>
							Type: {types}
						</li>
					</ul>
				</div>
			);
		}
		else{
			body = (
				<div className='pokemon-body'>
					<h1>Loading</h1>
				</div>
			);
		}
		return body;
	}
}

export default Pokemon;
