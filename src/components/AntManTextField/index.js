import React, {Component} from "react";
import AMTFStyle from "./AntManTextField.module.css";
import PropTypes from "prop-types";

export default class AntManTextField extends Component {
	
	#divRef;
	#taRef;
	
	constructor(props) {
		super(props);
		
		this.state = {
			"text": ""
		};
	}
	
	#onChange = (e) => {
		const text = e.target.value;
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
	"title": PropTypes.string.isRequired
}