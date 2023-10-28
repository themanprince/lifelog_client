//controls
import React, {Component} from "react";
import Modal from "../Modal";
import Form from "../Form";
import EmojiDropdown from "../EmojiDropdown";
import AntManTextField from "../AntManTextField";
import AudioRecorder from "../AudioRecorder";
import VideoRecorder from "../VideoRecorder";
import PicSnapper from "../PicSnapper";
//other kini
import PropTypes from "prop-types";
import CLMStyle from "./CreateLogModal.module.css";

export default class CreateLogModal extends Component {
	render() {
		const {show, method, action} = this.props;
		
		return (
			<Modal show={show}>
				<Form modalStyle={true} method={method || "POST"} action={action}>
					<h2 className={CLMStyle["header"]}>Create Log</h2>
					<EmojiDropdown title="Mood"/>
					<AntManTextField title="Text"/>
					<AudioRecorder/>
					<VideoRecorder/>
					<PicSnapper/>
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