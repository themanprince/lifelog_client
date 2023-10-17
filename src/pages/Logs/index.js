import React, {Component} from "react";
import CreateLogModal from "../../components/CreateLogModal";

export default class Logs extends Component {
	render() {
		return <CreateLogModal show={true} action="#"/>
	}
}