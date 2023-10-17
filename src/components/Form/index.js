import React from "react";
import FormStyle from "./Form.module.css";

export default function Form({children, formName, method, action, onSubmit, passRef, modalStyle}) {
	const modal = {
		"--bs-gutter-x": "0",
		"--form-padding": "0",
		"--form-bg-on-desktop-view" : "none"

	};
	
	//passRef is to pass its ref to parent component who wants to control Form submission
	return (
		<div style={modalStyle && modal} className={`container-fluid ${FormStyle["form-container"]}`}>
			<form
				method={method || "POST"}
				action={action}
				ref={(node) => passRef && passRef(node)}
				onSubmit={(e) => {
					if(onSubmit /*if I pass in a func, then override fo me*/) {
						e.preventDefault();
						onSubmit(e);
					}
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