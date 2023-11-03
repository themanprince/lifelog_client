import React, {Component} from "react";
import AudioRecorderStyle from "./AudioRecorder.module.css";

export default class AudioRecorder extends Component {
	
	#recorder;
	#chunks = [];
	#recordedBlob;
	
	constructor(props) {
		super(props);
		
		this.state = {
			"canRecord": true,
			"isRecording": false
		};
	}
	
	
	#setupRecorder = async () => {
		
		const {mediaDevices} = navigator;
		
		if(!(mediaDevices && mediaDevices.getUserMedia && MediaRecorder)) {
			 console.error(new Error("API not found - mediaDevices / MediaRecorder / getUserMedia"));
			 
			 return this.setState({
				"canRecord": false
			});
		}
			
		try {		
			const constraints = {
				"audio": true,
				"video": false
			};
			const stream = await mediaDevices.getUserMedia(constraints);
			
			this.#recorder = new MediaRecorder(stream);
			this.#recorder.addEventListener("dataavailable", e => this.#chunks.push(e.data));
			/*stop handler next*/
			this.#recorder.addEventListener("stop", () => {
				this.#recordedBlob = new Blob(this.#chunks, {
					"type": "audio/mp3, codecs=opus"
				});
				//setting the parent state tp indicate new media
				this.props.addMedia("audio", this.#recordedBlob);
				stream.getTracks().forEach(track => track.stop());
				//new chunks
				this.#chunks = [];
			});
		} catch(err) {
			console.error(err);
			this.setState({
				"canRecord": false
			});
		}
	}
	
	#clickHandler = async (e) => {
	
		const {isRecording} = this.state;
		
		/*first check if it was NOT already recording before*/
		if( ! isRecording) {
			await this.#setupRecorder();
			this.#recorder.start();
		
			this.setState({
				"isRecording": true
			});
		} else {
			this.#recorder.stop();
			
			this.setState({
				"isRecording": false
			});
		}
		
	}
	
	render() {
		const {isRecording, canRecord} = this.state;
		
		return (
			<div className={`${AudioRecorderStyle["container"]}`}>
				<div className={`media-icon`}>
					<i className={`bi-mic-fill ${AudioRecorderStyle[(isRecording)? "on-mic" :"off-mic"]}`} onClick={this.#clickHandler}></i>
				</div>
					{ (canRecord) ? 
						<span className="LLtext text-danger">{isRecording && "Recording"}</span>
						:
						<div className="red"><span>Unable to Record</span></div>
					}
			</div>);
	}
	
}
