import React from "react";
import InputKiniBase from "../InputKiniBase";

export default function InputWithKini(props) {
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
		"paddingInline": ".7rem",
		"paddingBlock": ".3rem",
		"borderWidth": "0",
		"borderRadius": "0.785rem",
		"backgroundColor": "var(--input-color)"
	};
	
	return <InputKiniBase {...props}
			wholeShitStyle={wholeShitStyle}
			inputTitleStyle={inputTitleStyle}
			inputInputStyle={inputInputStyle}
			/>;
}