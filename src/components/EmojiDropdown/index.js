import React, {Component} from "react";
import EDDStyle from "./EmojiDropdown.module.css";
import PropTypes from "prop-types";

export default class EmojiDropdown extends Component {
	
	#emojiArr;
	
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
		//gon be lifting state up tho, so form can be submitted
		this.state = {
			"curr": `Please Select A ${title}`,
			"isOpen": false
		};
	}
	
	#openDrop = () => this.setState({"isOpen": true});
	
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
					<div className={EDDStyle["always-visible"]} onBlur={() => this.#closeDrop()} onClick={() => this.#openDrop()} onMouseOver={() => this.#openDrop()} onMouseOut={() => this.#closeDrop()} onTouchStart={() => this.#openDrop()} onTouchEnd={() => this.#closeDrop()}>
						<span className={`${EDDStyle["text"]} ${EDDStyle["emoji"]}`}>{curr}</span>
						<span className={EDDStyle["arrow"]}>&#9660;</span>
					</div>
					<div className={`${EDDStyle["drop"]} ${(isOpen)? EDDStyle["drop-open"] : EDDStyle["drop-closed"]}`}>
						{this.#emojiArr.map((kini, key) => (
							<span key={key} onClick={() => this.#closeDrop(kini)}>{kini}</span>
						))}
					</div>
				</div>
			</div>
		);
	}
}

EmojiDropdown.propTypes = {
	"title": PropTypes.string.isRequired
}