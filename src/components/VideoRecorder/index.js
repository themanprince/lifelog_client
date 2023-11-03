import React, {Component} from "react";
import Video from "./Video";
import VideoRecorderStyle from "./VideoRecorder.module.css";

export default class VideoRecorder extends Component {
	
	#videoComponentRef;
	#recorder;
	#chunks = [];
	#recordedBlob;
	
	constructor(props) {
		super(props);
		
		this.state = {
			"videoDisplay": "none",
			"canRecord": true,
			"isRecording": false
		};
	}
	
	#passVideoRef = (ref) => this.#videoComponentRef = ref;
	
	#setupRecorder = async () => { //gon return the stream so we can set the video kini to it
		const {mediaDevices} = navigator;
		if(! (mediaDevices && mediaDevices.getUserMedia && MediaRecorder)) {
			console.error(new Error("API not found - mediaDevices / MediaRecorder / getUserMedia"));
			
			return this.setState({
				"canRecord": false
			});
		}
		
		try {
			const constraints = {
				"audio": true,
				"video": true
			};
			const stream = await mediaDevices.getUserMedia(constraints);
			this.#recorder = new MediaRecorder(stream);
			
			this.#recorder.addEventListener("dataavailable", e => this.#chunks.push(e.data));
			this.#recorder.addEventListener("stop", () => {
				this.#recordedBlob = new Blob(this.#chunks, {
					"type": "video/mp4"
				});
				//setting the parent state to indicate new media
				this.props.addMedia("video", this.#recordedBlob);
				//stopping stream next
				stream.getTracks().forEach(track => track.stop());
				
				this.#chunks = [];
			});
			
			return stream;
			
		} catch(err) {
			console.error(err);
			
			this.setState({
				"canRecord": false
			});
			
		}
			
	}
	
	#onClickSmallButton = async (e /*just being pragmatic*/) => {
		const stream = await this.#setupRecorder(); //this returns the stream... yea, of course
		
		this.#videoComponentRef.srcObject = stream;
		
		this.setState({
			"videoDisplay": "flex"
		});
		
	}
	
	#onClickBigButton = (e /*just being pragmatic*/) => {
		this.setState(prevState => {
			const {isRecording} = prevState;
			
			if( ! isRecording) {
				this.#recorder.start();
				return {
					"isRecording": true
				};
			}
			
			//got here means above not true
			this.#recorder.stop();
			return {
				"isRecording": false,
				"videoDisplay": "none"
			};
		});
	}
	
	render() {
		const {videoDisplay, canRecord, isRecording} = this.state;
		
		return (
			<div className={`${VideoRecorderStyle["container"]}`}>
				<div className="media-icon">
					<i className="bi-camera-video-fill" onClick={this.#onClickSmallButton}></i>
				</div>
				{
					(canRecord) ? <Video display={videoDisplay} onClick={this.#onClickBigButton} isRecording={isRecording} passRef={this.#passVideoRef}/> : <div className="red"><span>Unable to Record</span></div> 
				}
			</div>	
		);
	}
}
