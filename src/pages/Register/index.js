import React, {Component} from "react";
import Card from "../../components/Card";
import SVG from "../../components/SVG";
import Form from "../../components/Form";
import Input from "../../components/Input";
import TwoInOne from "../../components/TwoInOne";
import DateWithErrors /*this manages its own state... no lifting*/ from "../../components/DateWithErrors";
import InputWithExtra from "../../components/InputWithExtra";
import Button from "../../components/Button";

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
	
	constructor(props) {
		super(props);
		
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
		//upon the fact that I only added one scrutiny func for each field,
		//you can add more than one... yes, I'm talking to you 😒
		
		//email first
		this.#scrutinyMap.add("email");
		const isValidEmail =  /*knew what I was doing here by naming func*/ (value) => {
			const regex = /.+@.+(\.\w{1,3})+/;
			if(value.match(regex))
				return {"failed": false};
			else
				return {"failed": true, "message": "Please enter a valid email"};
		}
		this.#addSFunc("email", isValidEmail);
		
		//fname and lname next
		this.#scrutinyMap.add("fname");
		this.#scrutinyMap.add("lname");
		let noSpaceChecker = (value) => {
			if(! value.match(/\s/g))
				return {"failed": false};
			else
				return {"failed": true, "message": "No space in name fields"};
		}
		this.#addSFunc("fname", noSpaceChecker);
		this.#addSFunc("lname", noSpaceChecker);
		
		//password next
		this.#scrutinyMap.add("password");
		let passwordsEqual = (value) => {
			if(this.state.password === this.state.confPassword)
				return {"failed": false};
			else
				return {"failed": true, "message": "both passwords have to be equal"}
		}
		this.#addSFunc("password", passwordsEqual);
		
		//DateWithErrors Component next
		let yearLessThanPresent = (year, month, day) => {
			const currYear = (new Date()).getFullYear();
			if(year > currYear)
				return {"failed": true, "message": "Year must be lesser than current year"}
			else
				return {"failed": false};
		}
		this.#dateScrutinyList.push(yearLessThanPresent);
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
			console.log("got here means all fields valid and we free to make request");
	}
		
	render() {
		return (
		<Card>
			<SVG />
			<Form action="/" formName="SIGN UP" passRef={this.passRef} onSubmit={this.validateForm}>
				<Input title="E-mail" type="email" value={this.state.email} errorMsgs={this.state.errorMsgs["email"]} onChange={this.onInputChange("email")} />
				
				<TwoInOne>
					<Input title="First Name" value={this.state.fname} errorMsgs={this.state.errorMsgs["fname"]} onChange={this.onInputChange("fname")} />
					<Input title="Last Name"  value={this.state.lname} errorMsgs={this.state.errorMsgs["lname"]} onChange={this.onInputChange("lname")} />
				</TwoInOne>
				
				<TwoInOne>
					<Input title="Password" type="password"  value={this.state.password} errorMsgs={this.state.errorMsgs["password"]} onChange={this.onInputChange("password")} />
					<Input title="Confirm Password" type="password"  value={this.state.confPassword} onChange={this.onInputChange("confPassword")} />
				</TwoInOne>
				
				<DateWithErrors ref={(obj) => this.#dateRef = obj} title="Date Of Birth" dateFormat={[2, 2, 4]} seperator="/" formatString="dd/mm/yyyy"/>
				
				<InputWithExtra firstTitle="Security Question (Optional)" secondTitle="Answer" />
				
				<Button type="submit">Submit</Button>
			</Form>
		</Card>);
	}

}