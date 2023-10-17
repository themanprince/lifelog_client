import React, {Component} from "react";
import EDDStyle from "./EmojiDropdown.module.css";

export default class EmojiDropdown extends Component {
	
	#emojiArr;
	
	constructor(props) {
		super(props);
		//setting up emoji arr
		this.#emojiArr = /*there's a ".split() at the end of this*/`
			😀 😃 😄 😁 😆 😅 😂 🤣 😭 😉 😗 😙 😚 😘 🥰 😍 🤩 🥳
			🙃 🙂 🥲 😊 ☺️ 😌 😏 😴 😪 🤤 😋 😛 😝 😜 🤪 🥴 😔 🥺
			😬 😑 😐 😶 🤐 🤔 🤫 🤭 🥱 🤗 😱 🤨 🧐 😒 🙄 😤 😠 😡
			🤬 😞 😓 😟 😥 😢 ☹️ 🙁 😕 😰 😨 😧 😦 😮 😯 😲 😳 🤯
			😖 😣 😩 😫 😵 🥶 🥵 🤢 🤮 🤧 🤒 🤕 😷 🤥 😇 🤠 🤑 🤓
			😎 🥸 🤡 😈 👿 💩 👽 🌚 🌝 ☠️ 💯 🙈 🙉 🙊 👀 💀 💪 💔
			👍 👎 ✊ 🤘 ✌️ 🤏 👌 🖕 🤦 💆 🧘 🛌 🙆
		`.replace(/(\n|\t)+/, ' ').split(/\s+/);
		
		const {title} = props;
		//gon be lifting state up tho, so form can be submitted
		this.state = {
			"curr": `Please Select A ${title}`
		};
	}
	
	/*#closeFunc = (e) => {
		//first check if it was an emoji that was clicked or it was dropdown button
		const {textContent} = e.target;
		if(textContent && (textContent in this.#emojiArr))
			
	}
	*/
	render() {
		const {title} = this.props;
		const {curr} = this.state;
		return (
			<div className={EDDStyle["whole-kini"]}>
				<span className={EDDStyle["text"]}>{title}</span><br/>
				<div className={EDDStyle["dropdown-pane"]} /*onClick={this.#closeFunc}*/>
					<div className={EDDStyle["always-visible"]}>
						<span className={`${EDDStyle["text"]} ${EDDStyle["emoji"]}`}>{curr}</span>
						<span className={EDDStyle["arrow"]}>&#9660;</span>
					</div>
					<div className={EDDStyle["drop"]}>
						{this.#emojiArr.map((kini, key) => (
							<span key={key} onClick={() => this.setState({"curr": kini})}>{kini}</span>
						))}
					</div>
				</div>
			</div>
		);
	}
}