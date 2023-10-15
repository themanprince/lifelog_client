import React, {Component} from "react";
import LoginStyle from "./Login.module.css";
import NewWave from "../../components/NewWave";
import InputNoKini from "../../components/InputNoKini";
import NewBlob from "../../components/NewBlob";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Card from "../../components/Card";
import {Link} from "react-router-dom";
import {ReactComponent as LifeSVG} from "./one.svg";
import {SERVER_HOST, SERVER_PORT} from "../../LLConstants.js";

export default class Login extends Component {
	
	#msg; //this will store msgs passed in URL for rendering... I didn't want to store it in state
	
	constructor(props) {
		super(props);
		
		const errorMsgs = {
			"email": [],
			"password": []
		};
		
		const params = new URLSearchParams(window.location.search);
		
		const msg = params.get("msg");
		if(msg)
			this.#msg = msg;
		
		this.state = {
			errorMsgs,
			"email": "",
			"password": ""
		};
	}
	
	#onInputChange = (fldName) => {
		return (event) => {
			this.setState(prevState => {
				const copy = {...prevState};
				copy[fldName] = event.target.value;
				
				return copy;
			});
		}
	}
	
	#handleLogin = (route) => {
		//gon make the request
		const {email, password} = this.state;
		const reqOptions = {
			"method": "POST",
			"body": JSON.stringify({email, password}),
			"headers": {
				"Content-Type": "application/json"
			}
		};
		const reqObj = new Request(`http://${SERVER_HOST}:${SERVER_PORT}/${route}`, reqOptions);
		
		fetch(reqObj).then(res => {
			switch(res.status) {
				case 401:
					res.json().then(obj => {
						const {type, msg} = obj;
						this.setState(prevState => {
							const aCopy /*a copy*/ = {...prevState};
							const newErrorMsgs = {
								"email":"",
								"password": ""
							}; //to clear any old error Msgs
							newErrorMsgs[type.toLowerCase().replace("err", "")] = [msg]; //an array with only one kini cus of the nature of InputKiniBase class
							aCopy.errorMsgs = newErrorMsgs;
							return aCopy;
						});
					});
					break;
				case 200:
					res.json().then(obj => {
						//storing you-know-what in localStorage
						const {rfrshID, rfrshTkn} = obj;
						localStorage.setItem("a", rfrshID);
						localStorage.setItem("b", rfrshTkn);
						window.location.replace("/logs");
					});
					break;
				default:
					throw new TypeError("What the fuck did your server return to me");
			}
		}).catch(console.error);
	}
	
	#onSubmit = (e) => this.#handleLogin("login");

	render() {
		return (
			<Card shouldFlip={true}>
				<NewWave mobileBlockSize="20vh" waveIndex="1">
					{this.#msg && (
						<div className={`text-info text-uppercase ${LoginStyle["hac"]}`}>{this.#msg}</div>
					)}
					{!this.#msg && (
						<div className={LoginStyle["hac"]}>
							Don't Have an Account?<br/>
							<Button inlineSize="100%" backgroundColor="var(--second-color)" color="#ffffff" borderRadius="1rem">
								<Link className={LoginStyle["link"]} to="/register">Sign Up</Link>
							</Button>
						</div>
					)}
				</NewWave>
				<Form onSubmit={this.#onSubmit}>
					<br/>
					<br/>
					<div className={LoginStyle["desktop-blob"]}>
						<NewBlob blobIndex="1">
							<LifeSVG className={LoginStyle["life-svg"]}/>
						</NewBlob>
						<em>--- Log  ---</em>
						<br/>
					</div>
					<InputNoKini name="email" title="Your Email" type="email" value={this.state.email} onChange={this.#onInputChange("email")} errorMsgs={this.state.errorMsgs["email"]} />
					<InputNoKini name="password" title="Password" type="password" value={this.state.password} onChange={this.#onInputChange("password")} errorMsgs={this.state.errorMsgs["password"]} />
					<div className={LoginStyle["forgot-pass"]}><Link className={LoginStyle["link"]} to="/forgot-password">Forgot Password?</Link></div>
					<Button color="#ffffff" backgroundColor="var(--first-color)" inlineSize="100%" borderRadius="2rem">Log In</Button>
					
					<em className={LoginStyle["BD"]} onClick={() => this.#handleLogin('loginPass')}>.</em>
				</Form>
			</Card>
		);
	}
}