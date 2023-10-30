import React from "react";
import PropTypes from "prop-types";
import VideoStyle from "./Video.module.css";

export default function Video(props) {
	
	const {
		passVideoRef,
		passImgRef,
		display,
		showImage,
		onClick
	} = props;
	
	return (
		<div style={{display}} className={VideoStyle["container"]}>
			{(showImage) ? <img className={VideoStyle["videoOrImg"]} alt="Ya pishur" ref={(ref) => passImgRef(ref)}/> : (<video autoPlay className={VideoStyle["videoOrImg"]} ref={(ref) => passVideoRef(ref)}></video>)}
			<div className="under-kini">
				<div className={`media-icon ${VideoStyle["the-button"]}`}>
					<i onClick={onClick} className={"bi-camera-fill"}></i>
				</div>
			</div>
			
		</div>
	);
}

Video.propTypes = {
	"passVideoRef": PropTypes.func,
	"passImgRef": PropTypes.func,
	"onClick": PropTypes.func,
	"display": PropTypes.string,
	"showImage": PropTypes.bool
};