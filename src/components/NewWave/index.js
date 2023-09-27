import React, {Component} from "react";
import NWStyle from "./NewWave.module.css";
import {ReactComponent as One} from "./waves/1.svg";
import {ReactComponent as Two} from "./waves/2.svg";
import {ReactComponent as Three} from "./waves/3.svg";

export default class NewWave extends Component {
	
	#arr;
	#containDOMRef;
	
	constructor(props) {
		super(props);
		this.#arr = [<One/>, <Two/>, <Three/>];
		Object.freeze(this.#arr); //for no reason at all
	}
	
	render() {
		const {waveIndex, children} = this.props;
		
		return (
			<div className={NWStyle.container} ref={(node) => this.#containDOMRef = node}>
				<div className={NWStyle.chaidDiv}>
					{children}
				</div>
				<div className={NWStyle.SVG}>
					{waveIndex && this.#arr[parseInt(waveIndex)]}
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		const {mobileBlockSize} = this.props;
		this.#containDOMRef.style.setProperty('--mobile-block-size', mobileBlockSize);
	}
}