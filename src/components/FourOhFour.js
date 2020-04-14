import React, { Component } from 'react';

class FourOhFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined
		};
	}
render() {
	let body = null;
	body = (
		<div className='404-body'>
		<h1>Uh-oh! 404!</h1>
		<p>The page you are looking for does not exist.</p>

		<p>Did it ever exist?</p>

		<p>Do any of us exist?</p>

		<p>We probably exist.</p>

		<p>But this page doesn't.</p>

		<p>So...</p>
		</div>

	);
	return body;
}
}

export default FourOhFour;
