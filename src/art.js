class Art{
  constructor(){
    this.Player;
    this.teki1;
    this.teki2;
  }

  static Load(){
    this.Player = new PIXI.Sprite(PIXI.Texture.fromImage('img/hiyoko2.png'));
    this.teki1 = new PIXI.Sprite(PIXI.Texture.fromImage('img/kame2.png'));
    this.teki2 = new PIXI.Sprite(PIXI.Texture.fromImage('img/zou2.png'));
  }

}
