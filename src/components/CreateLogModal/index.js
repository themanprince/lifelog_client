import React, {Component} from "react";
//controls
import Modal from "../Modal";
import Form from "../Form";
import EmojiDropdown from "../EmojiDropdown";
import AntManTextField from "../AntManTextField";
import AudioRecorder from "../AudioRecorder";
import VideoRecorder from "../VideoRecorder";
import PicSnapper from "../PicSnapper";
import TwoInOne from "../TwoInOne";
import MediaWidget from "../MediaWidget";
import UploadBtn from "./UploadBtn";
//other kini
import PropTypes from "prop-types";
import CLMStyle from "./CreateLogModal.module.css";

//this needed for doing notifications in submitting form
//this for the different types we could have
const NotifType = {
	"GREEN": 0,
	"RED": 1
};

export default class CreateLogModal extends Component {
	
	counts;
	#CDMNodeRef; //ref of node element of currently displayed media
	#canSetCDMSrc; //will be set to true once CDM is changed, so that src can be set for the new media element
	#allowedMIMEs; //note the lowercase 's'... smirk.. my keyboard don't have smirk emoji
	
	#VTBS; //will be the text values of what is received from each of these controls... for submitting
	
	constructor(props) {
		super(props);
		
		this.state = {
			"media": [], //list of recorded/uploaded media
			"CDM": null, //currently displayed media
			"notification": { //for displaying information when user tries to submit form
				"type": NotifType.GREEN,
				"values": []
			}
		};
		
		this.#VTBS /*ValuesToBeSubmittted.. will be set by each of the components*/ = {
			//the naming is as it is in server so that it will be easily sent
			"mood": undefined,
			"log_text": undefined,
			"video_url": [],
			"audio_url": [],
			"pic_url": []
		};
		
		this.counts = { //for auto-indexing... you'll see what I mean in render()
			"audio": 0,
			"video": 0,
			"image": 0
		};
		
		this.#canSetCDMSrc = false; //shek up for a description
		
