import React from "react";
import NewBlobStyle from "./NewBlob.module.css";

export default function NewBlob(props) {
	const {children, blobIndex} = props;
	const classes = ["one", "two", "three"]; //the classes contain background-image properties for their respective svgs
	Object.freeze(classes); //for no reason at all
	const myClass = classes[parseInt(blobIndex)];
	
	return (
		<div className={`${NewBlobStyle["contain"]} ${NewBlobStyle[myClass]}`}>
			{children}
		</div>
	);
}