import UI from "./ui.js";

export default class Text extends UI{
  constructor(pos, str, style) {
    super(pos);
    const defaultStyle = { fontFamily: 'gkktt', fontSize: 50, fill: 0xffffff }
    style = style?style:defaultStyle;
    this.style = style;

    this.frame = 0;
    this.type="text";
    this.str = str; // text

    this.sprite = new PIXI.Text(str,style) ;
    this.sprite.scale.set(0.2);
    this.sprite.position = copy(this.pos);
  }
  setStyle(style){
    this.sprite.style = style;
  }
  ChangeText(text) {
    this.sprite.text = text;
  }
  SetPos(pos) {
    this.pos = copy(pos);
    this.sprite.position.x = pos.x;
    this.sprite.position.y = pos.y;
  }
  Update() {
    this.frame++;
    this.ExecuteEvent();
  }
}