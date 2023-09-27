//the base class for InputWithKini and InputNoKini HOC
import React from "react";
import "./InputKiniBase.css";

export default function InputKiniBase(props) {
	const {title, placeholder, name, type, value, onChange,
			errorMsgs, /*gon contain an array of error msgs or be empty*/
			/*styling props*/wholeShitStyle, inputTitleStyle, inputInputStyle
	} = props;

	return (
			<div style={wholeShitStyle}>
				<div style={inputTitleStyle}>{title}</div>
				<input name={name || ""} type={type || "text"} placeholder={placeholder || ""} style={inputInputStyle} value={value} onChange={onChange} />
				{((errorMsgs !== undefined) && (errorMsgs.length > 0)) && (
					<div className="red">
						{ errorMsgs.map((msg, i) => <span key={i}>* {msg}<br/></span>) }
					</div>
				)}
			</div>
		);
}