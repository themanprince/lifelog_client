import React, {Component} from "react";
import DateInput from "../DateInput";

export default class DateWithErrors extends Component {
	
	#dateInputRef;
	
	constructor(props) {
		super(props);
		
		this.state = {
			"errors": []
		};
	}
	
	validate = (funcArr) => {
		const errors = [];
		for(let func of funcArr) {
			const y = this.#dateInputRef.year;
			const m = this.#dateInputRef.month;
			const d = this.#dateInputRef.day;
			
			const result = func(y, m, d);
			if(result.failed)
				errors.push(result.message);
		}
		
		this.setState({errors});
		
		return errors; //for forms that gon use the returned errorlist to tell if they should submit
	}
	
	render() {
		const {errors} = this.state;
		
		return (
			<>
				<DateInput ref={(obj) => this.#dateInputRef = obj} {...this.props} />
				{(errors.length > 0) && (
					<div className="red">
						{errors.map((err, i) => <span key={i}>* {err}</span>)}
					</div>
				)}
			</>
		);
	}
	
}