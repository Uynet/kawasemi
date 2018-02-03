import Game from './Game.js';

export default class Art{
  static Load(resources){
    /*Entity*/
    //cl(PIXI.utils.TextureCache);
    /*Effect*/
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];
    /*Pttern*/
    /*forにして*/
    this.playerPattern = [
      PIXI.Texture.fromFrame('player00.png'),
      PIXI.Texture.fromFrame('player01.png'),
      PIXI.Texture.fromFrame('player02.png'),
      PIXI.Texture.fromFrame('player03.png'),
      PIXI.Texture.fromFrame('player04.png'),
      PIXI.Texture.fromFrame('player05.png'),
      PIXI.Texture.fromFrame('player06.png'),
      PIXI.Texture.fromFrame('player07.png'),
      PIXI.Texture.fromFrame('player10.png'),
      PIXI.Texture.fromFrame('player11.png'),
      PIXI.Texture.fromFrame('player12.png'),
      PIXI.Texture.fromFrame('player13.png'),
      PIXI.Texture.fromFrame('player14.png'),
      PIXI.Texture.fromFrame('player15.png'),
      PIXI.Texture.fromFrame('player16.png'),
      PIXI.Texture.fromFrame('player17.png'),
      PIXI.Texture.fromFrame('player20.png'),
      PIXI.Texture.fromFrame('player21.png'),
      PIXI.Texture.fromFrame('player22.png'),
      PIXI.Texture.fromFrame('player23.png'),
      PIXI.Texture.fromFrame('player24.png'),
      PIXI.Texture.fromFrame('player25.png'),
      PIXI.Texture.fromFrame('player26.png'),
      PIXI.Texture.fromFrame('player27.png'),
      PIXI.Texture.fromFrame('player30.png'),
      PIXI.Texture.fromFrame('player31.png'),
      PIXI.Texture.fromFrame('player32.png'),
      PIXI.Texture.fromFrame('player33.png'),
      PIXI.Texture.fromFrame('player34.png'),
      PIXI.Texture.fromFrame('player35.png'),
      PIXI.Texture.fromFrame('player36.png'),
      PIXI.Texture.fromFrame('player37.png')
    ];
    this.UIPattern = [
      PIXI.Texture.fromFrame('weapon00.png'),
      PIXI.Texture.fromFrame('weapon01.png'),
      PIXI.Texture.fromFrame('weapon02.png'),
      PIXI.Texture.fromFrame('weapon10.png'),
      PIXI.Texture.fromFrame('weapon11.png'),
      PIXI.Texture.fromFrame('weapon12.png'),
      PIXI.Texture.fromFrame('selectbox.png'),
      PIXI.Texture.fromFrame('HP00.png'),
      PIXI.Texture.fromFrame('HP01.png')
    ];
    this.bulletPattern = [
      PIXI.Texture.fromFrame('bullet00.png'),
      PIXI.Texture.fromFrame('bullet10.png'),
      PIXI.Texture.fromFrame('bullet20.png'),
      PIXI.Texture.fromFrame('bullet30.png'),//Target
      PIXI.Texture.fromFrame('bullet40.png'),//bullet shot
      PIXI.Texture.fromFrame('bullet41.png'),//bullet shot
      PIXI.Texture.fromFrame('bullet42.png'),//bullet shot
      PIXI.Texture.fromFrame('bullet43.png'),//bullet shot
      PIXI.Texture.fromFrame('bullet50.png'),//bullet hit at wall
      PIXI.Texture.fromFrame('bullet51.png'),//bullet hit at wall
      PIXI.Texture.fromFrame('bullet52.png'),//bullet hit at wall
      PIXI.Texture.fromFrame('bullet53.png'),//bullet hit at wall
      PIXI.Texture.fromFrame('bullet60.png'),//bullet blur
      PIXI.Texture.fromFrame('bullet61.png'),//bullet blur
      PIXI.Texture.fromFrame('bullet62.png'),//bullet blur
      PIXI.Texture.fromFrame('bullet63.png') //bullet blur
    ];
    this.enemyPattern = [
      PIXI.Texture.fromFrame('enemy00.png'),
      PIXI.Texture.fromFrame('enemy01.png'),
      PIXI.Texture.fromFrame('enemy02.png'),
      PIXI.Texture.fromFrame('enemy03.png')
    ];
    this.wallPattern = [
      PIXI.Texture.fromFrame('wall00.png'),
      PIXI.Texture.fromFrame('wall01.png'),
      PIXI.Texture.fromFrame('wall20.png'),
      PIXI.Texture.fromFrame('wall21.png'),
      PIXI.Texture.fromFrame('wall22.png'),
      PIXI.Texture.fromFrame('wall23.png'),
      PIXI.Texture.fromFrame('wall24.png'),
      PIXI.Texture.fromFrame('wall25.png'),
      PIXI.Texture.fromFrame('wall26.png'),
      PIXI.Texture.fromFrame('wall60.png'),
      PIXI.Texture.fromFrame('wall61.png'),
      PIXI.Texture.fromFrame('wall62.png'),
      PIXI.Texture.fromFrame('wall63.png'),
      PIXI.Texture.fromFrame('wall64.png'),
      PIXI.Texture.fromFrame('wall65.png'),
      PIXI.Texture.fromFrame('wall66.png'),
      PIXI.Texture.fromFrame('wall70.png'),
      PIXI.Texture.fromFrame('wall71.png'),
      PIXI.Texture.fromFrame('wall72.png'),
      PIXI.Texture.fromFrame('wall73.png'),
      PIXI.Texture.fromFrame('wall74.png'),
      PIXI.Texture.fromFrame('wall75.png'),
      PIXI.Texture.fromFrame('wall76.png'),
      PIXI.Texture.fromFrame('wall80.png'),
      PIXI.Texture.fromFrame('wall81.png'),
      PIXI.Texture.fromFrame('wall82.png'),
      PIXI.Texture.fromFrame('wall83.png'),
      PIXI.Texture.fromFrame('wall84.png'),
      PIXI.Texture.fromFrame('wall85.png'),
      PIXI.Texture.fromFrame('wall86.png'),
    ];
  }

  static async LoadTexture(){
    let loader = PIXI.loader;
    await new Promise((res)=>loader
      .add('pattern','src/resource/img/playerPattern.json')
      .add('pattern2','src/resource/img/UIPattern.json')
      .add('pattern3','src/resource/img/bulletPattern.json')
      .add('pattern4','src/resource/img/enemyPattern.json')
      .add('pattern5','src/resource/img/wallPattern.json')
      .add('src/resource/effect/dark.png')
      .load((loader,resources)=>Art.Load(resources)).onComplete.add(res));
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}


