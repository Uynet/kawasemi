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
      PIXI.Texture.fromFrame('player00.png'),//0
      PIXI.Texture.fromFrame('player01.png'),//1
      PIXI.Texture.fromFrame('player02.png'),//2
      PIXI.Texture.fromFrame('player03.png'),//3
      PIXI.Texture.fromFrame('player04.png'),//4
      PIXI.Texture.fromFrame('player05.png'),//5
      PIXI.Texture.fromFrame('player06.png'),//6
      PIXI.Texture.fromFrame('player07.png'),//7
      PIXI.Texture.fromFrame('player10.png'),//8
      PIXI.Texture.fromFrame('player11.png'),//9
      PIXI.Texture.fromFrame('player12.png'),//10
      PIXI.Texture.fromFrame('player13.png'),//11
      PIXI.Texture.fromFrame('player14.png'),//12
      PIXI.Texture.fromFrame('player15.png'),//13
      PIXI.Texture.fromFrame('player16.png'),//14
      PIXI.Texture.fromFrame('player17.png'),//15
      PIXI.Texture.fromFrame('player20.png'),//16
      PIXI.Texture.fromFrame('player21.png'),//17
      PIXI.Texture.fromFrame('player22.png'),//18
      PIXI.Texture.fromFrame('player23.png'),//19
      PIXI.Texture.fromFrame('player24.png'),//20
      PIXI.Texture.fromFrame('player25.png'),//21
      PIXI.Texture.fromFrame('player26.png'),//22
      PIXI.Texture.fromFrame('player27.png'),//23
      PIXI.Texture.fromFrame('player30.png'),//24
      PIXI.Texture.fromFrame('player31.png'),//25
      PIXI.Texture.fromFrame('player32.png'),//26
      PIXI.Texture.fromFrame('player33.png'),//27
      PIXI.Texture.fromFrame('player34.png'),//28
      PIXI.Texture.fromFrame('player35.png'),//29
      PIXI.Texture.fromFrame('player36.png'),//30
      PIXI.Texture.fromFrame('player37.png'),//31
      PIXI.Texture.fromFrame('player40.png'),//32 死亡エフェクト
      PIXI.Texture.fromFrame('player41.png'),//33 死亡エフェクト
      PIXI.Texture.fromFrame('player42.png'),//34 死亡エフェクト
      PIXI.Texture.fromFrame('player43.png'),//35 死亡エフェクト
      PIXI.Texture.fromFrame('player44.png'),//36 死亡エフェクト
      PIXI.Texture.fromFrame('player45.png'),//37 死亡エフェクト
      PIXI.Texture.fromFrame('player46.png'),//38 死亡エフェクト
      PIXI.Texture.fromFrame('player47.png'),//39  死亡エフェクト
      PIXI.Texture.fromFrame('player50.png'),//40 ジャンプ
      PIXI.Texture.fromFrame('player51.png'),//41 
      PIXI.Texture.fromFrame('player52.png'),//42 
      PIXI.Texture.fromFrame('player53.png'),//43 
      PIXI.Texture.fromFrame('player54.png'),//44 
      PIXI.Texture.fromFrame('player55.png'),//45 
      PIXI.Texture.fromFrame('player56.png'),//46 
      PIXI.Texture.fromFrame('player57.png')//47  
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

    this.seqPattern = [
      PIXI.Texture.fromFrame('seq00.png'),
      PIXI.Texture.fromFrame('seq01.png'),
      PIXI.Texture.fromFrame('seq02.png'),
      PIXI.Texture.fromFrame('seq03.png'),
      PIXI.Texture.fromFrame('seq04.png'),
      PIXI.Texture.fromFrame('seq05.png'),
      PIXI.Texture.fromFrame('seq06.png'),
      PIXI.Texture.fromFrame('seq07.png'),
      PIXI.Texture.fromFrame('seq10.png'),
      PIXI.Texture.fromFrame('seq11.png'),
      PIXI.Texture.fromFrame('seq12.png'),
      PIXI.Texture.fromFrame('seq13.png'),
      PIXI.Texture.fromFrame('seq14.png'),
      PIXI.Texture.fromFrame('seq15.png'),
      PIXI.Texture.fromFrame('seq16.png'),
      PIXI.Texture.fromFrame('seq17.png'),
      PIXI.Texture.fromFrame('seq20.png'),
      PIXI.Texture.fromFrame('seq21.png'),
      PIXI.Texture.fromFrame('seq22.png'),
      PIXI.Texture.fromFrame('seq23.png'),
      PIXI.Texture.fromFrame('seq24.png'),
      PIXI.Texture.fromFrame('seq25.png'),
      PIXI.Texture.fromFrame('seq26.png'),
      PIXI.Texture.fromFrame('seq27.png'),
      PIXI.Texture.fromFrame('seq30.png'),
      PIXI.Texture.fromFrame('seq31.png'),
      PIXI.Texture.fromFrame('seq32.png'),
      PIXI.Texture.fromFrame('seq33.png'),
      PIXI.Texture.fromFrame('seq34.png'),
      PIXI.Texture.fromFrame('seq35.png'),
      PIXI.Texture.fromFrame('seq36.png'),
      PIXI.Texture.fromFrame('seq37.png')
    ];

    this.font = [
      PIXI.Texture.fromFrame('font00.png'),
      PIXI.Texture.fromFrame('font01.png'),
      PIXI.Texture.fromFrame('font02.png'),
      PIXI.Texture.fromFrame('font03.png'),
      PIXI.Texture.fromFrame('font04.png'),
      PIXI.Texture.fromFrame('font05.png'),
      PIXI.Texture.fromFrame('font06.png'),
      PIXI.Texture.fromFrame('font07.png'),
      PIXI.Texture.fromFrame('font08.png'),
      PIXI.Texture.fromFrame('font09.png'),
      PIXI.Texture.fromFrame('font0a.png'),
    ]
  }

  static async LoadTexture(){
    let loader = PIXI.loader;
    await new Promise((res)=>loader
      .add('pattern','src/resource/img/playerPattern.json')
      .add('pattern2','src/resource/img/UIPattern.json')
      .add('pattern3','src/resource/img/bulletPattern.json')
      .add('pattern4','src/resource/img/enemyPattern.json')
      .add('pattern5','src/resource/img/wallPattern.json')
      .add('pattern6','src/resource/img/seqPattern.json')
      .add('pattern7','src/resource/img/font.json')
      .add('src/resource/effect/dark.png')
      .load((loader,resources)=>Art.Load(resources)).onComplete.add(res));
  }

  static SpriteFactory(texture){
    return new PIXI.Sprite(texture);
  }
}


