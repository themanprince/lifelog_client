import React from "react";
import BtnStyle from "./Button.module.css";

export default function Button(props) {
	const {
		type, children,
		/*styling*/inlineSize, color, backgroundColor, borderRadius
	} = props;
	
	const specStyle = {
		backgroundColor,
		color,
		inlineSize,
		borderRadius
	};
	
	return (
		<button style={specStyle} className={BtnStyle.button} type={type}>{children}</button>	
	);
}