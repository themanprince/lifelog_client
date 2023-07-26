import React from "react";
import BtnStyle from "./Button.module.css";

export default function Button(props) {
	const {type, children} = props;
	
	return (
		<button className={BtnStyle.button} type={type}>{children}</button>	
	);
}