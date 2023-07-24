import React, {Component} from "react";
import CardStyle from "./Card.module.css";

export default class Card extends Component {

	render() {
		//obtaining the two things im expecting
		//this component to hold
		const [SVG, Form] = this.props.children;
		
		return (
			<div className={`${CardStyle.card}`}>
				{SVG}
				{Form}
			</div>
		);
	}
}