		this.#allowedMIMEs = [
			"image/jpeg", "image/png",
			"video/mp4", "video/3gp",
			"audio/mp3", "audio/wav", "audio/ogg"
		];
	}
	
	//so in my Form implementation, I made it such that
	//if a function is passed to onSubmit props, then the form should do e.preventDefault
	//so I want to make an empty function which I will prolly fill later to pass to my form's onSubmit
	onSubmitForm = (evt) => {
		//evt has already been preventDefault-ed
		
		//first validating that the condition of ,, is true
		//the conditions that
		/*
			1. a mood must be set
			2. at least one of text, or a media must be added to mood
		*/
		
		const moodIsSet = !!(this.#VTBS["mood"]);
		const textIsSet = !!(this.#VTBS["log_text"]);
		const mediaDey = this.state.media.length > 0;
		
		//checking conditions... note the '!' in below lines
		//adding 'em to a list so that I'll just render it
		const list = [];
		if(!moodIsSet)
			list.push("You must select a mood... Yes, na by force");
		
		if( ! (textIsSet || mediaDey))
			list.push("You must add AT LEAST ONE of text, audio, video or picture");
		
		//if any of these conditions failed, this form shouldn't submit
		if( ! (moodIsSet && (textIsSet || mediaDey))) //gon return early next
			return this.setState({
				"notification": {
					'type': NotifType.RED,
					"values": list
				}
			});
		
		//TODO - firebase uploading
	}
	
	//this next function is for passing set values to the #VTBS field
	//two orders
	#passValue = (valName) => (valVal) => {
		if( ! (valName in this.#VTBS))
			throw new TypeError(`Prvnce ohh, the valName ${valName} is not a valid key for VTBS`);
		
		this.#VTBS[valName] = valVal;
	}
	
	addMedia = (type, blob) => {
		this.setState((prevState, prevProps) => {
			const copy = [...prevState.media];
			copy.push({type, blob});
			return {
				"media": copy
			};
		});
	}
	
	//next is an HOF with order of two... ohh, how helpful
	removeMedia = (idx) => (evt) => {
		//idx is for index to be removed, evt is for event handler
		this.setState((prevState, prevProps) => {
			const {media, CDM} = prevState;
			if((idx >= 0) && (idx < media.length)) {
				const amended = [...media.slice(0, idx), ...media.slice(idx + 1)];
				return {
					"media": amended,
					"CDM": (CDM && (CDM.blob === media[idx].blob)) ? null: CDM
				};
			}
			
			return prevState;
		});
	}
	
	setCDM = (idx) => (evt) => {
		//idx is for index to become CDM, evt is for event handler
		this.setState((prevState, prevProps) => {
			const toBe /*Aduuu*/ = prevState.media[idx];
			const {CDM} = prevState;
			if((CDM === null) || (CDM.blob !== toBe.blob)) //if it ain't already current one
				return {
					"CDM": toBe
				};
			
			return prevState;
		});
	}
	
	#setCDMNodeRef = (ref) => {
		this.#CDMNodeRef = ref;
	}
	
	UNSAFE_componentWillUpdate(nextProps, nextState) {
		const oldCDM = this.state.CDM, newCDM = nextState.CDM;
		if(newCDM !== null) { //for times when the MediaWidget removed is also the CDM, so newCDM becomes null
			const CDMIsWhatChanged = oldCDM && Object.keys(oldCDM).some(key => oldCDM[key] !== newCDM[key]);
			
			//however, oldCDM may be null the first time so gonna do some checks below
			if((oldCDM === null) || CDMIsWhatChanged)
				this.#canSetCDMSrc = true;
		}
	}
	
	render() {
		const {show, method, action} = this.props;
		const {media, CDM, notification} = this.state;
		
		return (
			<Modal show={show}>
				<Form modalStyle={true} onSubmit={this.onSubmitForm} method={method || "POST"} action={action}>
					<h2 className={CLMStyle["header"]}>Create Log</h2>
					<EmojiDropdown title="Mood" passValue={this.#passValue("mood")}/>
					
					<TwoInOne isRow={false /*pragmatics sake*/}>
						<AntManTextField title="Text" passValue={this.#passValue("log_text")}/>
						<div className="d-flex flex-row justify-content-end">
							<AudioRecorder addMedia={this.addMedia}/>
							<VideoRecorder addMedia={this.addMedia}/>
							<PicSnapper addMedia={this.addMedia}/>
						</div>
					</TwoInOne>
					{ //for list of recorded/uploaded media
						(media.length > 0) && (
							<div className={CLMStyle["media-list"]}>
								{
									media.map(({type}, i) => <MediaWidget key={i} type={type} title={`${type}${++this.counts[type]}`} onClickSmallBtn={this.removeMedia(i)} onClickBigBtn={this.setCDM(i)}/>)
								}
							</div>
						)
					}
					{ //for currently displayed media
						CDM &&
						(<div className={CLMStyle["CDM-container"]}>
							{
								(CDM.type === "video") ? (<video controls ref={this.#setCDMNodeRef}></video>) : (CDM.type === "audio") ? (<audio controls ref={this.#setCDMNodeRef}></audio>) : <img alt="Pishur that you clicked" ref={this.#setCDMNodeRef}/>
							}
						</div>)
					}
					
					{
						//notifications
						(notification.values.length > 0) && (
							<div className="red">
								{ notification.values.map((msg, i) => <span key={i}>* {msg}<br/></span>) }
							</div>
						)
					}
					
					<div className="d-flex justify-content-between align-items-center mb-5">
						<UploadBtn title="Upload" allowedMIMEs={this.#allowedMIMEs} addMedia={this.addMedia}/>
						<button type="submit" className={`${CLMStyle["submit-button"]} LL-bg-first w-auto rounded-pill text-light px-4 py-2`}>Post Log</button>
					</div>
				</Form>
			</Modal>
		);
	}
	
	componentDidUpdate() {
		//gon reset this.counts so that we can start anew next time
		const someCountsGreaterThanZero = Object.keys(this.counts).some(type => this.counts[type] > 0);
		if(someCountsGreaterThanZero)
			Object.keys(this.counts).forEach(type => this.counts[type] = 0);
		
		//next, setting CDMNodeRef src attribute only if state change was caused by CDM change
		if(this.#canSetCDMSrc && (this.#CDMNodeRef !== undefined)) {
			this.#CDMNodeRef.src = URL.createObjectURL(this.state.CDM.blob);
			this.#canSetCDMSrc = false; //turning off flag
		}
	}
}

CreateLogModal.propTypes = {
	"show": PropTypes.bool.isRequired,
	"method": PropTypes.string,
	"action": PropTypes.string
};