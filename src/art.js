import Drawer from "./drawer.js";

export default class Art {
  static Load(resources) {
    (this.test = PIXI.Texture.fromFrame("distance00.png")),
    this.elice =  PIXI.Texture.fromFrame("src/resource/img/stills/still_elice.png");
      /*forにして*/
      (this.playerPattern = {
        spilit: this.Frame("player", 100, 6),
        runR: [
          PIXI.Texture.fromFrame("player00.png"),
          PIXI.Texture.fromFrame("player01.png"),
          PIXI.Texture.fromFrame("player02.png"),
          PIXI.Texture.fromFrame("player03.png"),
          PIXI.Texture.fromFrame("player04.png"),
          PIXI.Texture.fromFrame("player05.png")
        ],
        runL: this.Frame("player", 10, 6),
        runUR: this.Frame("player", 20, 6),
        runUL: this.Frame("player", 30, 6),
        runDR: this.Frame("player", 40, 6),
        runDL: this.Frame("player", 50, 6),
        waitR: this.Frame("player", 60, 4),
        waitL: this.Frame("player", 64, 4),
        waitR: [
          PIXI.Texture.fromFrame("player60.png"),
          PIXI.Texture.fromFrame("player61.png"),
          PIXI.Texture.fromFrame("player62.png"),
          PIXI.Texture.fromFrame("player63.png")
        ],
        waitL: [
          PIXI.Texture.fromFrame("player64.png"),
          PIXI.Texture.fromFrame("player65.png"),
          PIXI.Texture.fromFrame("player66.png"),
          PIXI.Texture.fromFrame("player67.png")
        ],
        //上向き右
        waitUR: [
          PIXI.Texture.fromFrame("player70.png"),
          PIXI.Texture.fromFrame("player71.png"),
          PIXI.Texture.fromFrame("player72.png"),
          PIXI.Texture.fromFrame("player73.png")
        ],
        //上向き左
        waitUL: [
          PIXI.Texture.fromFrame("player74.png"),
          PIXI.Texture.fromFrame("player75.png"),
          PIXI.Texture.fromFrame("player76.png"),
          PIXI.Texture.fromFrame("player77.png")
        ],
        waitDR: [
          PIXI.Texture.fromFrame("player80.png"),
          PIXI.Texture.fromFrame("player81.png"),
          PIXI.Texture.fromFrame("player82.png"),
          PIXI.Texture.fromFrame("player83.png")
        ],
        waitDL: [
          PIXI.Texture.fromFrame("player84.png"),
          PIXI.Texture.fromFrame("player85.png"),
          PIXI.Texture.fromFrame("player86.png"),
          PIXI.Texture.fromFrame("player87.png")
        ],
        //死亡エフェクト
        dying: [
          PIXI.Texture.fromFrame("player90.png"),
          PIXI.Texture.fromFrame("player91.png"),
          PIXI.Texture.fromFrame("player92.png"),
          PIXI.Texture.fromFrame("player93.png"),
          PIXI.Texture.fromFrame("player94.png"),
          PIXI.Texture.fromFrame("player95.png"),
          PIXI.Texture.fromFrame("player96.png"),
          PIXI.Texture.fromFrame("player97.png")
        ],
        jumpR: [
          PIXI.Texture.fromFrame("playerA0.png"),
          PIXI.Texture.fromFrame("playerA1.png"),
          PIXI.Texture.fromFrame("playerA2.png"),
          PIXI.Texture.fromFrame("playerA3.png")
        ],
        jumpL: [
          PIXI.Texture.fromFrame("playerA4.png"),
          PIXI.Texture.fromFrame("playerA5.png"),
          PIXI.Texture.fromFrame("playerA6.png"),
          PIXI.Texture.fromFrame("playerA7.png")
        ],
        jumpUR: [
          PIXI.Texture.fromFrame("playerB0.png"),
          PIXI.Texture.fromFrame("playerB1.png"),
          PIXI.Texture.fromFrame("playerB2.png"),
          PIXI.Texture.fromFrame("playerB3.png")
        ],
        jumpUL: [
          PIXI.Texture.fromFrame("playerB4.png"),
          PIXI.Texture.fromFrame("playerB5.png"),
          PIXI.Texture.fromFrame("playerB6.png"),
          PIXI.Texture.fromFrame("playerB7.png")
        ],
        jumpDR: [
          PIXI.Texture.fromFrame("playerC0.png"),
          PIXI.Texture.fromFrame("playerC1.png"),
          PIXI.Texture.fromFrame("playerC2.png"),
          PIXI.Texture.fromFrame("playerC3.png")
        ],
        jumpDL: [
          PIXI.Texture.fromFrame("playerC4.png"),
          PIXI.Texture.fromFrame("playerC5.png"),
          PIXI.Texture.fromFrame("playerC6.png"),
          PIXI.Texture.fromFrame("playerC7.png")
        ],
        fallR: [
          PIXI.Texture.fromFrame("playerD0.png"),
          PIXI.Texture.fromFrame("playerD1.png"),
          PIXI.Texture.fromFrame("playerD2.png"),
          PIXI.Texture.fromFrame("playerD3.png")
        ],
        fallL: [
          PIXI.Texture.fromFrame("playerD4.png"),
          PIXI.Texture.fromFrame("playerD5.png"),
          PIXI.Texture.fromFrame("playerD6.png"),
          PIXI.Texture.fromFrame("playerD7.png")
        ],
        fallUR: [
          PIXI.Texture.fromFrame("playerE0.png"),
          PIXI.Texture.fromFrame("playerE1.png"),
          PIXI.Texture.fromFrame("playerE2.png"),
          PIXI.Texture.fromFrame("playerE3.png")
        ],
        fallUL: [
          PIXI.Texture.fromFrame("playerE4.png"),
          PIXI.Texture.fromFrame("playerE5.png"),
          PIXI.Texture.fromFrame("playerE6.png"),
          PIXI.Texture.fromFrame("playerE7.png")
        ],
        fallDR: [
          PIXI.Texture.fromFrame("playerF0.png"),
          PIXI.Texture.fromFrame("playerF1.png"),
          PIXI.Texture.fromFrame("playerF2.png"),
          PIXI.Texture.fromFrame("playerF3.png")
        ],
        fallDL: [
          PIXI.Texture.fromFrame("playerF4.png"),
          PIXI.Texture.fromFrame("playerF5.png"),
          PIXI.Texture.fromFrame("playerF6.png"),
          PIXI.Texture.fromFrame("playerF7.png")
        ]
      });
    this.UIPattern = {
      HP: {
        outer: PIXI.Texture.fromFrame("UI00.png"),
        bar: PIXI.Texture.fromFrame("UI04.png"),
        icon: PIXI.Texture.fromFrame("UI08.png")
      },
      bullet: {
        outer: PIXI.Texture.fromFrame("UI10.png"),
        bar: PIXI.Texture.fromFrame("UI14.png"),
        icon: {
          missile: PIXI.Texture.fromFrame("UI18.png"),
          laser: PIXI.Texture.fromFrame("UI19.png"),
          normal: PIXI.Texture.fromFrame("UI1A.png"),
          fire: PIXI.Texture.fromFrame("UI1B.png"),
          weapon5: PIXI.Texture.fromFrame("UI1C.png"),
          weapon6: PIXI.Texture.fromFrame("UI1D.png"),
          weapon7: PIXI.Texture.fromFrame("UI1E.png"),
          question: PIXI.Texture.fromFrame("UI1F.png"),
        },
        pop: {
          normal: PIXI.Texture.fromFrame("UI30.png"),
          missile: PIXI.Texture.fromFrame("UI31.png"),
          laser: PIXI.Texture.fromFrame("UI32.png"),
          fire: PIXI.Texture.fromFrame("UI33.png"),
          weapon5: PIXI.Texture.fromFrame("UI34.png")
        }
      },
      score: {
        icon: PIXI.Texture.fromFrame("UI09.png")
      },
      message: {
        frame: PIXI.Texture.fromFrame("UI20.png"),
        smallFrame: PIXI.Texture.fromImage("src/resource/img/UI/smallFrame.png")
      },
      key: {
        X: [
          PIXI.Texture.fromFrame("UI40.png"),
          PIXI.Texture.fromFrame("UI41.png")
        ],
        Z: [
          PIXI.Texture.fromFrame("UI42.png"),
          PIXI.Texture.fromFrame("UI43.png")
        ],
        C: [
          PIXI.Texture.fromFrame("UI44.png"),
          PIXI.Texture.fromFrame("UI45.png")
        ],
        RIGHT: [
          PIXI.Texture.fromFrame("UI46.png"),
          PIXI.Texture.fromFrame("UI47.png")
        ],
        LEFT: [
          PIXI.Texture.fromFrame("UI48.png"),
          PIXI.Texture.fromFrame("UI49.png")
        ],
        DOWN: [
          PIXI.Texture.fromFrame("UI4A.png"),
          PIXI.Texture.fromFrame("UI4B.png")
        ],
        UP: [
          PIXI.Texture.fromFrame("UI4C.png"),
          PIXI.Texture.fromFrame("UI4D.png")
        ]
      }
    };
    this.bulletPattern = {
      bullet1: [
        PIXI.Texture.fromFrame("bullet00.png"),
        PIXI.Texture.fromFrame("bullet01.png"),
        PIXI.Texture.fromFrame("bullet02.png"),
        PIXI.Texture.fromFrame("bullet03.png")
      ],
      bullet2: this.Frame("bullet", 10, 8),
      bullet3: [PIXI.Texture.fromFrame("bullet100.png")],
      bullet4: this.Frame("bullet", 120, 4), //Fire
      lasersight: [PIXI.Texture.fromFrame("bullet20.png")],
      target: [
        PIXI.Texture.fromFrame("bullet30.png") //Target
      ],
      shot: this.Frame("bullet", 40, 4),
      hitWall: this.Frame("bullet", 50, 4),
      trail: this.Frame("bullet", 60, 6),
      trail2: [
        PIXI.Texture.fromFrame("bulletF0.png"), //bullet trail
        PIXI.Texture.fromFrame("bulletF1.png"),
        PIXI.Texture.fromFrame("bulletF2.png"),
        PIXI.Texture.fromFrame("bulletF3.png")
      ],
      //ブロックの破片
      blockDebris: this.Frame("bullet", 110, 4),
      coin: {
        get: [
          PIXI.Texture.fromFrame("bulletD0.png"),
          PIXI.Texture.fromFrame("bulletD1.png"),
          PIXI.Texture.fromFrame("bulletD2.png"),
          PIXI.Texture.fromFrame("bulletD3.png")
        ],
        bright: [
          PIXI.Texture.fromFrame("bulletD0.png"),
          PIXI.Texture.fromFrame("bulletD1.png"),
          PIXI.Texture.fromFrame("bulletD2.png"),
          PIXI.Texture.fromFrame("bulletD3.png")
        ]
      },
      //看板のポップ
      signpop: [
        PIXI.Texture.fromFrame("bulletE0.png"),
        PIXI.Texture.fromFrame("bulletE1.png"),
        PIXI.Texture.fromFrame("bulletE2.png"),
        PIXI.Texture.fromFrame("bulletE3.png")
      ],
      explosion: {
        flash: [PIXI.Texture.fromFrame("bullet80.png")],
        fire: [
          PIXI.Texture.fromFrame("bulletA0.png"),
          PIXI.Texture.fromFrame("bulletA1.png"),
          PIXI.Texture.fromFrame("bulletA2.png"),
          PIXI.Texture.fromFrame("bulletA3.png"),
          PIXI.Texture.fromFrame("bulletA4.png"),
          PIXI.Texture.fromFrame("bulletA5.png"),
          PIXI.Texture.fromFrame("bulletA6.png"),
          PIXI.Texture.fromFrame("bulletA7.png")
        ],
        stone: [PIXI.Texture.fromFrame("bulletB0.png")],
        smoke: [
          PIXI.Texture.fromFrame("bulletC0.png"),
          PIXI.Texture.fromFrame("bulletC1.png"),
          PIXI.Texture.fromFrame("bulletC2.png"),
          PIXI.Texture.fromFrame("bulletC3.png"),
          PIXI.Texture.fromFrame("bulletC4.png"),
          PIXI.Texture.fromFrame("bulletC5.png"),
          PIXI.Texture.fromFrame("bulletC6.png"),
          PIXI.Texture.fromFrame("bulletC7.png")
        ],
        sonic: this.Frame("bullet", 70, 4)
      },
      screenFlash: this.Frame("bullet", 130, 2)
    };
    this.enemyPattern = {
      coin: [
        PIXI.Texture.fromFrame("enemy20.png"),
        PIXI.Texture.fromFrame("enemy21.png"),
        PIXI.Texture.fromFrame("enemy22.png"),
        PIXI.Texture.fromFrame("enemy23.png"),
        PIXI.Texture.fromFrame("enemy24.png"),
        PIXI.Texture.fromFrame("enemy25.png"),
        PIXI.Texture.fromFrame("enemy26.png"),
        PIXI.Texture.fromFrame("enemy27.png"),
        PIXI.Texture.fromFrame("enemy28.png"),
        PIXI.Texture.fromFrame("enemy29.png"),
        PIXI.Texture.fromFrame("enemy2a.png"),
        PIXI.Texture.fromFrame("enemy2b.png"),
        PIXI.Texture.fromFrame("enemy2c.png")
      ],
      enemy1: [
        PIXI.Texture.fromFrame("enemy00.png"),
        PIXI.Texture.fromFrame("enemy01.png"),
        PIXI.Texture.fromFrame("enemy02.png"),
        PIXI.Texture.fromFrame("enemy03.png")
      ],
      enemy2: this.Frame("enemy", 10, 4),
      enemy3: this.Frame("enemy", 30, 2),
      eBullet1: this.Frame("enemy", 40, 4),
      enemy4: this.Frame("enemy", 50, 2),
      enemy7: [
        PIXI.Texture.fromFrame("enemy00.png"),
        PIXI.Texture.fromFrame("enemy01.png"),
        PIXI.Texture.fromFrame("enemy02.png"),
        PIXI.Texture.fromFrame("enemy03.png")
      ],
      enemy5: this.Frame("enemy", 60, 2),
      eBullet2: this.Frame("enemy", 70, 4),
      enemy6: this.Frame("enemy", 80, 2),
      //壊せる木箱
      woodbox: [PIXI.Texture.fromFrame("enemy40.png")]
    };
    this.shopPattern = {
        BG : PIXI.Texture.fromImage("src/resource/img/shop/shopBG.png")
    };
    this.wallPattern = {
      block: PIXI.Texture.fromFrame("wallA4.png"),
      HPBlock: PIXI.Texture.fromFrame("wallA5.png"),
      bulletBlock: PIXI.Texture.fromFrame("wallA6.png"),
      bigBlock: [
        PIXI.Texture.fromFrame("wallA2.png"),
        PIXI.Texture.fromFrame("wallA3.png"),
        PIXI.Texture.fromFrame("wallB2.png"),
        PIXI.Texture.fromFrame("wallB3.png")
      ],
      goal: PIXI.Texture.fromFrame("wall01.png"), //ゴール
      signboard: PIXI.Texture.fromFrame("wall02.png"), //看板
      shop: [PIXI.Texture.fromFrame("wall03.png")], //看板
      needle: [
        //壊れる
        PIXI.Texture.fromFrame("wall10.png"), //∧
        PIXI.Texture.fromFrame("wall11.png"), //>
        PIXI.Texture.fromFrame("wall12.png"), //<
        PIXI.Texture.fromFrame("wall13.png"), //V
        //壊れない
        PIXI.Texture.fromFrame("wall20.png"), //∧
        PIXI.Texture.fromFrame("wall21.png"), //>
        PIXI.Texture.fromFrame("wall22.png"), //<
        PIXI.Texture.fromFrame("wall23.png") //V
      ],
      //壁縁あり
      edge: {
        adapt: PIXI.Texture.fromFrame("wall72.png"),
        inner: [
          PIXI.Texture.fromFrame("wall61.png"),
          PIXI.Texture.fromFrame("wall63.png"),
          PIXI.Texture.fromFrame("wall81.png"),
          PIXI.Texture.fromFrame("wall83.png")
        ],
        //外向き枠
        out: [
          PIXI.Texture.fromFrame("wall64.png"), //
          PIXI.Texture.fromFrame("wall65.png"), //
          PIXI.Texture.fromFrame("wall66.png"), //
          PIXI.Texture.fromFrame("wall74.png"), //
          PIXI.Texture.fromFrame("wall75.png"), //
          PIXI.Texture.fromFrame("wall76.png"), //
          PIXI.Texture.fromFrame("wall84.png"), //
          PIXI.Texture.fromFrame("wall85.png"), //
          PIXI.Texture.fromFrame("wall86.png") //
        ],
        back: {
          inner: [
            PIXI.Texture.fromFrame("wall31.png"),
            PIXI.Texture.fromFrame("wall33.png"),
            PIXI.Texture.fromFrame("wall51.png"),
            PIXI.Texture.fromFrame("wall53.png")
          ],
          out: [
            PIXI.Texture.fromFrame("wall34.png"),
            PIXI.Texture.fromFrame("wall35.png"),
            PIXI.Texture.fromFrame("wall36.png"),
            PIXI.Texture.fromFrame("wall44.png"),
            PIXI.Texture.fromFrame("wall45.png"),
            PIXI.Texture.fromFrame("wall46.png"),
            PIXI.Texture.fromFrame("wall54.png"),
            PIXI.Texture.fromFrame("wall55.png"),
            PIXI.Texture.fromFrame("wall56.png")
          ]
        }
      },
      //鉄骨
      steel: {
        entity: this.Frame("wall", 90, 4),
        back: this.Frame("wall", 94, 4)
      },
      //背景
      backGround: [
        PIXI.Texture.fromImage("src/resource/img/BG0.png"),
        PIXI.Texture.fromImage("src/resource/img/BG1.png"),
      ],

      //すり抜け床
      through: [PIXI.Texture.fromFrame("wallC0.png")],
      //トゲが飛び出る床
      needleShot: [PIXI.Texture.fromFrame("wallC1.png")]
    };

    /*画面遷移エフェクト*/
    this.seqPattern = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        let str = "seq" + y + "" + x + ".png";
        let i = 8 * y + x;
        this.seqPattern[i] = PIXI.Texture.fromFrame(str);
      }
    }
    //font
    this.LoadFont();

    //shader
    const unif1 = {
      time: {
        type: "1f",
        value: 300
      },
      mappedMatrix: {
        type: "mat3",
        value: new PIXI.Matrix()
      },
      x: {
        type: "1f",
        value: 0
      },
      y: {
        type: "1f",
        value: 0
      }
    };
    Drawer.testFilter = new PIXI.Filter(null, resources.testShader.data, unif1);
    Drawer.testFilter.apply = function(filterManager, input, output) {
      filterManager.calculateNormalizedScreenSpaceMatrix(
        unif1.mappedMatrix.value
      );
      filterManager.applyFilter(this, input, output);
    };

    //今実質的にflashとして使わている
    Drawer.fireFilter = new PIXI.Filter(null, resources.fireShader.data, {
      paintCol: {
        type: "1f",
        value: 0
      }
    });
    let unif = {
      time: {
        type: "1f",
        value: 0
      },
      mappedMatrix: {
        type: "mat3",
        value: new PIXI.Matrix()
      }
    };
    Drawer.shopFilter = new PIXI.Filter(null, resources.shopShader.data, unif);
    Drawer.shopFilter.apply = function(filterManager, input, output) {
      filterManager.calculateNormalizedScreenSpaceMatrix(
        unif.mappedMatrix.value
      );
      filterManager.applyFilter(this, input, output);
    };

    //Drawer.smokeFilter =new PIXI.Filter(null,resources.smokeShader.data);
  }

  static async LoadTexture() {
    let loader = PIXI.loader;
    await new Promise(res =>
      loader
        .add("pattern", "src/resource/img/playerPattern.json")
        .add("pattern2", "src/resource/img/UIPattern.json")
        .add("pattern3", "src/resource/img/bulletPattern.json")
        .add("pattern4", "src/resource/img/enemyPattern.json")
        .add("pattern5", "src/resource/img/wallPattern.json")
        .add("pattern6", "src/resource/img/seqPattern.json")
        .add("pattern7", "src/resource/img/font.json")
        .add("distance", "src/resource/img/distance.json")
        .add("testShader", "src/Shader/test.frag")
        .add("fireShader", "src/Shader/fire.frag")
        .add("shopShader", "src/Shader/shop.frag")
        .add("elice" , "src/resource/img/stills/still_elice.png")
        .load((loader, resources) => Art.Load(resources))
        .onComplete.add(res)
    );
  }

  //pattern : str
  //start ,frames : int
  static Frame(pattern, start, frames) {
    let filename;
    let a = []; //戻り値
    for (let i = 0; i < frames; i++) {
      filename = pattern + (start + i) + ".png";
      a[i] = PIXI.Texture.fromFrame(filename);
    }
    return a;
  }
  static SpriteFactory(texture) {
    return new PIXI.Sprite(texture);
  }
  static Sprite(texture) {
    return new PIXI.Sprite(texture);
  }
  static CreateSprite(texture) {
    return new PIXI.Sprite(texture);
  }
  static LoadFont() {
    this.font = new Array(256);
    this.font["0"] = PIXI.Texture.fromFrame("font00.png");
    this.font["1"] = PIXI.Texture.fromFrame("font01.png");
    this.font["2"] = PIXI.Texture.fromFrame("font02.png");
    this.font["3"] = PIXI.Texture.fromFrame("font03.png");
    this.font["4"] = PIXI.Texture.fromFrame("font04.png");
    this.font["5"] = PIXI.Texture.fromFrame("font05.png");
    this.font["6"] = PIXI.Texture.fromFrame("font06.png");
    this.font["7"] = PIXI.Texture.fromFrame("font07.png");
    this.font["8"] = PIXI.Texture.fromFrame("font08.png");
    this.font["9"] = PIXI.Texture.fromFrame("font09.png");
    this.font["0r"] = PIXI.Texture.fromFrame("font10.png");
    this.font["1r"] = PIXI.Texture.fromFrame("font11.png");
    this.font["2r"] = PIXI.Texture.fromFrame("font12.png");
    this.font["3r"] = PIXI.Texture.fromFrame("font13.png");
    this.font["4r"] = PIXI.Texture.fromFrame("font14.png");
    this.font["5r"] = PIXI.Texture.fromFrame("font15.png");
    this.font["6r"] = PIXI.Texture.fromFrame("font16.png");
    this.font["7r"] = PIXI.Texture.fromFrame("font17.png");
    this.font["8r"] = PIXI.Texture.fromFrame("font18.png");
    this.font["9r"] = PIXI.Texture.fromFrame("font19.png");
    this.font["あ"] = PIXI.Texture.fromFrame("font20.png");
    this.font["い"] = PIXI.Texture.fromFrame("font21.png");
    this.font["う"] = PIXI.Texture.fromFrame("font22.png");
    this.font["え"] = PIXI.Texture.fromFrame("font23.png");
    this.font["お"] = PIXI.Texture.fromFrame("font24.png");
    this.font["か"] = PIXI.Texture.fromFrame("font25.png");
    this.font["き"] = PIXI.Texture.fromFrame("font26.png");
    this.font["く"] = PIXI.Texture.fromFrame("font27.png");
    this.font["け"] = PIXI.Texture.fromFrame("font28.png");
    this.font["こ"] = PIXI.Texture.fromFrame("font29.png");
    this.font["さ"] = PIXI.Texture.fromFrame("font2a.png");
    this.font["し"] = PIXI.Texture.fromFrame("font2b.png");
    this.font["す"] = PIXI.Texture.fromFrame("font2c.png");
    this.font["せ"] = PIXI.Texture.fromFrame("font2d.png");
    this.font["そ"] = PIXI.Texture.fromFrame("font2e.png");
    this.font["た"] = PIXI.Texture.fromFrame("font2f.png");
    this.font["ち"] = PIXI.Texture.fromFrame("font210.png");
    this.font["つ"] = PIXI.Texture.fromFrame("font211.png");
    this.font["て"] = PIXI.Texture.fromFrame("font212.png");
    this.font["と"] = PIXI.Texture.fromFrame("font213.png");
    this.font["な"] = PIXI.Texture.fromFrame("font214.png");
    this.font["に"] = PIXI.Texture.fromFrame("font215.png");
    this.font["ぬ"] = PIXI.Texture.fromFrame("font216.png");
    this.font["ね"] = PIXI.Texture.fromFrame("font217.png");
    this.font["の"] = PIXI.Texture.fromFrame("font218.png");
    this.font["は"] = PIXI.Texture.fromFrame("font30.png");
    this.font["ひ"] = PIXI.Texture.fromFrame("font31.png");
    this.font["ふ"] = PIXI.Texture.fromFrame("font32.png");
    this.font["へ"] = PIXI.Texture.fromFrame("font33.png");
    this.font["ほ"] = PIXI.Texture.fromFrame("font34.png");
    this.font["ま"] = PIXI.Texture.fromFrame("font35.png");
    this.font["み"] = PIXI.Texture.fromFrame("font36.png");
    this.font["む"] = PIXI.Texture.fromFrame("font37.png");
    this.font["め"] = PIXI.Texture.fromFrame("font38.png");
    this.font["も"] = PIXI.Texture.fromFrame("font39.png");
    this.font["や"] = PIXI.Texture.fromFrame("font3a.png");
    this.font["ゐ"] = PIXI.Texture.fromFrame("font3b.png");
    this.font["ゆ"] = PIXI.Texture.fromFrame("font3c.png");
    this.font[" "] = PIXI.Texture.fromFrame("font3d.png");
    this.font["よ"] = PIXI.Texture.fromFrame("font3e.png");
    this.font["ら"] = PIXI.Texture.fromFrame("font3f.png");
    this.font["り"] = PIXI.Texture.fromFrame("font310.png");
    this.font["る"] = PIXI.Texture.fromFrame("font311.png");
    this.font["れ"] = PIXI.Texture.fromFrame("font312.png");
    this.font["ろ"] = PIXI.Texture.fromFrame("font313.png");
    this.font["わ"] = PIXI.Texture.fromFrame("font314.png");
    this.font["欠番3"] = PIXI.Texture.fromFrame("font315.png");
    this.font["を"] = PIXI.Texture.fromFrame("font316.png");
    this.font["欠番4"] = PIXI.Texture.fromFrame("font317.png");
    this.font["ん"] = PIXI.Texture.fromFrame("font318.png");
    this.font["が"] = PIXI.Texture.fromFrame("font40.png");
    this.font["ぎ"] = PIXI.Texture.fromFrame("font41.png");
    this.font["ぐ"] = PIXI.Texture.fromFrame("font42.png");
    this.font["げ"] = PIXI.Texture.fromFrame("font43.png");
    this.font["ご"] = PIXI.Texture.fromFrame("font44.png");
    this.font["ざ"] = PIXI.Texture.fromFrame("font45.png");
    this.font["じ"] = PIXI.Texture.fromFrame("font46.png");
    this.font["ず"] = PIXI.Texture.fromFrame("font47.png");
    this.font["ぜ"] = PIXI.Texture.fromFrame("font48.png");
    this.font["ぞ"] = PIXI.Texture.fromFrame("font49.png");
    this.font["だ"] = PIXI.Texture.fromFrame("font4a.png");
    this.font["ぢ"] = PIXI.Texture.fromFrame("font4b.png");
    this.font["づ"] = PIXI.Texture.fromFrame("font4c.png");
    this.font["で"] = PIXI.Texture.fromFrame("font4d.png");
    this.font["ど"] = PIXI.Texture.fromFrame("font4e.png");
    this.font["ば"] = PIXI.Texture.fromFrame("font4f.png");
    this.font["び"] = PIXI.Texture.fromFrame("font410.png");
    this.font["ぶ"] = PIXI.Texture.fromFrame("font411.png");
    this.font["べ"] = PIXI.Texture.fromFrame("font412.png");
    this.font["ぼ"] = PIXI.Texture.fromFrame("font413.png");
    this.font["ぱ"] = PIXI.Texture.fromFrame("font414.png");
    this.font["ぴ"] = PIXI.Texture.fromFrame("font415.png");
    this.font["ぷ"] = PIXI.Texture.fromFrame("font416.png");
    this.font["ぺ"] = PIXI.Texture.fromFrame("font417.png");
    this.font["ぽ"] = PIXI.Texture.fromFrame("font418.png");
    this.font["ぁ"] = PIXI.Texture.fromFrame("font50.png");
    this.font["ぃ"] = PIXI.Texture.fromFrame("font51.png");
    this.font["ぅ"] = PIXI.Texture.fromFrame("font52.png");
    this.font["ぇ"] = PIXI.Texture.fromFrame("font53.png");
    this.font["ぉ"] = PIXI.Texture.fromFrame("font54.png");
    this.font["っ"] = PIXI.Texture.fromFrame("font55.png");
    this.font["ゃ"] = PIXI.Texture.fromFrame("font56.png");
    this.font["ゅ"] = PIXI.Texture.fromFrame("font57.png");
    this.font["ょ"] = PIXI.Texture.fromFrame("font58.png");
    this.font["ア"] = PIXI.Texture.fromFrame("font60.png");
    this.font["イ"] = PIXI.Texture.fromFrame("font61.png");
    this.font["ウ"] = PIXI.Texture.fromFrame("font62.png");
    this.font["エ"] = PIXI.Texture.fromFrame("font63.png");
    this.font["オ"] = PIXI.Texture.fromFrame("font64.png");
    this.font["カ"] = PIXI.Texture.fromFrame("font65.png");
    this.font["キ"] = PIXI.Texture.fromFrame("font66.png");
    this.font["ク"] = PIXI.Texture.fromFrame("font67.png");
    this.font["ケ"] = PIXI.Texture.fromFrame("font68.png");
    this.font["コ"] = PIXI.Texture.fromFrame("font69.png");
    this.font["サ"] = PIXI.Texture.fromFrame("font6a.png");
    this.font["シ"] = PIXI.Texture.fromFrame("font6b.png");
    this.font["ス"] = PIXI.Texture.fromFrame("font6c.png");
    this.font["セ"] = PIXI.Texture.fromFrame("font6d.png");
    this.font["ソ"] = PIXI.Texture.fromFrame("font6e.png");
    this.font["タ"] = PIXI.Texture.fromFrame("font6f.png");
    this.font["チ"] = PIXI.Texture.fromFrame("font610.png");
    this.font["ツ"] = PIXI.Texture.fromFrame("font611.png");
    this.font["テ"] = PIXI.Texture.fromFrame("font612.png");
    this.font["ト"] = PIXI.Texture.fromFrame("font613.png");
    this.font["ナ"] = PIXI.Texture.fromFrame("font614.png");
    this.font["ニ"] = PIXI.Texture.fromFrame("font615.png");
    this.font["ヌ"] = PIXI.Texture.fromFrame("font616.png");
    this.font["ネ"] = PIXI.Texture.fromFrame("font617.png");
    this.font["ノ"] = PIXI.Texture.fromFrame("font618.png");
    this.font["ハ"] = PIXI.Texture.fromFrame("font70.png");
    this.font["ヒ"] = PIXI.Texture.fromFrame("font71.png");
    this.font["フ"] = PIXI.Texture.fromFrame("font72.png");
    this.font["ヘ"] = PIXI.Texture.fromFrame("font73.png");
    this.font["ホ"] = PIXI.Texture.fromFrame("font74.png");
    this.font["マ"] = PIXI.Texture.fromFrame("font75.png");
    this.font["ミ"] = PIXI.Texture.fromFrame("font76.png");
    this.font["ム"] = PIXI.Texture.fromFrame("font77.png");
    this.font["メ"] = PIXI.Texture.fromFrame("font78.png");
    this.font["モ"] = PIXI.Texture.fromFrame("font79.png");
    this.font["ヤ"] = PIXI.Texture.fromFrame("font7a.png");
    this.font["ヰ"] = PIXI.Texture.fromFrame("font7b.png");
    this.font["ユ"] = PIXI.Texture.fromFrame("font7c.png");
    this.font["欠番5"] = PIXI.Texture.fromFrame("font7d.png");
    this.font["ヨ"] = PIXI.Texture.fromFrame("font7e.png");
    this.font["ラ"] = PIXI.Texture.fromFrame("font7f.png");
    this.font["リ"] = PIXI.Texture.fromFrame("font710.png");
    this.font["ル"] = PIXI.Texture.fromFrame("font711.png");
    this.font["レ"] = PIXI.Texture.fromFrame("font712.png");
    this.font["ロ"] = PIXI.Texture.fromFrame("font713.png");
    this.font["ワ"] = PIXI.Texture.fromFrame("font714.png");
    this.font["欠番6"] = PIXI.Texture.fromFrame("font715.png");
    this.font["ヲ"] = PIXI.Texture.fromFrame("font716.png");
    this.font["欠番7"] = PIXI.Texture.fromFrame("font717.png");
    this.font["ン"] = PIXI.Texture.fromFrame("font718.png");
    this.font["ガ"] = PIXI.Texture.fromFrame("font80.png");
    this.font["ギ"] = PIXI.Texture.fromFrame("font81.png");
    this.font["グ"] = PIXI.Texture.fromFrame("font82.png");
    this.font["ゲ"] = PIXI.Texture.fromFrame("font83.png");
    this.font["ゴ"] = PIXI.Texture.fromFrame("font84.png");
    this.font["ザ"] = PIXI.Texture.fromFrame("font85.png");
    this.font["ジ"] = PIXI.Texture.fromFrame("font86.png");
    this.font["ズ"] = PIXI.Texture.fromFrame("font87.png");
    this.font["ゼ"] = PIXI.Texture.fromFrame("font88.png");
    this.font["ゾ"] = PIXI.Texture.fromFrame("font89.png");
    this.font["ダ"] = PIXI.Texture.fromFrame("font8a.png");
    this.font["ヂ"] = PIXI.Texture.fromFrame("font8b.png");
    this.font["ヅ"] = PIXI.Texture.fromFrame("font8c.png");
    this.font["デ"] = PIXI.Texture.fromFrame("font8d.png");
    this.font["ド"] = PIXI.Texture.fromFrame("font8e.png");
    this.font["バ"] = PIXI.Texture.fromFrame("font8f.png");
    this.font["ビ"] = PIXI.Texture.fromFrame("font810.png");
    this.font["ブ"] = PIXI.Texture.fromFrame("font811.png");
    this.font["ベ"] = PIXI.Texture.fromFrame("font812.png");
    this.font["ボ"] = PIXI.Texture.fromFrame("font813.png");
    this.font["パ"] = PIXI.Texture.fromFrame("font814.png");
    this.font["ピ"] = PIXI.Texture.fromFrame("font815.png");
    this.font["プ"] = PIXI.Texture.fromFrame("font816.png");
    this.font["ペ"] = PIXI.Texture.fromFrame("font817.png");
    this.font["ポ"] = PIXI.Texture.fromFrame("font818.png");
    this.font["ァ"] = PIXI.Texture.fromFrame("font90.png");
    this.font["ィ"] = PIXI.Texture.fromFrame("font91.png");
    this.font["ゥ"] = PIXI.Texture.fromFrame("font92.png");
    this.font["ェ"] = PIXI.Texture.fromFrame("font93.png");
    this.font["ォ"] = PIXI.Texture.fromFrame("font94.png");
    this.font["ッ"] = PIXI.Texture.fromFrame("font95.png");
    this.font["ャ"] = PIXI.Texture.fromFrame("font96.png");
    this.font["ュ"] = PIXI.Texture.fromFrame("font97.png");
    this.font["ョ"] = PIXI.Texture.fromFrame("font98.png");
    this.font["A"] = PIXI.Texture.fromFrame("fontA0.png");
    this.font["B"] = PIXI.Texture.fromFrame("fontA1.png");
    this.font["C"] = PIXI.Texture.fromFrame("fontA2.png");
    this.font["D"] = PIXI.Texture.fromFrame("fontA3.png");
    this.font["E"] = PIXI.Texture.fromFrame("fontA4.png");
    this.font["F"] = PIXI.Texture.fromFrame("fontA5.png");
    this.font["G"] = PIXI.Texture.fromFrame("fontA6.png");
    this.font["H"] = PIXI.Texture.fromFrame("fontA7.png");
    this.font["I"] = PIXI.Texture.fromFrame("fontA8.png");
    this.font["J"] = PIXI.Texture.fromFrame("fontA9.png");
    this.font["K"] = PIXI.Texture.fromFrame("fontAa.png");
    this.font["L"] = PIXI.Texture.fromFrame("fontAb.png");
    this.font["M"] = PIXI.Texture.fromFrame("fontAc.png");
    this.font["N"] = PIXI.Texture.fromFrame("fontAd.png");
    this.font["O"] = PIXI.Texture.fromFrame("fontAe.png");
    this.font["P"] = PIXI.Texture.fromFrame("fontAf.png");
    this.font["Q"] = PIXI.Texture.fromFrame("fontA10.png");
    this.font["R"] = PIXI.Texture.fromFrame("fontA11.png");
    this.font["S"] = PIXI.Texture.fromFrame("fontA12.png");
    this.font["T"] = PIXI.Texture.fromFrame("fontA13.png");
    this.font["U"] = PIXI.Texture.fromFrame("fontA14.png");
    this.font["V"] = PIXI.Texture.fromFrame("fontA15.png");
    this.font["W"] = PIXI.Texture.fromFrame("fontA16.png");
    this.font["X"] = PIXI.Texture.fromFrame("fontA17.png");
    this.font["Y"] = PIXI.Texture.fromFrame("fontA18.png");
    this.font["Z"] = PIXI.Texture.fromFrame("fontA19.png");
    this.font["a"] = PIXI.Texture.fromFrame("fontB0.png");
    this.font["b"] = PIXI.Texture.fromFrame("fontB1.png");
    this.font["c"] = PIXI.Texture.fromFrame("fontB2.png");
    this.font["d"] = PIXI.Texture.fromFrame("fontB3.png");
    this.font["e"] = PIXI.Texture.fromFrame("fontB4.png");
    this.font["f"] = PIXI.Texture.fromFrame("fontB5.png");
    this.font["g"] = PIXI.Texture.fromFrame("fontB6.png");
    this.font["h"] = PIXI.Texture.fromFrame("fontB7.png");
    this.font["i"] = PIXI.Texture.fromFrame("fontB8.png");
    this.font["j"] = PIXI.Texture.fromFrame("fontB9.png");
    this.font["k"] = PIXI.Texture.fromFrame("fontBa.png");
    this.font["l"] = PIXI.Texture.fromFrame("fontBb.png");
    this.font["m"] = PIXI.Texture.fromFrame("fontBc.png");
    this.font["n"] = PIXI.Texture.fromFrame("fontBd.png");
    this.font["o"] = PIXI.Texture.fromFrame("fontBe.png");
    this.font["p"] = PIXI.Texture.fromFrame("fontBf.png");
    this.font["q"] = PIXI.Texture.fromFrame("fontB10.png");
    this.font["r"] = PIXI.Texture.fromFrame("fontB11.png");
    this.font["s"] = PIXI.Texture.fromFrame("fontB12.png");
    this.font["t"] = PIXI.Texture.fromFrame("fontB13.png");
    this.font["u"] = PIXI.Texture.fromFrame("fontB14.png");
    this.font["v"] = PIXI.Texture.fromFrame("fontB15.png");
    this.font["w"] = PIXI.Texture.fromFrame("fontB16.png");
    this.font["x"] = PIXI.Texture.fromFrame("fontB17.png");
    this.font["y"] = PIXI.Texture.fromFrame("fontB18.png");
    this.font["z"] = PIXI.Texture.fromFrame("fontB19.png");
    this.font["ー"] = PIXI.Texture.fromFrame("fontC0.png");
    this.font["!"] = PIXI.Texture.fromFrame("fontC1.png");
    this.font["?"] = PIXI.Texture.fromFrame("fontC2.png");
    this.font["。"] = PIXI.Texture.fromFrame("fontC3.png");
    this.font["、"] = PIXI.Texture.fromFrame("fontC4.png");
    this.font["."] = PIXI.Texture.fromFrame("fontC5.png");
    this.font["("] = PIXI.Texture.fromFrame("fontC6.png");
    this.font[")"] = PIXI.Texture.fromFrame("fontC7.png");
    this.font["-"] = PIXI.Texture.fromFrame("fontC8.png");
    this.font["+"] = PIXI.Texture.fromFrame("fontC9.png");
    this.font["→"] = PIXI.Texture.fromFrame("fontCa.png");
    this.font["←"] = PIXI.Texture.fromFrame("fontCb.png");
    this.font["↑"] = PIXI.Texture.fromFrame("fontCc.png");
    this.font["↓"] = PIXI.Texture.fromFrame("fontCd.png");
  }
}
