//controls
import React, {Component} from "react";
import Modal from "../Modal";
import Form from "../Form";
import EmojiDropdown from "../EmojiDropdown";
import AntManTextField from "../AntManTextField";
import AudioRecorder from "../AudioRecorder";
import VideoRecorder from "../VideoRecorder";
import PicSnapper from "../PicSnapper";
import TwoInOne from "../TwoInOne";
import MediaWidget from "../MediaWidget";
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
					
					<TwoInOne isRow={false /*pragmatics sake*/}>
						<AntManTextField title="Text"/>
						<div className="d-flex flex-row justify-content-end">
							<AudioRecorder/>
							<VideoRecorder/>
							<PicSnapper/>
						</div>
					</TwoInOne>
					<div className="d-flex justify-content-around">
					<MediaWidget type="audio" title="Audio1"/>
					<MediaWidget type="video" title="Video1"/>
					<MediaWidget type="img" title="Img1"/>
					</div>
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