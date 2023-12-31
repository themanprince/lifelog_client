/*
	IN USING THIS COMPONENT, MAKE SURE THE SEPERATOR USED WHEN SPECIFYING THE
	formatString prop(e.g. the '/' in 'dd/mm/yyyy') IS SAME AS THE SEPERATOR PASSED TO
	THE seperator prop.
	
	THIS IS BECAUSE IT IS IMPORTANT FOR PARSING TO OBTAIN year, month, day FOR ACCESSOR METHODS
	...
	ALSO MAKE SURE ITS COMPLIANT WITH THE dateFormat prop
	
	...
	ANOTHER THING TO NOTE IS THAT THE formatString is used in giving 'name' to the input fields of the date node
*/


import React, {Component} from "react";
import DateStyle from "./DateInput.module.css";

export default class DateInput extends Component {
	#DOMRefArr;
	#shouldUpdate;
	
	constructor(props) {
		super(props);
		/*props gon contain an array representing the date format*/
		
		
		//since I have to control the uncontrolled input state, Im making an array to do that
		const valArr = this.props.dateFormat.map(() => "");
		
		//next, their DOM refs for focusing em
		this.#DOMRefArr = this.props.dateFormat.map(() => null);
		
		//field for determining if updates should occur based on whether update came from props change or state change so I'll know if updating is neccessary
		this.#shouldUpdate = false;
		
		this.state = {
			valArr,
			"currOne": 0 /*to keep track for auto tabbing*/
		};
	}
	
	#updateVal = (i) => {
		return (event) => {
			this.setState((prevState, props) => {
				this.#shouldUpdate = true;
				//apart from updating input, Im also gon be checking if limit is reached
				//but only when the user tries to ADD text
				const oldValLength = prevState.valArr[i].length;
				const newValLength = event.target.value.length;
				const itsLimit = props.dateFormat[i];
		
				if((newValLength > oldValLength) && (newValLength >= itsLimit)) {
					//it means the user wants to add text
					//and limit reached or passed
					const valArrCopy = [...prevState.valArr]; //immutability
					//next,checking if user simply just rrached limit or is trying to add extra shit;after reaching it
					//it will determine if we should reflect the changes
					valArrCopy[i] = (newValLength === itsLimit)? event.target.value: prevState.valArr[i];
				
					//note the negation in condition below
					if(!((prevState.currOne + 1) >= props.dateFormat.length)) {
						//note the negation above... got here means that we are not at the last field in the DOM
						return {
							"currOne": prevState.currOne + 1,
							"valArr": valArrCopy
						};
					} else {
						//got here means you at the last field on the DOM
						return {
							"valArr": valArrCopy
						};
					}
				} else {
					//got here means either the user dont want to add text
					//or they do without passing limits
					//so just let 'em
					const valArrCopy = [...prevState.valArr];
					valArrCopy[i] = event.target.value;
					
					return {"valArr": valArrCopy};		
				}
				
			});
		}
	}
	
	#focusHandler = (i) => {
		return (event) => {
			this.setState({
				"currOne": i
			});
		}
	}
	
	//this helper next is for helping obtain getter methods
	#obtain = (char) => {
		const {formatString, seperator} = this.props;
		const splitResult = formatString.split(seperator); //na im make me tell who wan use this component make he geh sense... at the beginning of this code
		if(splitResult.length !== 3)
			throw new SyntaxError("Length of split formatString is not 3... what is wrong with you my nigga");
		
		const idx = splitResult.indexOf(splitResult.find(el => (el.indexOf(char) !== -1)));
		if(idx === -1)
			throw new SyntaxError("the char you supplied to #obtain method is not in formatString");
		
		const val = this.state.valArr[idx];
		
		return parseInt(val);
	}
	
	get day() {
		return this.#obtain('d');
	}
	
	get month() {
		return this.#obtain('m');
	}
	
	get year() {
		return this.#obtain('y');
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		let toReturn;
		if(this.#shouldUpdate) {
			//if true, it means that the update came from state change(bcus thats where I set it to true)
			//so we free to update... but negate it after wards
			toReturn = this.#shouldUpdate;
			this.#shouldUpdate = !this.#shouldUpdate;
		} else
			toReturn = false;
		
		return toReturn;
	}
	
	render() {
			
		const {valArr} = this.state;
		const {dateFormat, title, formatString, seperator} = this.props; //for getting number of dashes in each field
		
		return (
			<div className={DateStyle["whole-date"]}>
				<div className={DateStyle.title}>{title} ({formatString})</div>
				<div className={DateStyle["input-container"]}>
					{valArr.map((val, i, arr) => (
						<div key={i} className={DateStyle["input-div"]}>
							<input
								name={formatString.split(seperator)[i]}
								className={DateStyle.input}
								type="number"
								value={val}
								onChange={this.#updateVal(i)}
								onFocus={this.#focusHandler(i)}
								ref={(node) => this.#DOMRefArr[i] = node}
								placeholder={"- ".repeat(dateFormat[i])}
							/>
							<span className={DateStyle.sep}>{(i !== arr.length - 1) && (seperator || "/")}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
	
	componentDidUpdate(){
		/*after every render, set focus to current node*/
		const {currOne} = this.state; //I need from current, not previous
		const currNode = this.#DOMRefArr[currOne];
		currNode.focus();
	}
}