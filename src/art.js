import Game from './Game.js';

export default class Art{
  static Load(resources){
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];
    /*forにして*/
    this.playerPattern = {
      runR : [
        PIXI.Texture.fromFrame('player00.png'),//0
        PIXI.Texture.fromFrame('player01.png'),//1
        PIXI.Texture.fromFrame('player02.png'),//2
        PIXI.Texture.fromFrame('player03.png'),//3
        PIXI.Texture.fromFrame('player04.png'),//3
        PIXI.Texture.fromFrame('player05.png'),//3
      ],
      runL : [
        PIXI.Texture.fromFrame('player06.png'),//4
        PIXI.Texture.fromFrame('player07.png'),//5
        PIXI.Texture.fromFrame('player08.png'),//6
        PIXI.Texture.fromFrame('player09.png'),//7
        PIXI.Texture.fromFrame('player0a.png'),//7
        PIXI.Texture.fromFrame('player0b.png'),//7
      ],
      runUR : [
        PIXI.Texture.fromFrame('player10.png'),//8
        PIXI.Texture.fromFrame('player11.png'),//9
        PIXI.Texture.fromFrame('player12.png'),//10
        PIXI.Texture.fromFrame('player13.png'),//11
        PIXI.Texture.fromFrame('player14.png'),//11
        PIXI.Texture.fromFrame('player15.png'),//11
      ],
      runUL : [
        PIXI.Texture.fromFrame('player10.png'),//8
        PIXI.Texture.fromFrame('player11.png'),//9
        PIXI.Texture.fromFrame('player12.png'),//10
        PIXI.Texture.fromFrame('player13.png'),//11
        PIXI.Texture.fromFrame('player14.png'),//11
        PIXI.Texture.fromFrame('player15.png'),//11
      ],
      runDR : [
        PIXI.Texture.fromFrame('player16.png'),//12
        PIXI.Texture.fromFrame('player17.png'),//13
        PIXI.Texture.fromFrame('player18.png'),//14
        PIXI.Texture.fromFrame('player19.png'),//15
        PIXI.Texture.fromFrame('player1a.png'),//11
        PIXI.Texture.fromFrame('player1b.png'),//11
      ],
      runDL : [
        PIXI.Texture.fromFrame('player16.png'),//12
        PIXI.Texture.fromFrame('player17.png'),//13
        PIXI.Texture.fromFrame('player18.png'),//14
        PIXI.Texture.fromFrame('player19.png'),//15
        PIXI.Texture.fromFrame('player1a.png'),//11
        PIXI.Texture.fromFrame('player1b.png'),//11
      ],
      waitR :[
        PIXI.Texture.fromFrame('player20.png'),//16
        PIXI.Texture.fromFrame('player21.png'),//17
        PIXI.Texture.fromFrame('player22.png'),//18
        PIXI.Texture.fromFrame('player23.png'),//19
      ],
      waitL : [
        PIXI.Texture.fromFrame('player24.png'),//20
        PIXI.Texture.fromFrame('player25.png'),//21
        PIXI.Texture.fromFrame('player26.png'),//22
        PIXI.Texture.fromFrame('player27.png'),//23
      ],
      //上向き右
      waitUR : [
        PIXI.Texture.fromFrame('player30.png'),//24
        PIXI.Texture.fromFrame('player31.png'),//25
        PIXI.Texture.fromFrame('player32.png'),//26
        PIXI.Texture.fromFrame('player33.png'),//27
      ],
      //上向き左
      waitUL : [
        PIXI.Texture.fromFrame('player34.png'),//24
        PIXI.Texture.fromFrame('player35.png'),//25
        PIXI.Texture.fromFrame('player36.png'),//26
        PIXI.Texture.fromFrame('player37.png'),//27
      ],
      waitDR : [
        PIXI.Texture.fromFrame('player38.png'),//28
        PIXI.Texture.fromFrame('player39.png'),//29
        PIXI.Texture.fromFrame('player3a.png'),//30
        PIXI.Texture.fromFrame('player3b.png'),//31
      ],
      waitDL : [
        PIXI.Texture.fromFrame('player3c.png'),//28
        PIXI.Texture.fromFrame('player3d.png'),//29
        PIXI.Texture.fromFrame('player3e.png'),//30
        PIXI.Texture.fromFrame('player3f.png'),//31
      ],
      dying : [
        PIXI.Texture.fromFrame('player40.png'),//32 死亡エフェクト
        PIXI.Texture.fromFrame('player41.png'),//33 死亡エフェクト
        PIXI.Texture.fromFrame('player42.png'),//34 死亡エフェクト
        PIXI.Texture.fromFrame('player43.png'),//35 死亡エフェクト
        PIXI.Texture.fromFrame('player44.png'),//36 死亡エフェクト
        PIXI.Texture.fromFrame('player45.png'),//37 死亡エフェクト
        PIXI.Texture.fromFrame('player46.png'),//38 死亡エフェクト
        PIXI.Texture.fromFrame('player47.png'),//39  死亡エフェクト
      ],
      jumpR : [
        PIXI.Texture.fromFrame('player50.png'),//40 ジャンプ
        PIXI.Texture.fromFrame('player51.png'),//41 
        PIXI.Texture.fromFrame('player52.png'),//42 
        PIXI.Texture.fromFrame('player53.png'),//43 
      ],
      jumpL : [
        PIXI.Texture.fromFrame('player54.png'),//44 
        PIXI.Texture.fromFrame('player55.png'),//45 
        PIXI.Texture.fromFrame('player56.png'),//46 
        PIXI.Texture.fromFrame('player57.png')//47  
      ]
    };
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
    this.bulletPattern = {
      bullet1 : [
        PIXI.Texture.fromFrame('bullet00.png'),
      ],
      bullet2 : [
        PIXI.Texture.fromFrame('bullet10.png'),
      ],
      bullet3 : [
        PIXI.Texture.fromFrame('bullet20.png'),
      ],
      target : [
        PIXI.Texture.fromFrame('bullet30.png'),//Target
      ],
      shot : [
        PIXI.Texture.fromFrame('bullet40.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet41.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet42.png'),//bullet shot
        PIXI.Texture.fromFrame('bullet43.png'),//bullet shot
      ],
      hitWall : [
        PIXI.Texture.fromFrame('bullet50.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet51.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet52.png'),//bullet hit at wall
        PIXI.Texture.fromFrame('bullet53.png'),//bullet hit at wall
      ],
      blur : [ 
        PIXI.Texture.fromFrame('bullet60.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet61.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet62.png'),//bullet blur
        PIXI.Texture.fromFrame('bullet63.png') //bullet blur
      ]
    }
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

