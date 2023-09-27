import React, {Component} from "react";
import CardStyle from "./Card.module.css";

export default class Card extends Component {

	#nodeRef;

	render() {
		//obtaining the two things im expecting
		//this component to hold
		const [One, Two] = this.props.children;
		
		return (
			<div className={`${CardStyle.card}`} ref={(node) => this.#nodeRef = node}>
				{One}
				{Two}
			</div>
		);
	}
	
	componentDidMount() {
		//checking the shouldFlip prop to know if user wants the item flipped on desktop view
		const {shouldFlip} = this.props;

		if(shouldFlip)
			this.#nodeRef.style.setProperty('--first-one-order', '1'); //flex order for the first one will be 2 on desktop view, causing a rearrangement
		else
			this.#nodeRef.style.setProperty('--first-one-order', '0');

	}
}