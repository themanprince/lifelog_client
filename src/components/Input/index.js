import React, {Component} from "react";
import InputStyle from "./Input.module.css";

export default class Input extends Component {
	constructor(props) {
		super(props);
		
		/*
		this component gon manage its own state for two reasons
		1. controlling uncontrolled state
		2. it may have to send requests to confirm info from the server
		e.g. in login forms
		*/
		this.state = {
			"value": ""
		};
	}
	
	onChange = (event) => {
		this.setState({"value": event.target.value});
	}
	
	render() {
		const {title, type} = this.props;
		const {value} = this.state;
		
		return (
			<div className={InputStyle["whole-shit"]}>
				<div className={InputStyle["input-title"]}>{title}</div>
				<input type={type || "text"} className={InputStyle["input-input"]} value={value} onChange={this.onChange} />
			</div>
		);
	}
}