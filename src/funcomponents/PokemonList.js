import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = (props) => {
	const [data,setData] = useState(undefined);
	useEffect(
		()=>{
			async function getPage(){
				try {
					let page=props.match.params.page
					page=parseInt(page)*20;
					const {data}=await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`);
					let count=data.count;
					let limit=Math.ceil(parseInt(count)/20);
					let current=parseInt(props.match.params.page);
					if(current>=limit){throw Error;}
					setData(data);
				}
				catch(e){
					console.log(`error ${e}`);
					props.history.push("/error404");
				}
			}
			getPage();
		},
		[props.match.params.page,props.history]//dependency array
	);

	const buildListItem = (pokemon) => {
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

	let li = data &&
	data.results.map((pokemon)=>{
		return buildListItem(pokemon);
	});
	let body=null;
	let count=data && data.count;
	let limit=Math.ceil(parseInt(count)/20);
	let current=parseInt(props.match.params.page);
	let next=data && data.next;
	let previous=data && data.previous;
	if(next && previous && current<limit){
		let previousPage=parseInt(props.match.params.page)-1;
		let nextPage=parseInt(props.match.params.page)+1;
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
		let nextPage=parseInt(props.match.params.page)+1;
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
		let previousPage=parseInt(props.match.params.page)-1;
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

export default PokemonList;
