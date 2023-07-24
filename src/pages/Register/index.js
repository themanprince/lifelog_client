import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";
import Input from "../../components/Input";

export default class Register extends Component {
	render() {
		return (
		<Card>
			<SVG />
			<Form formName="SIGN UP">
				<Input title="E-mail" />
				<Input title="First-Name" />
			</Form>
		</Card>);
	}
}