function makeComponent() {
	mkdir $1;
	declare indexFile;
	indexFile="${1}/index.js";
	touch "${indexFile}";
	echo 'import React, {Component} from "react";' > "$indexFile";
	touch "${1}/index.test.js";
	touch "${1}/${1}.module.css";
}