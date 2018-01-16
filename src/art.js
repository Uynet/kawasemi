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
    this.bulletTexture = PIXI.Texture.fromImage('resource/img/bullet.png');
    this.weapon1Texture = PIXI.Texture.fromImage('resource/img/weapon1.png');
    this.weapon2Texture = PIXI.Texture.fromImage('resource/img/weapon2.png');
    this.weapon3Texture = PIXI.Texture.fromImage('resource/img/weapon3.png');
    this.selectboxTexture = PIXI.Texture.fromImage('resource/img/selectbox.png');
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}

