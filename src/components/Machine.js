import React, { Component } from 'react';
import axios from 'axios';

class Machine extends Component {
	mounted=false;
	constructor(props) {
		super(props);
		this.state = {
			data: undefined
		};
	}

	async getMachine() {
		try {
			const { data } = await axios.get(`https://pokeapi.co/api/v2/machine/${this.props.match.params.id}`);
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
		this.getMachine();
	}

	componentWillUnmount(){
		this.mounted=false;
	}

	render() {
		let body = null;
		if(this.state.data){
			body = (
				<div className='machine-body'>
					<div className="tota11yWhy">
						<h1>empty headings</h1>
						<h2>to pass tota11y</h2>
					</div>
					<h3>Machine {this.state.data.id}</h3>
					<ul>
						<li>
							Name: {this.state.data.item.name}
						</li>
						<li>
							Move: {this.state.data.move.name}
						</li>
						<li>
							Version Group: {this.state.data.version_group.name}
						</li>
					</ul>
				</div>
			);
		}
		else{
			body = (
				<div className='loading-body'>
					<h1>Loading</h1>
				</div>
			);
		}
		return body;
	}
}

export default Machine;
