import Game from './Game.js';

export default class Art{
  static Load(resources){
    this.darkTexture = PIXI.utils.TextureCache["src/resource/effect/dark.png"];
    /*forにして*/
    this.playerPattern = {
      runR : [
        PIXI.Texture.fromFrame('player00.png'),
        PIXI.Texture.fromFrame('player01.png'),
        PIXI.Texture.fromFrame('player02.png'),
        PIXI.Texture.fromFrame('player03.png'),
        PIXI.Texture.fromFrame('player04.png'),
        PIXI.Texture.fromFrame('player05.png'),
      ],
      runL : [
        PIXI.Texture.fromFrame('player10.png'),
        PIXI.Texture.fromFrame('player11.png'),
        PIXI.Texture.fromFrame('player12.png'),
        PIXI.Texture.fromFrame('player13.png'),
        PIXI.Texture.fromFrame('player14.png'),
        PIXI.Texture.fromFrame('player15.png'),
      ],
      runUR : [
        PIXI.Texture.fromFrame('player20.png'),
        PIXI.Texture.fromFrame('player21.png'),
        PIXI.Texture.fromFrame('player22.png'),
        PIXI.Texture.fromFrame('player23.png'),
        PIXI.Texture.fromFrame('player24.png'),
        PIXI.Texture.fromFrame('player25.png'),
      ],
      runUL : [
        PIXI.Texture.fromFrame('player30.png'),
        PIXI.Texture.fromFrame('player31.png'),
        PIXI.Texture.fromFrame('player32.png'),
        PIXI.Texture.fromFrame('player33.png'),
        PIXI.Texture.fromFrame('player34.png'),
        PIXI.Texture.fromFrame('player35.png'),
      ],
      runDR : [
        PIXI.Texture.fromFrame('player40.png'),
        PIXI.Texture.fromFrame('player41.png'),
        PIXI.Texture.fromFrame('player42.png'),
        PIXI.Texture.fromFrame('player43.png'),
        PIXI.Texture.fromFrame('player44.png'),
        PIXI.Texture.fromFrame('player45.png'),
      ],
      runDL : [
        PIXI.Texture.fromFrame('player50.png'),
        PIXI.Texture.fromFrame('player51.png'),
        PIXI.Texture.fromFrame('player52.png'),
        PIXI.Texture.fromFrame('player53.png'),
        PIXI.Texture.fromFrame('player54.png'),
        PIXI.Texture.fromFrame('player55.png'),
      ],
      waitR :[
        PIXI.Texture.fromFrame('player60.png'),
        PIXI.Texture.fromFrame('player61.png'),
        PIXI.Texture.fromFrame('player62.png'),
        PIXI.Texture.fromFrame('player63.png'),
      ],
      waitL : [
        PIXI.Texture.fromFrame('player64.png'),
        PIXI.Texture.fromFrame('player65.png'),
        PIXI.Texture.fromFrame('player66.png'),
        PIXI.Texture.fromFrame('player67.png'),
      ],
      //上向き右
      waitUR : [
        PIXI.Texture.fromFrame('player70.png'),
        PIXI.Texture.fromFrame('player71.png'),
        PIXI.Texture.fromFrame('player72.png'),
        PIXI.Texture.fromFrame('player73.png'),
      ],
      //上向き左
      waitUL : [
        PIXI.Texture.fromFrame('player74.png'),
        PIXI.Texture.fromFrame('player75.png'),
        PIXI.Texture.fromFrame('player76.png'),
        PIXI.Texture.fromFrame('player77.png'),
      ],
      waitDR : [
        PIXI.Texture.fromFrame('player80.png'),
        PIXI.Texture.fromFrame('player81.png'),
        PIXI.Texture.fromFrame('player82.png'),
        PIXI.Texture.fromFrame('player83.png'),
      ],
      waitDL : [
        PIXI.Texture.fromFrame('player84.png'),
        PIXI.Texture.fromFrame('player85.png'),
        PIXI.Texture.fromFrame('player86.png'),
        PIXI.Texture.fromFrame('player87.png'),
      ],
      //死亡エフェクト
      dying : [
        PIXI.Texture.fromFrame('player90.png'),
        PIXI.Texture.fromFrame('player91.png'),
        PIXI.Texture.fromFrame('player92.png'),
        PIXI.Texture.fromFrame('player93.png'),
        PIXI.Texture.fromFrame('player94.png'),
        PIXI.Texture.fromFrame('player95.png'),
        PIXI.Texture.fromFrame('player96.png'),
        PIXI.Texture.fromFrame('player97.png'),
      ],
      jumpR : [
        PIXI.Texture.fromFrame('playerA0.png'),
        PIXI.Texture.fromFrame('playerA1.png'),
        PIXI.Texture.fromFrame('playerA2.png'),
        PIXI.Texture.fromFrame('playerA3.png'),
      ],
      jumpL : [
        PIXI.Texture.fromFrame('playerA4.png'),
        PIXI.Texture.fromFrame('playerA5.png'),
        PIXI.Texture.fromFrame('playerA6.png'),
        PIXI.Texture.fromFrame('playerA7.png'),
      ],
      jumpUR : [
        PIXI.Texture.fromFrame('playerB0.png'),
        PIXI.Texture.fromFrame('playerB1.png'),
        PIXI.Texture.fromFrame('playerB2.png'),
        PIXI.Texture.fromFrame('playerB3.png'),
      ],
      jumpUL : [
        PIXI.Texture.fromFrame('playerB4.png'),
        PIXI.Texture.fromFrame('playerB5.png'),
        PIXI.Texture.fromFrame('playerB6.png'),
        PIXI.Texture.fromFrame('playerB7.png'),
      ],
      jumpDR : [
        PIXI.Texture.fromFrame('playerC0.png'),
        PIXI.Texture.fromFrame('playerC1.png'),
        PIXI.Texture.fromFrame('playerC2.png'),
        PIXI.Texture.fromFrame('playerC3.png'),
      ],
      jumpDL : [
        PIXI.Texture.fromFrame('playerC4.png'),
        PIXI.Texture.fromFrame('playerC5.png'),
        PIXI.Texture.fromFrame('playerC6.png'),
        PIXI.Texture.fromFrame('playerC7.png'),
      ],
      fallR : [
        PIXI.Texture.fromFrame('playerD0.png'),
        PIXI.Texture.fromFrame('playerD1.png'),
        PIXI.Texture.fromFrame('playerD2.png'),
        PIXI.Texture.fromFrame('playerD3.png'),
      ],
      fallL : [
        PIXI.Texture.fromFrame('playerD4.png'),
        PIXI.Texture.fromFrame('playerD5.png'),
        PIXI.Texture.fromFrame('playerD6.png'),
        PIXI.Texture.fromFrame('playerD7.png'),
      ],
      fallUR : [
        PIXI.Texture.fromFrame('playerE0.png'),
        PIXI.Texture.fromFrame('playerE1.png'),
        PIXI.Texture.fromFrame('playerE2.png'),
        PIXI.Texture.fromFrame('playerE3.png'),
      ],
      fallUL : [
        PIXI.Texture.fromFrame('playerE4.png'),
        PIXI.Texture.fromFrame('playerE5.png'),
        PIXI.Texture.fromFrame('playerE6.png'),
        PIXI.Texture.fromFrame('playerE7.png'),
      ],
      fallDR : [
        PIXI.Texture.fromFrame('playerF0.png'),
        PIXI.Texture.fromFrame('playerF1.png'),
        PIXI.Texture.fromFrame('playerF2.png'),
        PIXI.Texture.fromFrame('playerF3.png'),
      ],
      fallDL : [
        PIXI.Texture.fromFrame('playerF4.png'),
        PIXI.Texture.fromFrame('playerF5.png'),
        PIXI.Texture.fromFrame('playerF6.png'),
        PIXI.Texture.fromFrame('playerF7.png'),
      ],
    };
    this.UIPattern = {
      wEq1 : PIXI.Texture.fromFrame('weapon00.png'),
      wEq2 : PIXI.Texture.fromFrame('weapon01.png'),
      wEq3 : PIXI.Texture.fromFrame('weapon02.png'),
      wIcon : {
        w1 : [
        PIXI.Texture.fromFrame('weapon10.png'),
        PIXI.Texture.fromFrame('weapon11.png'),
        ],
        w2 : [
        PIXI.Texture.fromFrame('weapon12.png'),
        PIXI.Texture.fromFrame('weapon13.png'),
        ],
        w3 : [
        PIXI.Texture.fromFrame('weapon14.png'),
        PIXI.Texture.fromFrame('weapon15.png'),
        ]
      },
      sel : PIXI.Texture.fromFrame('selectbox.png'),//廃止予定
      HP : [
        PIXI.Texture.fromFrame('HP00.png'),
        PIXI.Texture.fromFrame('HP01.png'),
        PIXI.Texture.fromFrame('HP02.png'),
      ],
      bullet : [
        PIXI.Texture.fromFrame('UI70.png'),
        PIXI.Texture.fromFrame('UI76.png'),
        PIXI.Texture.fromFrame('UI7a.png'),
      ],
      message : {
        frame : PIXI.Texture.fromFrame('UI80.png'),
      }
    };
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
      ],
      sonic :[
        PIXI.Texture.fromFrame('bullet70.png'),//sonic
        PIXI.Texture.fromFrame('bullet71.png'),//sonic
        PIXI.Texture.fromFrame('bullet72.png'),//sonic
        PIXI.Texture.fromFrame('bullet73.png') //sonic
      ],
      coin : {
        get : [
          PIXI.Texture.fromFrame('bulletD0.png'),
          PIXI.Texture.fromFrame('bulletD1.png'),
          PIXI.Texture.fromFrame('bulletD2.png'),
          PIXI.Texture.fromFrame('bulletD3.png') 
        ],
        bright : [
          PIXI.Texture.fromFrame('bulletD0.png'),
          PIXI.Texture.fromFrame('bulletD1.png'),
          PIXI.Texture.fromFrame('bulletD2.png'),
          PIXI.Texture.fromFrame('bulletD3.png') 
        ]
      },
      explosion : {
        flash : [PIXI.Texture.fromFrame('bullet80.png')],
        fire : [PIXI.Texture.fromFrame('bulletA0.png')],
        stone : [PIXI.Texture.fromFrame('bulletB0.png')],
        smoke : [PIXI.Texture.fromFrame('bulletC0.png')],
      }
    }
    this.enemyPattern = {
      coin : [
        PIXI.Texture.fromFrame('enemy20.png'),
        PIXI.Texture.fromFrame('enemy21.png'),
        PIXI.Texture.fromFrame('enemy22.png'),
        PIXI.Texture.fromFrame('enemy23.png')
      ],
      enemy1 : [
        PIXI.Texture.fromFrame('enemy00.png'),
        PIXI.Texture.fromFrame('enemy01.png'),
        PIXI.Texture.fromFrame('enemy02.png'),
        PIXI.Texture.fromFrame('enemy03.png')
      ],
      enemy2 : [
        PIXI.Texture.fromFrame('enemy10.png'),
        PIXI.Texture.fromFrame('enemy11.png'),
        PIXI.Texture.fromFrame('enemy12.png'),
        PIXI.Texture.fromFrame('enemy13.png')
      ],
      //壊せる木箱
      woodbox : [
        PIXI.Texture.fromFrame('enemy10.png')
      ]
    }
    this.wallPattern = {
      block : PIXI.Texture.fromFrame('wall00.png'),//未使用
      goal : PIXI.Texture.fromFrame('wall01.png'),//ゴール
      signboard : PIXI.Texture.fromFrame('wall02.png'),//看板
      needle : [
        PIXI.Texture.fromFrame('wall10.png'),//∧
        PIXI.Texture.fromFrame('wall11.png'),//>
        PIXI.Texture.fromFrame('wall12.png'),//<
        PIXI.Texture.fromFrame('wall13.png'),//V
      ],
      //壁縁あり
      edge : {
        inner : [
          PIXI.Texture.fromFrame('wall61.png'),
          PIXI.Texture.fromFrame('wall63.png'),
          PIXI.Texture.fromFrame('wall81.png'),
          PIXI.Texture.fromFrame('wall83.png'),
        ],
        //外向き枠
        out : [
          PIXI.Texture.fromFrame('wall64.png'),//
          PIXI.Texture.fromFrame('wall65.png'),//
          PIXI.Texture.fromFrame('wall66.png'),//
          PIXI.Texture.fromFrame('wall74.png'),//
          PIXI.Texture.fromFrame('wall76.png'),//
          PIXI.Texture.fromFrame('wall84.png'),//
          PIXI.Texture.fromFrame('wall85.png'),//
          PIXI.Texture.fromFrame('wall86.png')//
        ],
      },
      //鉄骨
      steel : {
        //entity
        entity : [
        PIXI.Texture.fromFrame('wall90.png'),
        PIXI.Texture.fromFrame('wall91.png'),
        PIXI.Texture.fromFrame('wall92.png'),
        PIXI.Texture.fromFrame('wall93.png'),
        ],
        //backentity
        back : [
        PIXI.Texture.fromFrame('wall94.png'),
        PIXI.Texture.fromFrame('wall95.png'),
        PIXI.Texture.fromFrame('wall96.png'),
        PIXI.Texture.fromFrame('wall97.png'),
        ],
        //back
        backGround : [
        PIXI.Texture.fromFrame('wallA0.png'),
        ],
      }
    }

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
    this.font["は"] = PIXI.Texture.fromFrame('font30.png');
    this.font["ひ"] = PIXI.Texture.fromFrame('font31.png');
    this.font["ふ"] = PIXI.Texture.fromFrame('font32.png');
    this.font["へ"] = PIXI.Texture.fromFrame('font33.png');
    this.font["ほ"] = PIXI.Texture.fromFrame('font34.png');
    this.font["ま"] = PIXI.Texture.fromFrame('font35.png');
    this.font["み"] = PIXI.Texture.fromFrame('font36.png');
    this.font["む"] = PIXI.Texture.fromFrame('font37.png');
    this.font["め"] = PIXI.Texture.fromFrame('font38.png');
    this.font["も"] = PIXI.Texture.fromFrame('font39.png');
    this.font["や"] = PIXI.Texture.fromFrame('font3a.png');
    this.font["ゐ"] = PIXI.Texture.fromFrame('font3b.png');
    this.font["ゆ"] = PIXI.Texture.fromFrame('font3c.png');
    this.font["欠番2"] = PIXI.Texture.fromFrame('font3d.png');
    this.font["よ"] = PIXI.Texture.fromFrame('font3e.png');
    this.font["ら"] = PIXI.Texture.fromFrame('font3f.png');
    this.font["り"] = PIXI.Texture.fromFrame('font310.png');
    this.font["る"] = PIXI.Texture.fromFrame('font311.png');
    this.font["れ"] = PIXI.Texture.fromFrame('font312.png');
    this.font["ろ"] = PIXI.Texture.fromFrame('font313.png');
    this.font["わ"] = PIXI.Texture.fromFrame('font314.png');
    this.font["欠番3"] = PIXI.Texture.fromFrame('font315.png');
    this.font["を"] = PIXI.Texture.fromFrame('font316.png');
    this.font["欠番4"] = PIXI.Texture.fromFrame('font317.png');
    this.font["ん"] = PIXI.Texture.fromFrame('font318.png');
    this.font["ー"] = PIXI.Texture.fromFrame('font319.png');
    this.font["!"] = PIXI.Texture.fromFrame('font31a.png');
    this.font["?"] = PIXI.Texture.fromFrame('font31b.png');
    this.font["。"] = PIXI.Texture.fromFrame('font31c.png');
    this.font["、"] = PIXI.Texture.fromFrame('font31d.png');
    this.font["."] = PIXI.Texture.fromFrame('font31e.png');
    this.font["が"] = PIXI.Texture.fromFrame('font40.png');
    this.font["ぎ"] = PIXI.Texture.fromFrame('font41.png');
    this.font["ぐ"] = PIXI.Texture.fromFrame('font42.png');
    this.font["げ"] = PIXI.Texture.fromFrame('font43.png');
    this.font["ご"] = PIXI.Texture.fromFrame('font44.png');
    this.font["ざ"] = PIXI.Texture.fromFrame('font45.png');
    this.font["じ"] = PIXI.Texture.fromFrame('font46.png');
    this.font["ず"] = PIXI.Texture.fromFrame('font47.png');
    this.font["ぜ"] = PIXI.Texture.fromFrame('font48.png');
    this.font["ぞ"] = PIXI.Texture.fromFrame('font49.png');
    this.font["だ"] = PIXI.Texture.fromFrame('font4a.png');
    this.font["ぢ"] = PIXI.Texture.fromFrame('font4b.png');
    this.font["づ"] = PIXI.Texture.fromFrame('font4c.png');
    this.font["で"] = PIXI.Texture.fromFrame('font4d.png');
    this.font["ど"] = PIXI.Texture.fromFrame('font4e.png');
    this.font["ば"] = PIXI.Texture.fromFrame('font4f.png');
    this.font["び"] = PIXI.Texture.fromFrame('font410.png');
    this.font["ぶ"] = PIXI.Texture.fromFrame('font411.png');
    this.font["べ"] = PIXI.Texture.fromFrame('font412.png');
    this.font["ぼ"] = PIXI.Texture.fromFrame('font413.png');
    this.font["ぱ"] = PIXI.Texture.fromFrame('font414.png');
    this.font["ぴ"] = PIXI.Texture.fromFrame('font415.png');
    this.font["ぷ"] = PIXI.Texture.fromFrame('font416.png');
    this.font["ぺ"] = PIXI.Texture.fromFrame('font417.png');
    this.font["ぽ"] = PIXI.Texture.fromFrame('font418.png');
    this.font["ぁ"] = PIXI.Texture.fromFrame('font50.png');
    this.font["ぃ"] = PIXI.Texture.fromFrame('font51.png');
    this.font["ぅ"] = PIXI.Texture.fromFrame('font52.png');
    this.font["ぇ"] = PIXI.Texture.fromFrame('font53.png');
    this.font["ぉ"] = PIXI.Texture.fromFrame('font54.png');
    this.font["っ"] = PIXI.Texture.fromFrame('font55.png');
    this.font["ゃ"] = PIXI.Texture.fromFrame('font56.png');
    this.font["ゅ"] = PIXI.Texture.fromFrame('font57.png');
    this.font["ょ"] = PIXI.Texture.fromFrame('font58.png');
    this.font["ア"] = PIXI.Texture.fromFrame('font60.png');
    this.font["イ"] = PIXI.Texture.fromFrame('font61.png');
    this.font["ウ"] = PIXI.Texture.fromFrame('font62.png');
    this.font["エ"] = PIXI.Texture.fromFrame('font63.png');
    this.font["オ"] = PIXI.Texture.fromFrame('font64.png');
    this.font["カ"] = PIXI.Texture.fromFrame('font65.png');
    this.font["キ"] = PIXI.Texture.fromFrame('font66.png');
    this.font["ク"] = PIXI.Texture.fromFrame('font67.png');
    this.font["ケ"] = PIXI.Texture.fromFrame('font68.png');
    this.font["コ"] = PIXI.Texture.fromFrame('font69.png');
    this.font["サ"] = PIXI.Texture.fromFrame('font6a.png');
    this.font["シ"] = PIXI.Texture.fromFrame('font6b.png');
    this.font["ス"] = PIXI.Texture.fromFrame('font6c.png');
    this.font["セ"] = PIXI.Texture.fromFrame('font6d.png');
    this.font["ソ"] = PIXI.Texture.fromFrame('font6e.png');
    this.font["タ"] = PIXI.Texture.fromFrame('font6f.png');
    this.font["チ"] = PIXI.Texture.fromFrame('font610.png');
    this.font["ツ"] = PIXI.Texture.fromFrame('font611.png');
    this.font["テ"] = PIXI.Texture.fromFrame('font612.png');
    this.font["ト"] = PIXI.Texture.fromFrame('font613.png');
    this.font["ナ"] = PIXI.Texture.fromFrame('font614.png');
    this.font["ニ"] = PIXI.Texture.fromFrame('font615.png');
    this.font["ヌ"] = PIXI.Texture.fromFrame('font616.png');
    this.font["ネ"] = PIXI.Texture.fromFrame('font617.png');
    this.font["ノ"] = PIXI.Texture.fromFrame('font618.png');
    this.font["ハ"] = PIXI.Texture.fromFrame('font70.png');
    this.font["ヒ"] = PIXI.Texture.fromFrame('font71.png');
    this.font["フ"] = PIXI.Texture.fromFrame('font72.png');
    this.font["ヘ"] = PIXI.Texture.fromFrame('font73.png');
    this.font["ホ"] = PIXI.Texture.fromFrame('font74.png');
    this.font["マ"] = PIXI.Texture.fromFrame('font75.png');
    this.font["ミ"] = PIXI.Texture.fromFrame('font76.png');
    this.font["ム"] = PIXI.Texture.fromFrame('font77.png');
    this.font["メ"] = PIXI.Texture.fromFrame('font78.png');
    this.font["モ"] = PIXI.Texture.fromFrame('font79.png');
    this.font["ヤ"] = PIXI.Texture.fromFrame('font7a.png');
    this.font["ヰ"] = PIXI.Texture.fromFrame('font7b.png');
    this.font["ユ"] = PIXI.Texture.fromFrame('font7c.png');
    this.font["欠番5"] = PIXI.Texture.fromFrame('font7d.png');
    this.font["ヨ"] = PIXI.Texture.fromFrame('font7e.png');
    this.font["ラ"] = PIXI.Texture.fromFrame('font7f.png');
    this.font["リ"] = PIXI.Texture.fromFrame('font710.png');
    this.font["ル"] = PIXI.Texture.fromFrame('font711.png');
    this.font["レ"] = PIXI.Texture.fromFrame('font712.png');
    this.font["ロ"] = PIXI.Texture.fromFrame('font713.png');
    this.font["ワ"] = PIXI.Texture.fromFrame('font714.png');
    this.font["欠番6"] = PIXI.Texture.fromFrame('font715.png');
    this.font["ヲ"] = PIXI.Texture.fromFrame('font716.png');
    this.font["欠番7"] = PIXI.Texture.fromFrame('font717.png');
    this.font["ン"] = PIXI.Texture.fromFrame('font718.png');
    this.font["ガ"] = PIXI.Texture.fromFrame('font80.png');
    this.font["ギ"] = PIXI.Texture.fromFrame('font81.png');
    this.font["グ"] = PIXI.Texture.fromFrame('font82.png');
    this.font["ゲ"] = PIXI.Texture.fromFrame('font83.png');
    this.font["ゴ"] = PIXI.Texture.fromFrame('font84.png');
    this.font["ザ"] = PIXI.Texture.fromFrame('font85.png');
    this.font["ジ"] = PIXI.Texture.fromFrame('font86.png');
    this.font["ズ"] = PIXI.Texture.fromFrame('font87.png');
    this.font["ゼ"] = PIXI.Texture.fromFrame('font88.png');
    this.font["ゾ"] = PIXI.Texture.fromFrame('font89.png');
    this.font["ダ"] = PIXI.Texture.fromFrame('font8a.png');
    this.font["ヂ"] = PIXI.Texture.fromFrame('font8b.png');
    this.font["ヅ"] = PIXI.Texture.fromFrame('font8c.png');
    this.font["デ"] = PIXI.Texture.fromFrame('font8d.png');
    this.font["ド"] = PIXI.Texture.fromFrame('font8e.png');
    this.font["バ"] = PIXI.Texture.fromFrame('font8f.png');
    this.font["ビ"] = PIXI.Texture.fromFrame('font810.png');
    this.font["ブ"] = PIXI.Texture.fromFrame('font811.png');
    this.font["ベ"] = PIXI.Texture.fromFrame('font812.png');
    this.font["ボ"] = PIXI.Texture.fromFrame('font813.png');
    this.font["パ"] = PIXI.Texture.fromFrame('font814.png');
    this.font["ピ"] = PIXI.Texture.fromFrame('font815.png');
    this.font["プ"] = PIXI.Texture.fromFrame('font816.png');
    this.font["ペ"] = PIXI.Texture.fromFrame('font817.png');
    this.font["ポ"] = PIXI.Texture.fromFrame('font818.png');
    this.font["ァ"] = PIXI.Texture.fromFrame('font90.png');
    this.font["ィ"] = PIXI.Texture.fromFrame('font91.png');
    this.font["ゥ"] = PIXI.Texture.fromFrame('font92.png');
    this.font["ェ"] = PIXI.Texture.fromFrame('font93.png');
    this.font["ォ"] = PIXI.Texture.fromFrame('font94.png');
    this.font["ッ"] = PIXI.Texture.fromFrame('font95.png');
    this.font["ャ"] = PIXI.Texture.fromFrame('font96.png');
    this.font["ュ"] = PIXI.Texture.fromFrame('font97.png');
    this.font["ョ"] = PIXI.Texture.fromFrame('font98.png');
    this.font["A"] = PIXI.Texture.fromFrame('fontA0.png');
    this.font["B"] = PIXI.Texture.fromFrame('fontA1.png');
    this.font["C"] = PIXI.Texture.fromFrame('fontA2.png');
    this.font["D"] = PIXI.Texture.fromFrame('fontA3.png');
    this.font["E"] = PIXI.Texture.fromFrame('fontA4.png');
    this.font["F"] = PIXI.Texture.fromFrame('fontA5.png');
    this.font["G"] = PIXI.Texture.fromFrame('fontA6.png');
    this.font["H"] = PIXI.Texture.fromFrame('fontA7.png');
    this.font["I"] = PIXI.Texture.fromFrame('fontA8.png');
    this.font["J"] = PIXI.Texture.fromFrame('fontA9.png');
    this.font["K"] = PIXI.Texture.fromFrame('fontAa.png');
    this.font["L"] = PIXI.Texture.fromFrame('fontAb.png');
    this.font["M"] = PIXI.Texture.fromFrame('fontAc.png');
    this.font["N"] = PIXI.Texture.fromFrame('fontAd.png');
    this.font["O"] = PIXI.Texture.fromFrame('fontAe.png');
    this.font["P"] = PIXI.Texture.fromFrame('fontAf.png');
    this.font["Q"] = PIXI.Texture.fromFrame('fontA10.png');
    this.font["R"] = PIXI.Texture.fromFrame('fontA11.png');
    this.font["S"] = PIXI.Texture.fromFrame('fontA12.png');
    this.font["T"] = PIXI.Texture.fromFrame('fontA13.png');
    this.font["U"] = PIXI.Texture.fromFrame('fontA14.png');
    this.font["V"] = PIXI.Texture.fromFrame('fontA15.png');
    this.font["W"] = PIXI.Texture.fromFrame('fontA16.png');
    this.font["X"] = PIXI.Texture.fromFrame('fontA17.png');
    this.font["Y"] = PIXI.Texture.fromFrame('fontA18.png');
    this.font["Z"] = PIXI.Texture.fromFrame('fontA19.png');
    this.font["a"] = PIXI.Texture.fromFrame('fontB0.png');
    this.font["b"] = PIXI.Texture.fromFrame('fontB1.png');
    this.font["c"] = PIXI.Texture.fromFrame('fontB2.png');
    this.font["d"] = PIXI.Texture.fromFrame('fontB3.png');
    this.font["e"] = PIXI.Texture.fromFrame('fontB4.png');
    this.font["f"] = PIXI.Texture.fromFrame('fontB5.png');
    this.font["g"] = PIXI.Texture.fromFrame('fontB6.png');
    this.font["h"] = PIXI.Texture.fromFrame('fontB7.png');
    this.font["i"] = PIXI.Texture.fromFrame('fontB8.png');
    this.font["j"] = PIXI.Texture.fromFrame('fontB9.png');
    this.font["k"] = PIXI.Texture.fromFrame('fontBa.png');
    this.font["l"] = PIXI.Texture.fromFrame('fontBb.png');
    this.font["m"] = PIXI.Texture.fromFrame('fontBc.png');
    this.font["n"] = PIXI.Texture.fromFrame('fontBd.png');
    this.font["o"] = PIXI.Texture.fromFrame('fontBe.png');
    this.font["p"] = PIXI.Texture.fromFrame('fontBf.png');
    this.font["q"] = PIXI.Texture.fromFrame('fontB10.png');
    this.font["r"] = PIXI.Texture.fromFrame('fontB11.png');
    this.font["s"] = PIXI.Texture.fromFrame('fontB12.png');
    this.font["t"] = PIXI.Texture.fromFrame('fontB13.png');
    this.font["u"] = PIXI.Texture.fromFrame('fontB14.png');
    this.font["v"] = PIXI.Texture.fromFrame('fontB15.png');
    this.font["w"] = PIXI.Texture.fromFrame('fontB16.png');
    this.font["x"] = PIXI.Texture.fromFrame('fontB17.png');
    this.font["y"] = PIXI.Texture.fromFrame('fontB18.png');
    this.font["z"] = PIXI.Texture.fromFrame('fontB19.png');
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


