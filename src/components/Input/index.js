import React from "react";
import InputStyle from "./Input.module.css";


export default function Input({title, name, type, value, onChange, errorMsgs /*gon contain an array of error msgs or be empty*/}) {
	return (
			<div className={InputStyle["whole-shit"]}>
				<div className={InputStyle["input-title"]}>{title}</div>
				<input name={name || ""} type={type || "text"} className={InputStyle["input-input"]} value={value} onChange={onChange} />
				{((errorMsgs !== undefined) && (errorMsgs.length > 0)) && (
					<div className="red">
						{ errorMsgs.map((msg, i) => <span key={i}>* {msg}<br/></span>) }
					</div>
				)}
			</div>
		);
}