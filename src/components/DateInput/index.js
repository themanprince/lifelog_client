import React, {Component} from "react";
import DateStyle from "./DateInput.module.css";

export default class DateInput extends Component {
	constructor(props) {
		super(props);
		/*props gon contain an array representing the date format*/
		
		
		//since I have to control the uncontrolled input state, Im making an array to do that
		const valArr = this.props.dateFormat.map(() => "");
		
		//next, their DOM refs for focusing em
		this.DOMRefArr = this.props.dateFormat.map(() => null);
		
		this.state = {
			valArr,
			"currOne": 0 /*to keep track for auto tabbing*/
		};
	}
	
	updateVal = (i) => {
		return (event) => {
			this.setState((prevState, props) => {
				//apart from updating input, Im also gon be checking if limit is reached
				//but only when the user tried to ADD text
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
	
	focusHandler = (i) => {
		return (event) => {
			this.setState({
				"currOne": i
			});
		}
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
								className={DateStyle.input}
								type="number"
								value={val}
								onChange={this.updateVal(i)}
								onFocus={this.focusHandler(i)}
								ref={(node) => this.DOMRefArr[i] = node}
								prompt={"-".repeat(dateFormat[i])}
							/>
							<span className={DateStyle.sep}>{(i !== arr.length - 1) && (seperator || "/")}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
	
	componentDidUpdate(prevState, prevProps) {
		/*after every render, set focus to current node*/
		const {currOne} = this.state; //I need from current, not previous
		const currNode = this.DOMRefArr[currOne];
		currNode.focus();
	}
}