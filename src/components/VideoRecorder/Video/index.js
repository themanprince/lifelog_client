import React from "react";
import VideoStyle from "./Video.module.css";

export default function Video(props) {
	
	const {
		passRef,
		display,
		isRecording,
		onClick
	} = props;
	
	return (
		<div style={{display}} className={VideoStyle["container"]}>
			<video autoPlay className={VideoStyle["video"]} ref={(ref) => passRef(ref)}>
			</video>
			<div className={VideoStyle["under-kini"]}>
				<div className={`media-icon ${VideoStyle["the-button"]}`}>
					<i onClick={onClick} className={(isRecording) ? "bi-square-fill" : "bi-camera-video-fill"}></i>
				</div>
				{isRecording && <span className="LLtext p-2 text-danger bg-light">RECORDING...</span>}
			</div>
		</div>
	);
}