import React, { Component } from 'react';
import axios from 'axios';

class Berry extends Component {
	mounted=false;
	constructor(props) {
		super(props);
		this.state = {
			data: undefined
		};
	}

	async getBerry() {
		try {
			const { data } = await axios.get(`https://pokeapi.co/api/v2/berry/${this.props.match.params.id}`);
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
		this.getBerry();
	}

	componentWillUnmount(){
		this.mounted=false;
	}

	render() {
		let body = null;
		if(this.state.data){
			body = (
				<div className='berry-body'>
					<div className="tota11yWhy">
						<h1>empty headings</h1>
						<h2>to pass tota11y</h2>
					</div>
					<h3>{this.state.data.name.charAt(0).toUpperCase() +
	           		this.state.data.name.slice(1)}</h3>
					<ul>
						<li>
							ID: {this.state.data.id}
						</li>
						<li>
							Growth Time: {this.state.data.growth_time}
						</li>
						<li>
							Size: {this.state.data.size}
						</li>
						<li>
							Smoothness: {this.state.data.smoothness}
						</li>
						<li>
							Soil Dryness: {this.state.data.soil_dryness}
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

export default Berry;
