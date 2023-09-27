import React from "react";
import NWStyle from "./NewWave.module.css";
import {ReactComponent as One} from "./waves/1.svg";
import {ReactComponent as Two} from "./waves/2.svg";
import {ReactComponent as Three} from "./waves/3.svg";

export default function NewWave({waveIndex/*I'm gon have a list of waves*/, children /*normally, I dey expect only one child*/}) {
	const arr = [<One/>, <Two/>, <Three/>];
	Object.freeze(arr);
	return (
		<div className={NWStyle.container}>
			<div className={NWStyle.chaidDiv}>
				{children}
			</div>
			<div className={NWStyle.SVG}>
				{waveIndex && arr[parseInt(waveIndex)]}
			</div>
		</div>
	);
}