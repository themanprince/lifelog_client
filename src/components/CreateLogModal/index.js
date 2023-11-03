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
	
	counts;
	#CDMNodeRef; //ref of node element of currently displayed media
	#canSetCDMSrc; //will be set to true once CDM is changed, so that src can be set for the new media element
	
	constructor(props) {
		super(props);
		
		this.state = {
			"media": [], //list of recorded/uploaded media
			"CDM": null //currently displayed media
		};
		
		this.counts = { //for auto-indexing... you'll see what I mean in render()
			"audio": 0,
			"video": 0,
			"img": 0
		};
		
		this.#canSetCDMSrc = false;
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
	
	//next is an HOF with order of two
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
		const {media, CDM} = this.state;
		
		return (
			<Modal show={show}>
				<Form modalStyle={true} method={method || "POST"} action={action}>
					<h2 className={CLMStyle["header"]}>Create Log</h2>
					<EmojiDropdown title="Mood"/>
					
					<TwoInOne isRow={false /*pragmatics sake*/}>
						<AntManTextField title="Text"/>
						<div className="d-flex flex-row justify-content-end">
							<AudioRecorder addMedia={this.addMedia}/>
							<VideoRecorder addMedia={this.addMedia}/>
							<PicSnapper addMedia={this.addMedia}/>
						</div>
					</TwoInOne>
					{
						(media.length > 0) && (
							<div className={CLMStyle["media-list"]}>
								{
									media.map(({type}, i) => <MediaWidget key={i} type={type} title={`${type}${++this.counts[type]}`} onClickSmallBtn={this.removeMedia(i)} onClickBigBtn={this.setCDM(i)}/>)
								}
							</div>
						)
					}
					
					{
						CDM &&
						(<div className={CLMStyle["CDM-container"]}>
							{
								(CDM.type === "video") ? (<video controls ref={this.#setCDMNodeRef}></video>) : (CDM.type === "audio") ? (<audio controls ref={this.#setCDMNodeRef}></audio>) : <img alt="Pishur that you clicked" ref={this.#setCDMNodeRef}/>
							}
						</div>)
					}
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
			this.#CDMNodeRef.src = this.state.CDM.blob; //TODO
			this.#canSetCDMSrc = false; //turning off flag
		}
	}
}

CreateLogModal.propTypes = {
	"show": PropTypes.bool.isRequired,
	"method": PropTypes.string,
	"action": PropTypes.string
};