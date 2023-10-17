import React from "react";
import InputKiniBase from "../InputKiniBase";

export default function InputNoKini(props) {
	const wholeShitStyle = {
		"inlineSize": "100%"
	};
	const inputTitleStyle = {
		"fontSize": "var(--text-size)",
		"opacity": "var(--text-opacity)"
	};
	const inputInputStyle = {
		...inputTitleStyle,
		"inlineSize": "100%",
		"borderWidth": "0",
		"backgroundColor": "transparent",
		"borderBlockEnd": "1px solid black"
	};
	
	return <InputKiniBase {...props}
		wholeShitStyle={wholeShitStyle}
		inputTitleStyle={inputTitleStyle}
		inputInputStyle={inputInputStyle}
	/>;
}