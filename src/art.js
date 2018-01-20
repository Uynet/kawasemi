import Game from './Game.js';

export default class Art{
  static Load(resources){
    /*Entity*/
    this.playerTexture = PIXI.utils.TextureCache["src/resource/img/player.png"];
    this.wallTexture = PIXI.utils.TextureCache["src/resource/img/wall.png"];
    this.teki2Texture = PIXI.utils.TextureCache["src/resource/img/teki2.png"];
    this.teki3Texture = PIXI.utils.TextureCache["src/resource/img/teki3.png"];
    this.bulletTexture = PIXI.utils.TextureCache["src/resource/img/bullet.png"];
    this.bullet2Texture = PIXI.utils.TextureCache["src/resource/img/bullet2.png"];
    this.unkoTexture = PIXI.utils.TextureCache["src/resource/img/unko.png"];
    /*UI*/
    this.weapon1Texture = PIXI.utils.TextureCache["src/resource/img/weapon1.png"];
    this.weapon2Texture = PIXI.utils.TextureCache["src/resource/img/weapon2.png"];
    this.weapon3Texture = PIXI.utils.TextureCache["src/resource/img/weapon3.png"];
    this.weaponEquip = PIXI.utils.TextureCache["src/resource/img/weaponEquip.png"];
    this.selectboxTexture = PIXI.utils.TextureCache["src/resource/img/selectbox.png"];
    /*Effect*/
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];

    /*Pttern*/
    this.playerPattern = [
      PIXI.Texture.fromFrame('player00.png'),
      PIXI.Texture.fromFrame('player01.png'),
      PIXI.Texture.fromFrame('player02.png'),
      PIXI.Texture.fromFrame('player03.png'),
      PIXI.Texture.fromFrame('player1.png'),
      PIXI.Texture.fromFrame('player2.png'),
      PIXI.Texture.fromFrame('player3.png')
    ];
  }

  static async LoadTexture(){
    let loader = PIXI.loader;
    await new Promise((res)=>loader
      .add('pattern','src/resource/img/playerPattern.json')
      .add('src/resource/img/player.png')
      .add('src/resource/img/wall.png')
      .add('src/resource/img/teki2.png')
      .add('src/resource/img/teki3.png')
      .add('src/resource/img/bullet.png')
      .add('src/resource/img/bullet2.png')
      .add('src/resource/img/unko.png')
      .add('src/resource/img/weapon1.png')
      .add('src/resource/img/weapon2.png')
      .add('src/resource/img/weapon3.png')
      .add('src/resource/img/weaponEquip.png')
      .add('src/resource/img/selectbox.png')
      .add('src/resource/effect/dark.png')
      .load((loader,resources)=>Art.Load(resources)).onComplete.add(res));
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}


