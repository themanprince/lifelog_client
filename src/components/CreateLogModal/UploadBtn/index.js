import React, {Component} from "react";
import PropTypes from "prop-types";
import UploadBtnStyle from "./UploadBtn.module.css";


export default class UploadBtn extends Component {
	
	#fileRef; //ref to the DOM node for <input type="file"/>
	
	//the file event handler
	#fileHandler = (addMedia) => {
		return (evt) => {
			const file = evt.currentTarget.files[0];
			const type = file.type.split("/")[0];
			
			addMedia(type, file);
		}
	}
	
	#btnHandler = (evt) => {
		this.#fileRef.click();
		//yes... and so what if this is the only thing I wanted to do that I made a function for...
		//always criticizing... nonsense... someone does a million things right but you don't see
		//because thats not what you're looking for... you're looking for that one thing done wrong...
		//I'm sure you're a woman... if you're Eben, you're still a woman..all the same...
		//Yeeesss!!! I wasted time writing this and so what?
	}
	
	render() {
		//destructuring props
		const {title, allowedMIMEs, addMedia} = this.props;
		
		return (
			<>
				<button onClick={this.#btnHandler} className={`btn rounded-pill px-3 text-light LLtext ${UploadBtnStyle["button"]}`}>{title}</button>
				<input ref={ref => this.#fileRef = ref} onInput={this.#fileHandler(addMedia)} accept={allowedMIMEs.join(",")} type="file" style={{"display": "none"}}/>
			</>
		);
	}
}

UploadBtn.propTypes = {
	"title": PropTypes.string,
	"allowedMIMEs": PropTypes.array,
	"addMedia": PropTypes.func
};