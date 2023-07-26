import React, {Component} from "react";
import IWEStyle from "./InputWithExtra.module.css";

export default class InputWithExtra extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			inputVal: "",
			extraVal: "" /*extra textarea's value*/
		};
	}
	
	render() {
		const {firstTitle, secondTitle} = this.props;
		const {inputVal, extraVal} = this.state;
		
		return (
			<div className={IWEStyle["whole-shit"]}>
				<div className={IWEStyle["first-part"]}>
					<div className={IWEStyle.title}>{firstTitle}</div>
					<input className={IWEStyle.input} type="text" value={inputVal} onChange={(event) => this.setState({"inputVal": event.target.value})}/>
				</div>
				{
					(inputVal.length)?
						(<div className={IWEStyle["second-part"]}>
							<div className={IWEStyle.title}>{secondTitle}</div>
							<input
								className={IWEStyle.textarea}
								value={extraVal}
								onChange={(event) => this.setState({"extraVal": event.target.value})}
							/>
						</div>)
					: ""
				}
			</div>
		);
	}
}