import React, {Component} from "react";
import ModalStyle from "./Modal.module.css";

export default class Modal extends Component {
	
	#closeBtnRef;
	#wholeKiniRef;

	render() {
		const {show, children} = this.props;
		
		return (
			<div ref={(node) => this.#wholeKiniRef = node} style={{"display": (show)? "block": "none"}} className={ModalStyle["whole-kini"]}>
				<div className={ModalStyle["container-kini"]}>
					<div className={ModalStyle["header-kini"]}>
						<img alt="LifeLog Logo" src="LL_Logo.png" className={ModalStyle["LLLogo"]}/>
						<img ref={(node) => this.#closeBtnRef = node} alt="close button" src="close_btn.png" className={ModalStyle["closeBtn"]} />
					</div>
					<div>
						{children}
					</div>
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		/*a dirty solution*/
		this.#wholeKiniRef.addEventListener("click", (e) => {
			if(e.target === this.#closeBtnRef)
				this.#wholeKiniRef.style.display = "none";
		});
	}
}