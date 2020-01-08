import UI from "../ui.js";
import Art from "../../art.js";
import Input from "../../input.js";
import Audio from "../../audio.js";

export default class Key extends UI {
  /*keyname : Z X C Right Left Up Down */
  constructor(pos, keyname) {
    super(pos);
    this.keyname = keyname;
    this.keyCode = this.KeyNameToCode(keyname);
    this.sprite = Art.Sprite(Art.UIPattern.key[keyname][0]);
    this.sprite.position = pos;
    this.frame = 0;
  }
  KeyNameToCode(keyname) {
    return KEY[keyname];
  }
  Update() {
    const spid = Input.isKeyInput(this.keyCode) ? 1 : 0;
    this.sprite.texture = Art.UIPattern.key[this.keyname][spid];
    if (Input.isKeyClick(this.keyCode)) Audio.PlaySE("landing1", 1.5, 1.5);
  }
}
