import React, {Component} from "react";
import AMTFStyle from "./AntManTextField.module.css";
import genericDebouncer from "../../my_modules/genericDebouncer";
import PropTypes from "prop-types";
import {ANTMAN_TEXTFIELD_DEBOUNCE_TIME} from "../../LLConstants";


export default class AntManTextField extends Component {
	
	#divRef;
	#taRef;
	#passerDebouncer; //check constructor for details on this mofo'
	
	constructor(props) {
		super(props);
		
		const {passValue} = this.props;
		
		this.state = {
			"text": ""
		};
		//next is the debouncer for the action of passing value to the parent... so that the passValue function won't be called everyttime a user types a char
		this.#passerDebouncer = genericDebouncer(ANTMAN_TEXTFIELD_DEBOUNCE_TIME, function(textValue) {
			//whenever this func is called, it does the below
			passValue(textValue);
			//which is pass textValue to parent
		});
	}
	
	#onChange = (e) => {
		const text = e.target.value;
		this.#passerDebouncer(text); //already specified the function in the constructor
		this.setState({text});
	}
	
	render() {
		const {title} = this.props;
		const {text} = this.state;
		
		
		return (
			<div>
				<div className="d-flex justify-content-between align-items-end"><span className="LLtext">{title}</span><img alt="dotdotdot" src="dotdotdot.png" className={AMTFStyle["dotdotdot"]}/></div>
				<div className={AMTFStyle["contain"]}>
					<textarea ref={node => this.#taRef = node} value={text} onChange={this.#onChange} className={`LLtext ${AMTFStyle["textarea"]}`}></textarea>
					<div ref={node => this.#divRef = node} className={/*giving em same class so text occupies same space in em*/`LLtext ${AMTFStyle["secret-ingredient"]}`} dangerouslySetInnerHTML={{"__html": text.replaceAll("\n", "<br/>.") || "."/*this character is so that textarea can have same size with input field on mount due to inside char ivunowodamin*/}}></div>
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		const div = this.#divRef, ta = this.#taRef;
		ta.style.setProperty("block-size", getComputedStyle(div).getPropertyValue("block-size"));
	}
	
	componentDidUpdate() {
		const div = this.#divRef, ta = this.#taRef;
		ta.style.setProperty("block-size", getComputedStyle(div).getPropertyValue("block-size"));
	}
	
}

AntManTextField.propTypes = {
	"title": PropTypes.string.isRequired,
	"passValue": PropTypes.func.isRequired
}