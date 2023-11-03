import React from "react";
import PropTypes from "prop-types";
import MediaWidgetStyle from "./MediaWidget.module.css";

export default function MediaWidget(props) {
	const {type, title} = props;
	
	return (
		<div className="d-flex flex-column align-items-center justify-content-between">
			<div className={`${MediaWidgetStyle["big-circle"]} my-1 position-relative rounded-circle px-2`}>
				<i className={`${MediaWidgetStyle["icon"]} ${((type === "video") && "bi-play-circle") || ((type === "audio") && "bi-headphones") || ((type === "img") && "bi-image")}`}></i>
				<span className={`${MediaWidgetStyle["small-circle"]} fs-6 bg-light px-2 fw-bold rounded-circle position-absolute top-50 start-50`}>×</span>
			</div>
			<span className="LLtext">{title}</span>
		</div>
	);
}

MediaWidget.propTypes = {
	"type": PropTypes.string,
	"title": PropTypes.string
};