import React, {Component} from "react";
import EDDStyle from "./EmojiDropdown.module.css";
import PropTypes from "prop-types";

export default class EmojiDropdown extends Component {
	
	#emojiArr;
	#defaultText; //what to show when no emoji has been picked
	
	constructor(props) {
		super(props);
		//setting up emoji arr
		this.#emojiArr = /*there's a ".split() at the end of this*/`
			😀 😃 😄 😁 😆 😅 😂 🤣 😭 😉 😗 😙 😚 😘 🥰 😍 🤩 🥳
			🙃 🙂  😊 ☺️ 😌 😏 😴 😪 🤤 😋 😛 😝 😜 🤪 🥴 😔 🥺
			😬 😑 😐 😶 🤐 🤔 🤫 🤭 🥱 🤗 😱 🤨 🧐 😒 🙄 😤 😠 😡
			🤬 😞 😓 😟 😥 😢 ☹️ 🙁 😕 😰 😨 😧 😦 😮 😯 😲 😳 🤯
			😖 😣 😩 😫 😵 🥶 🥵 🤢 🤮 🤧 🤒 🤕 😷 🤥 😇 🤠 🤑 🤓
			😎  🤡 😈 👿 💩 👽 🌚 🌝 ☠️ 💯 🙈 🙉 🙊 👀 💀 💪 💔
			👍 👎 ✊ 🤘 ✌️ 🤏 👌 🖕 🤦 💆 🧘 🛌 🙆
		`.replace(/(\n|\t)+/, ' ').split(/\s+/);
		
		const {title} = props;
		this.#defaultText = `Please Select A ${title}`;
		//gon be lifting state up tho, so form can be submitted
		this.state = {
			"curr": this.#defaultText,
			"isOpen": false
		};
	}
	
	#openDrop = () => this.setState({"isOpen": true});
	
	//this next func sets the 'curr' state (if 'kini' is passed)
	//as well as close the dropdown
	#closeDrop = (kini) => {
		this.setState(prevState => {
			return {
				"curr": kini || prevState.curr,
				"isOpen": false
			};
		});
	}
	
	render() {
		const {title} = this.props;
		const {curr, isOpen} = this.state;
		return (
			<div className={EDDStyle["whole-kini"]}>
				<span className="LLtext">{title}</span><br/>
				<div className={EDDStyle["dropdown"]}>
					<div className={EDDStyle["always-visible"]} onClick={() => (isOpen) ? this.#closeDrop() : this.#openDrop()} onTouchStart={() => this.#openDrop()} onTouchEnd={() => this.#closeDrop()}>
						<span className={`${EDDStyle["text"]} ${EDDStyle["emoji"]}`}>{curr}</span>
						<span className={EDDStyle["arrow"]}>&#9660;</span>
					</div>
					<div className={`${EDDStyle["drop"]} ${(isOpen)? EDDStyle["drop-open"] : EDDStyle["drop-closed"]}`}>
						{this.#emojiArr.map((kini, key) => (
							<span key={key} className={EDDStyle["emoji-in-list"]} onClick={() => this.#closeDrop(kini)}>{kini}</span>
						))}
					</div>
				</div>
			</div>
		);
	}
	
	//next is, after componentDidUpdate a.k.a state/prop change... I wanna send its val to parent component
	//use case for arised because this component was used in a modal form where form had to collate its value
	//but I still wanted this component to manage its own state
	componentDidUpdate() {
		let selected;
		if((selected = this.state.curr) !== this.#defaultText) {
			const {passValue} = this.props;
			passValue(selected);
		}
	}
}

EmojiDropdown.propTypes = {
	"title": PropTypes.string.isRequired,
	"passValue": PropTypes.func.isRequired
}