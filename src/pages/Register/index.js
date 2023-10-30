import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";
import InputWithKini from "../../components/InputWithKini";
import TwoInOne from "../../components/TwoInOne";
import DateWithErrors /*this manages its own state... no lifting*/ from "../../components/DateWithErrors";
import InputWithExtra from "../../components/InputWithExtra";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import {SERVER_HOST, SERVER_PORT} from "../../LLConstants.js";

class MyMap extends Map {
	
	add = (fldName) => {
		this.set(fldName, []);
	}
}

export default class Register extends Component {
	
	#scrutinyMap; //for mapping field names to an array containing their validating functions
	#dateScrutinyList; //only different component I got
	#formRef;
	#dateRef;
	
	constructor() {
		super();
		
		this.#scrutinyMap = new MyMap();
		this.#dateScrutinyList = [];
		//setting it up for this form
		this.#setupVali();
		
		const errorMsgs = {
			"email": [],
			"fname": [],
			"lname": [],
			"password": []
		};
		
		//if this page was created from a redirection after unsuccessful registration,
		//the url gon contain some errorMsgs... esp about the username... so I'm checkin'
		const params = new URLSearchParams(window.location.search);
		const emailErr = params.get("emailErr");
		
		emailErr && errorMsgs["email"].push(emailErr);
		
		this.state = {
			errorMsgs,
			"email": "",
			"fname": "",
			"lname": "",
			"password": "",
			"confPassword": ""
		};
		
	}
	
