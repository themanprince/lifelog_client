import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";
import Input from "../../components/Input";
import TwoInOne from "../../components/TwoInOne";
import DateInput from "../../components/DateInput";
import InputWithExtra from "../../components/InputWithExtra";
import Button from "../../components/Button";

export default class Register extends Component {
	render() {
		return (
		<Card>
			<SVG />
			<Form formName="SIGN UP">
				<Input title="E-mail" type="email" />
				
				<TwoInOne>
					<Input title="First Name" />
					<Input title="Last Name" />
				</TwoInOne>
				
				<TwoInOne>
					<Input title="Password" type="password" />
					<Input title="Confirm Password" type="password" />
				</TwoInOne>
				
				<DateInput title="Year Of Birth" dateFormat={[2, 2, 4]} seperator="/" formatString={"dd/mm/yyyy"}/>
				
				<InputWithExtra firstTitle="Security Question (Optional)" secondTitle="Answer" />
				
				<Button type="submit">Submit</Button>
			</Form>
		</Card>);
	}
}