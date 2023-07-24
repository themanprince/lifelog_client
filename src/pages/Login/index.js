import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";

export default class Login extends Component {
	render() {
		return (
		<Card>
			<SVG />
			<Form formName="SIGN IN"></Form>
		</Card>);
	}
}