	//this helper is fo adding scrutiny functions to scrutiny map
	#addSFunc = (fldName, func) => {
		this.#scrutinyMap.get(fldName).push(func);
	}
	
	//this func is for setting up validation funcs
	#setupVali = () => {
		
		/*knew what I was doing here by naming funcs below*/ 
		//also this dontBeEmpty finna be used by all so...
		const dontBeEmpty = (value) => {
			if(value.length === 0)
				return {"failed": true, "message": "This field must not be empty"};
			else
				return {"failed": false};
		}
		
		//email first
		this.#scrutinyMap.add("email");
		const isValidEmail = (value) => {
			const regex = /.+@.+(\.\w{1,3})+/;
			if(value.match(regex))
				return {"failed": false};
			else
				return {"failed": true, "message": "Please enter a valid email"};
		}
		this.#addSFunc("email", dontBeEmpty);
		this.#addSFunc("email", isValidEmail);
		
		//fname and lname next
		this.#scrutinyMap.add("fname");
		this.#scrutinyMap.add("lname");
		const noSpaceChecker = (value) => {
			if(! value.match(/\s/g))
				return {"failed": false};
			else
				return {"failed": true, "message": "No space in name fields"};
		}
		this.#addSFunc("fname", dontBeEmpty);
		this.#addSFunc("fname", noSpaceChecker);
		this.#addSFunc("lname", dontBeEmpty);
		this.#addSFunc("lname", noSpaceChecker);
		
		//password next
		this.#scrutinyMap.add("password");
		const passwordsEqual = (value) => {
			if(this.state.password === this.state.confPassword)
				return {"failed": false};
			else
				return {"failed": true, "message": "both passwords have to be equal"}
		}
		this.#addSFunc("password", dontBeEmpty);
		this.#addSFunc("password", passwordsEqual);
		
		//DateWithErrors Component scrutiny functions next
		const dateDontBeEmpty = (year, month, day) => {
			//now, in the below if statement, you may want to ask me why I converted to string first before checking if
			//its NaN... if you askin' that, there are three answers to that Question
			//1. you're not an expert or intermediate js dev
			//2. you're not Prince... or you are and your mind is elsewhere so you'll prolly delete the if statement before reading this comment
			//3. because NaN cannot == NaN
			if((String(year) === "NaN") || (String(month) === "NaN") || (String(day) === "NaN"))
				return {"failed": true, "message": "year/month/day cannot be empty"}
			else
				return {"failed": false};
		}
		const yearLessThanPresent = (year, month, day) => {
			const currYear = (new Date()).getFullYear();
			if(year > currYear)
				return {"failed": true, "message": "Year must be lesser than current year"}
			else
				return {"failed": false};
		}
		const yearGreaterThan1000 = (year, month, day) => {
			if(year < 1000)
				return {"failed": true, "message": "Year of birth is not valid"}
			else
				return {"failed": false};
		}
		const validMonth = (year, month, day) => {
			if((month < 1) || (month > 12))
				return {"failed": true, "message": "Month of birth is not valid"};
			else
				return {"failed": false};
		}
		const validDay = (year, month, day) => {
			const daysToMonth = new Map(); //a mapping from noOfDays to the months that have em... all in number-codes
			daysToMonth.set(30, [9, 4, 6, 11]);
			daysToMonth.set(31, [1, 2, 3, 5, 7, 8, 10, 12]);
			daysToMonth.set(29, [2]);
			let isWrong = false; //will be set to true if wrong value is set
			for(let key of daysToMonth.keys())
				if(daysToMonth.get(key).indexOf(month) > -1) {
					if(day > key)
						isWrong = true;
					break;
				}
			
			if((day < 1) || isWrong)
				return {"failed": true, "message": "The day you entered doesn't exist for that month"};
			else
				return {"failed": false};
		}
		
		this.#dateScrutinyList.push(dateDontBeEmpty);
		this.#dateScrutinyList.push(yearLessThanPresent);
		this.#dateScrutinyList.push(yearGreaterThan1000);
		this.#dateScrutinyList.push(validMonth);
		this.#dateScrutinyList.push(validDay);
	}
	
	onInputChange = (fldName) => {
		return (e) => {
			this.setState(prevState => {
				let newState = {...prevState};
				newState[fldName] = e.target.value;
				
				return newState;
			});
		}
	}
	
	//some helper funcs next
	#check = (fldName) => {
		//will go through all the scrutiny functions registered for the field with this fldName
		const errorList = [];
		
		const scrutinyArr = this.#scrutinyMap.get(fldName);
		scrutinyArr.forEach(func => {
			const result = func(this.state[fldName]); //call scrutiny function with the value of the fld in state
			if(result.failed)
				errorList.push(result.message);
		});
		
		return errorList; //the content will determine if error message shouldbe displayed under that field DOM
	}	
	
	//this is a function so that the form'll be able to pass its DOM ref, so we/I can submit it when validation is done
	passRef = (node) => this.#formRef = node;
	
	handleErrorPrinting = (errorList, fldName) => {
		//I wanted to use an if statement to determine if I should change state or not
		//but then I want to make sure the old errorList is overriden fo sure, so that
		//corrected fields won't still be showing errors
		this.setState(prevState => {
				const newErrorMsgs = {...prevState.errorMsgs}; //immut...
				newErrorMsgs[fldName] = errorList;
				
				return {"errorMsgs": newErrorMsgs};
			});
	}
	
	validateForm = () => {
		//gon have a list of fields that needs validation and go thru em
		const list = /*and because I'm lazy*/ [...Object.keys(this.state.errorMsgs)];
		let canMakeReq = true; //we'll see about this
		
		for(let fldName of list) {
			let errorList = this.#check(fldName);
			if((errorList.length > 0) && (canMakeReq))
				canMakeReq = false;
			
			this.handleErrorPrinting(errorList, fldName);
		}
		//DateWithErrors component
		const dateErrorList = this.#dateRef.validate(this.#dateScrutinyList);
		if((dateErrorList.length > 0) && (canMakeReq))
			canMakeReq = false;
		
		if(canMakeReq)
			this.#formRef.submit();
	}
		
	render() {
		return (
		<Card>
			<SVG />
			<Form action={`http://${SERVER_HOST}:${SERVER_PORT}/register`} formName="SIGN UP" passRef={this.passRef} onSubmit={this.validateForm}>
				<InputWithKini name="email" title="E-mail" type="email" value={this.state.email} errorMsgs={this.state.errorMsgs["email"]} onChange={this.onInputChange("email")} />
				
				<TwoInOne isRow={true}>
					<InputWithKini name="fname" title="First Name" value={this.state.fname} errorMsgs={this.state.errorMsgs["fname"]} onChange={this.onInputChange("fname")} />
					<InputWithKini name="lname" title="Last Name"  value={this.state.lname} errorMsgs={this.state.errorMsgs["lname"]} onChange={this.onInputChange("lname")} />
				</TwoInOne>
				
				<TwoInOne isRow={true}>
					<InputWithKini name="password" title="Password" type="password"  value={this.state.password} errorMsgs={this.state.errorMsgs["password"]} onChange={this.onInputChange("password")} />
					<InputWithKini title="Confirm Password" type="password"  value={this.state.confPassword} onChange={this.onInputChange("confPassword")} />
				</TwoInOne>
				
				<DateWithErrors ref={(obj) => this.#dateRef = obj} title="Date Of Birth" dateFormat={[2, 2, 4]} seperator="/" formatString="dd/mm/yyyy"/>
				
				<InputWithExtra firstName="sec_question" firstTitle="Security Question (Optional)" secondName="sec_answer" secondTitle="Answer" />
				
				<Button type="submit" inlineSize="100%" color="#ffffff" backgroundColor="var(--first-color)" borderRadius=".8rem" >Sign Up</Button>
				
				<div className="hac">Already Have An Account? <Link to="/login">Click Here</Link> to Log In</div>
				<br/>
			</Form>
		</Card>
		);
	}

}