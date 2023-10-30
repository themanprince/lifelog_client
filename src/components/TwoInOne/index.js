import React from "react";

export default function TwoInOne(props) {
	/*expects two input components as props.children*/
	const {isRow} = props;
	const [first, second] = props.children;
	
	return (
		<div className="row">
			<div className={(isRow) ? "col-6" : "col-12"}>{first}</div>
			<div className={(isRow) ? "col-6" : "col-12"}>{second}</div>
		</div>
	);
}