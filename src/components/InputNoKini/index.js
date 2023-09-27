import React from "react";
import InputKiniBase from "../InputKiniBase";

export default function InputNoKini(props) {
	const wholeShitInputStyle = {
		"inlineSize": "100%"
	};
	const inputTitleStyle = {
		"fontSize": ".8rem",
		"opacity": ".9"
	};
	const inputInputStyle = {
		...inputTitleStyle,
		"inlineSize": "100%",
		"borderWidth": "0",
		"backgroundColor": "transparent",
		"borderBlockEnd": "1px solid black"
	};
	
	return <InputKiniBase {...props}
		wholeShitInputStyle={wholeShitInputStyle}
		inputTitleStyle={inputTitleStyle}
		inputInputStyle={inputInputStyle}
	/>;
}