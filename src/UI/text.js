import UI from "./ui.js";

export default class Text extends UI{
  constructor(pos, str, style) {
    super(pos);
    const defaultStyle = { fontFamily: 'gkktt', fontSize: 50, fill: 0xffffff};
    style = style?style:defaultStyle;
    /*基本情報*/
    this.name = "font";
    this.isAlive = true; //消えたらfalse
    this.frame = 0; //stagepopでしか使ってない
    /*スプライト*/
    this.str = str; //0~9
    this.sprite = new PIXI.Text(str,style) ;
    this.sprite.scale.set(0.2);
    this.sprite.position = copy(this.pos);
  }
  ChangeText(text) {
    this.sprite.updateText(text);
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