import React from "react";
import FormStyle from "./Form.module.css";

export default function Form({formName, action, children, onSubmit, passRef}) {
	//passRef is to pass its ref to parent component who wants to control Form submission
	return (
		<div className={`container-fluid ${FormStyle["form-container"]}`}>
			<form
				action={action}
				ref={(node) => passRef(node)}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(e);
				}}
				className={`row gy-4 ${FormStyle["row-container"]}`}
			>
				{[formName, ...children].map((thing, key) => (
					<div key={key} className={`col-12 ${(thing === formName)? FormStyle["form-name"]: ""}`}>{thing}</div>
				))}
			</form>
		</div>	
	);
}