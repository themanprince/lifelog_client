import React, {Component} from "react";
import {ReactComponent as LifeSVG} from "./svgs/one.svg";
import {ReactComponent as LogSVG} from "./svgs/eleven.svg";
import {ReactComponent as BlobSVG} from "./svgs/blob 1.svg";
import {ReactComponent as WaveSVG} from "./svgs/wave.svg";
import SVGStyle from "./SVG.module.css";

export default class SVG extends Component {
	render() {
		return (
			<div className={SVGStyle["svg-contain"]}>
				<div className={SVGStyle.bg}> {/*the bg for the svg section in mobile view*/}
					<div className={SVGStyle["complementary-bg"]}></div>
					<WaveSVG className={SVGStyle["wave-bg"]}/>
				</div>
				<div className={SVGStyle.blob}><BlobSVG /></div>
				<div className={SVGStyle["life-and-log"]}>
					<div className={SVGStyle.life}><LifeSVG /></div>
					<div className={SVGStyle.log}><LogSVG /></div>
				</div>
			</div>
		);
	}
}