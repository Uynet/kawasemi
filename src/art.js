export default class Art{
  constructor(){
    this.playerTexture;
    this.teki1Texture;
    this.teki2Texture;
  }

  static LoadTexture(){
    this.playerTexture = PIXI.Texture.fromImage('resource/img/player.png');
    this.wallTexture = PIXI.Texture.fromImage('resource/img/wall.png');
    this.teki2Texture = PIXI.Texture.fromImage('resource/img/teki2.png');
    this.teki3Texture = PIXI.Texture.fromImage('resource/img/teki3.png');
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}

