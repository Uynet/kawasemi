import Game from './Game.js';

let playerTexture;
export default class Art{
  static TestPoyoPoyo(){
      this.playerTexture = PIXI.utils.TextureCache.p;
      //this.playerTexture = PIXI.Texture.fromImage('src/resource/img/player.png');
      this.wallTexture = PIXI.utils.TextureCache["src/resource/img/wall.png"];
      this.teki2Texture = PIXI.utils.TextureCache["src/resource/img/wall.png"];
      this.unko = true;
  }

  static async LoadTexture(){
    await new Promise((res,rej)=>PIXI.loader
      .add('p','src/resource/img/player.png')
      .add('src/resource/img/wall.png')
      .add('src/resource/img/teki2.png')
      .load().onLoad.add(res)
    );
    Art.TestPoyoPoyo();
    return new Promise((reso)=>{
    /*Pattern*/

    /*Entity*/
    this.unko = false;
    this.teki3Texture = PIXI.Texture.fromImage('src/resource/img/teki3.png');
    this.bulletTexture = PIXI.Texture.fromImage('src/resource/img/bullet.png');
    this.bullet2Texture = PIXI.Texture.fromImage('src/resource/img/bullet2.png');
    this.unkoTexture = PIXI.Texture.fromImage('src/resource/img/unko.png');

    /*UI*/
    this.weapon1Texture = PIXI.Texture.fromImage('src/resource/img/weapon1.png');
    this.weapon2Texture = PIXI.Texture.fromImage('src/resource/img/weapon2.png');
    this.weapon3Texture = PIXI.Texture.fromImage('src/resource/img/weapon3.png');
    this.weaponEquip = PIXI.Texture.fromImage('src/resource/img/weaponEquip.png');
    this.selectboxTexture = PIXI.Texture.fromImage('src/resource/img/selectbox.png');

    /*Effect*/
    this.darkTexture = PIXI.Texture.fromImage('src/resource/effect/dark.png');

    reso();
    });
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}


