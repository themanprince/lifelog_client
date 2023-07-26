import React from "react";

export default function TwoInOne(props) {
	/*expects two input components as props.children*/
	const [first, second] = props.children;
	
	return (
		<div className="row">
			<div className="col-6">{first}</div>
			<div className="col-6">{second}</div>
		</div>
	);
}