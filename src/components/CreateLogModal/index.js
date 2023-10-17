import React, {Component} from "react";
import Modal from "../Modal";
import Form from "../Form";
import PropTypes from "prop-types";

export default class CreateLogModal extends Component {
	render() {
		const {show, method, action} = this.props;
		
		return (
			<Modal show={show}>
				<Form modalStyle={true} method={method || "POST"} action={action}>
					<h2>Create Log</h2>
					<h2>Fuck Yo Self</h2>
				</Form>
			</Modal>
		);
	}
}

CreateLogModal.propTypes = {
	"show": PropTypes.bool.isRequired,
	"method": PropTypes.string,
	"action": PropTypes.string
};