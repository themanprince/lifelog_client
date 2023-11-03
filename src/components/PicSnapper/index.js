import React, {Component} from "react";
import Video from "./Video";

const WAIT_TIME = 1000; /*how long the pic gon show after snapping till I remove it*/

/*a stream class, the solution to it all eversince*/
class Stream {
	static stream = null;
	
	static setupStream = async function() {
		
		const {mediaDevices} = navigator;
		if(! (mediaDevices && mediaDevices.getUserMedia))
			return false;
		
		
		if(!Stream.stream)
			try {
				const constraints = {
					"audio": false,
					"video": true
				};
				
				Stream.stream = await mediaDevices.getUserMedia(constraints);
				
				return Stream.stream;
				
			} catch(err) {
				return false;
			}
		
	}
	
	static endStream() {
		Stream.stream.getTracks().forEach(track => track.stop());
		Stream.stream = null;
	}
}

export default class PicSnapper extends Component {
	
	VideoRef;
	CanvasRef;
	ImgRef
	#snappedBlob;

	constructor(props) {
		super(props);
		
		this.state = {
			"videoDisplay": "none",
			"canRecord": true,
			"showImage": false
		};
		
		//setting up dem passer methods
		["Video", "Canvas", "Img"].forEach((kini) => {
			this[`pass${kini}Ref`] = (ref) => this[`${kini}Ref`] = ref;
		});
	}
	

	#onClickSmallButton = async (e /*just being pragmatic*/) => {

		let stream;
		if(/*note the single equals = and the ! */ !(stream = await Stream.setupStream()))
			return this.setState({
				"canRecord": false
			});
		
		this.VideoRef.srcObject = stream; /*VideoRed field should have been set in constructor*/
		
		this.setState({
			"videoDisplay": "flex"
		});
		
	}
	
	#onClickBigButton = async (e /*just being pragmatic*/) => {
		const width = this.VideoRef.getBoundingClientRect().width;
		const height = this.VideoRef.getBoundingClientRect().height;
		const cv = this.CanvasRef, vid = this.VideoRef;
		
		cv.width = width;
		cv.height = height;
		const context = cv.getContext("2d");
		context.drawImage(vid, 0, 0, width, height);
		
		//saving blob
		this.#snappedBlob = await (new Promise((res, rej) => cv.toBlob(res)));
		
		//setting the parent state to indicate new media
		this.props.addMedia("img", this.#snappedBlob);
		
		
		//handling display of the image since pic has been taken
		this.setState({
			"showImage": true
		});
		
	}
	
	render() {
		const {videoDisplay, canRecord, showImage} = this.state;
		
		return (
			<div>
				<div className="media-icon">
					<i className="bi-camera-fill" onClick={this.#onClickSmallButton}></i>
				</div>
				<canvas style={{"display": "none"}} ref={(ref) => this.passCanvasRef(ref)}></canvas>
				{
					(canRecord) ? <Video display={videoDisplay} onClick={this.#onClickBigButton} showImage={showImage} passImgRef={this.passImgRef} passVideoRef={this.passVideoRef}/> : <span className="LLtext text-danger">Unable to Record</span> 
				}
			</div>
		);
	}
	
	componentDidUpdate() {
		//if changing the state to showImage was what caused the render,
		//then handle the image content since it has mounted
		if(this.state.showImage) {
			Stream.endStream(); //ending the stream
			
			this.ImgRef.setAttribute("src", this.CanvasRef.toDataURL("image/jpg"));
		
			const fn /*timeout funtion*/ = () => {
				this.setState({
					"videoDisplay": "none",
					"showImage": false
				});
			}
			
			setTimeout(fn, WAIT_TIME);
		}
	}
}
