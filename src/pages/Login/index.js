import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginStyle from "./Login.module.css";
import {SERVER_HOST, SERVER_PORT} from "../../LLConstants.js";

export default class Login extends Component {
	constructor() {
		super();
		
		//gon be parsing the url to obtain the details of the msgBar onload
		const params = new URLSearchParams(window.location.search);
		const msg = params.get("msg"), type=params.get("type");
		const msgBar = {
			"msg": msg || "",
			"type": type || ""
		};
		
		this.state = {
			msgBar,
			"email": "",
			"password": ""
		};
	}
	
	//onChange handler for 'em input kini
	onChange = (fldName /*not referring to the name prop in input el ohh*/) => {
		return (event) => {
			this.setState(prevState => {
				const stateCopy = {...prevState};
				stateCopy[fldName] = event.target.value;
				
				return stateCopy;
			});
		}
	}
	
	render() {
		const {msg, type} = this.state.msgBar;
		const {email, password} = this.state;
		return (
		<Card>
			<SVG />
			<Form action={`http://${SERVER_HOST}:${SERVER_PORT}/login`} formName="SIGN IN">
				{
					(!(msg && type)) ? "": <div{/*message bar*/} className={`msgBar ${LoginStyle[type]}`}>{msg}</div>;
				}
				
				<Input title="Email" name="email" type="email" value={email} onChange={this.onChange("email")}/>
				<Input title="Password" name="password" type="password" value={password} onChange={this.onChange("password")}/>
				
				<Button type="submit">LoG IN</Button>
				
				<div className={LoginStyle["forgot-password"]}><Link to="/">Forgot Password?</Link></div>
				<div className="hac">Want to register instead? <Link to="/register">Click Here</Link> to Sign Up</div>
				<br/>
			</Form>
		</Card>);
	}
}