    /*画面遷移エフェクト*/
    this.seqPattern = [];
    for(let y=0;y<4;y++){
      for (let x=0;x<8;x++){
        let str = "seq" + y + "" + x +".png";
        let i = 8*y+x;
        this.seqPattern[i] = PIXI.Texture.fromFrame(str);
      }
    }

    this.font = new Array(256);
    this.font["0"] = PIXI.Texture.fromFrame('font00.png');
    this.font["1"] = PIXI.Texture.fromFrame('font01.png');
    this.font["2"] = PIXI.Texture.fromFrame('font02.png');
    this.font["3"] = PIXI.Texture.fromFrame('font03.png');
    this.font["4"] = PIXI.Texture.fromFrame('font04.png');
    this.font["5"] = PIXI.Texture.fromFrame('font05.png');
    this.font["6"] = PIXI.Texture.fromFrame('font06.png');
    this.font["7"] = PIXI.Texture.fromFrame('font07.png');
    this.font["8"] = PIXI.Texture.fromFrame('font08.png');
    this.font["9"] = PIXI.Texture.fromFrame('font09.png');
    this.font["0r"] = PIXI.Texture.fromFrame('font10.png');
    this.font["1r"] = PIXI.Texture.fromFrame('font11.png');
    this.font["2r"] = PIXI.Texture.fromFrame('font12.png');
    this.font["3r"] = PIXI.Texture.fromFrame('font13.png');
    this.font["4r"] = PIXI.Texture.fromFrame('font14.png');
    this.font["5r"] = PIXI.Texture.fromFrame('font15.png');
    this.font["6r"] = PIXI.Texture.fromFrame('font16.png');
    this.font["7r"] = PIXI.Texture.fromFrame('font17.png');
    this.font["8r"] = PIXI.Texture.fromFrame('font18.png');
    this.font["9r"] = PIXI.Texture.fromFrame('font19.png');
    this.font["あ"] = PIXI.Texture.fromFrame('font20.png');
    this.font["い"] = PIXI.Texture.fromFrame('font21.png');
    this.font["う"] = PIXI.Texture.fromFrame('font22.png');
    this.font["え"] = PIXI.Texture.fromFrame('font23.png');
    this.font["お"] = PIXI.Texture.fromFrame('font24.png');
    this.font["か"] = PIXI.Texture.fromFrame('font25.png');
    this.font["き"] = PIXI.Texture.fromFrame('font26.png');
    this.font["く"] = PIXI.Texture.fromFrame('font27.png');
    this.font["け"] = PIXI.Texture.fromFrame('font28.png');
    this.font["こ"] = PIXI.Texture.fromFrame('font29.png');
    this.font["さ"] = PIXI.Texture.fromFrame('font2a.png');
    this.font["し"] = PIXI.Texture.fromFrame('font2b.png');
    this.font["す"] = PIXI.Texture.fromFrame('font2c.png');
    this.font["せ"] = PIXI.Texture.fromFrame('font2d.png');
    this.font["そ"] = PIXI.Texture.fromFrame('font2e.png');
    this.font["た"] = PIXI.Texture.fromFrame('font2f.png');
    this.font["ち"] = PIXI.Texture.fromFrame('font210.png');
    this.font["つ"] = PIXI.Texture.fromFrame('font211.png');
    this.font["て"] = PIXI.Texture.fromFrame('font212.png');
    this.font["と"] = PIXI.Texture.fromFrame('font213.png');
    this.font["な"] = PIXI.Texture.fromFrame('font214.png');
    this.font["に"] = PIXI.Texture.fromFrame('font215.png');
    this.font["ぬ"] = PIXI.Texture.fromFrame('font216.png');
    this.font["ね"] = PIXI.Texture.fromFrame('font217.png');
    this.font["の"] = PIXI.Texture.fromFrame('font218.png');
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


