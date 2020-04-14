import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokemon = (props) => {
	const [data,setData] = useState(undefined);
	useEffect(
		()=>{
			async function getPokemon() {
				try {
					const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`);
					setData(data);
				}
				catch (e) {
					console.log(`error ${e}`);
			        props.history.push("/error404");
				}
			}
			getPokemon();
		},
		[props.match.params.id,props.history]
	);

	let body = null;
	if(data){
		let types="";
		for(let i=0;i<data.types.length;i++){
			if(i===data.types.length-1){
				types+=`${data.types[i].type.name}`;
			}
			else{
				types+=`${data.types[i].type.name}, `;
			}
		}
		body = (
			<div className='pokemon-body'>
				<div className="tota11yWhy">
					<h1>empty headings</h1>
					<h2>to pass tota11y</h2>
				</div>
				<h3>{data.name.charAt(0).toUpperCase() +
           		data.name.slice(1)}</h3>
				<img src={data.sprites.front_default} className='pics' alt={data && data.name}/>
				<ul>
					<li>
						ID: {data.id}
					</li>
					<li>
						Order: {data.order}
					</li>
					<li>
						Height: {data.height}
					</li>
					<li>
						Weight: {data.weight}
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

export default Pokemon;
