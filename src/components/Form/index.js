import React from "react";
import FormStyle from "./Form.module.css";

export default function Form({formName, children}) {
	return (
		<div className={`container-fluid ${FormStyle["form-container"]}`}>
			<div className={`row gy-2 ${FormStyle["row-container"]}`}>
				{[formName, ...children].map((thing, key) => (
					<div key={key} className={`col-12 ${(thing === formName)? FormStyle["form-name"]: ""}`}>{thing}</div>
				))}
			</div>
		</div>	
	);
}