import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PokemonList extends Component {
	mounted=false;
	constructor(props){
		super(props);
		this.state={
			data:undefined,
		};
	}

	async getPage(){
		try {
			let page=this.props.match.params.page
			page=parseInt(page)*20;
			const {data}=await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`);
			let count=data.count;
			let limit=Math.ceil(parseInt(count)/20);
			let current=parseInt(this.props.match.params.page);
			if(current>=limit){throw Error;}
			if(this.mounted){
				this.setState({data:data});
			}
		}
		catch(e){
			console.log(`error ${e}`);
	        this.props.history.push("/error404");
		}
	}

	componentDidMount(){
		this.mounted=true;
		this.getPage();
	}

	shouldComponentUpdate(nextProps){
		this.getPage();
		return true;
	}

	componentWillUnmount(){
		this.mounted=false;
	}

	buildListItem = (pokemon) => {
		let url=pokemon.url;
		let id=url.substr(url.substr(0,url.length-1).lastIndexOf('/') + 1);
		return(
			<li key={id}>
				<Link to={`/pokemon/${id}`}>
					{pokemon.name.charAt(0).toUpperCase() +
	           		pokemon.name.slice(1)}
				</Link>
			</li>
		);
	};

	render(){
		let li = this.state.data &&
			this.state.data.results.map((pokemon)=>{
				return this.buildListItem(pokemon);
			});
		let body=null;
		let count=this.state.data && this.state.data.count;
		let limit=Math.ceil(parseInt(count)/20);
		let current=parseInt(this.props.match.params.page);
		let next=this.state.data && this.state.data.next;
		let previous=this.state.data && this.state.data.previous;
		if(next && previous && current<limit){
			let previousPage=parseInt(this.props.match.params.page)-1;
			let nextPage=parseInt(this.props.match.params.page)+1;
			body = (
				<div className='pokemon-list-body'>
					<ul>{li}</ul>
					<br/>
					<Link className="previousButton" to={`/pokemon/page/${previousPage}`}>
						Previous
					</Link>
					<Link className="nextButton" to={`/pokemon/page/${nextPage}`}>
						Next
					</Link>
				</div>
			);
		}
		else if(next && !previous && current<limit){
			let nextPage=parseInt(this.props.match.params.page)+1;
			body = (
				<div className='pokemon-list-body'>
					<ul>{li}</ul>
					<br/>
					<Link className="nextButton" to={`/pokemon/page/${nextPage}`}>
						Next
					</Link>
				</div>
			);
		}
		else if(!next && previous && current<limit){
			let previousPage=parseInt(this.props.match.params.page)-1;
			body = (
				<div className='pokemon-list-body'>
					<ul>{li}</ul>
					<br/>
					<Link className="previousButton" to={`/pokemon/page/${previousPage}`}>
						Previous
					</Link>
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
export default PokemonList;
