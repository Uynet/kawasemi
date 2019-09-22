const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 640;
const DEFAULT_MAGNIFICATION = 3;
//const DEFAULT_MAGNIFICATION = 1;
let centerX, centerY, toX, toY;
export default class Drawer {
  /*setting stage*/
  static Init() {
    this.width = PIXI_WIDTH;
    this.height = PIXI_HEIGHT;
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {
      backgroundColor: 0xffffff
    });
    this.Stage = this.app.stage;
    /* コンテナ(レイヤー)は以下の通り 下から優先して描画される
     * Background
     * Backコンテナ
     * Entityコンテナ:Entityを描画するレイヤ
     * Effectコンテナ:画面に適用するエフェクトを描画するレイヤ
     * fore:手前に描画
     * UIコンテナ:UIを描画するレイヤ
     * */

    let Re = new PIXI.Rectangle(0, 0, PIXI_WIDTH / 2, PIXI_HEIGHT / 2);
    this.renderTarget = new PIXI.Sprite();

    this.backGroundContainer = new PIXI.Container(); //背景
    this.backContainer = new PIXI.Container(); //backEntity
    this.entityContainer = new PIXI.Container(); //Entity
    this.foreEntityContainer = new PIXI.Container(); //手前に表示する 文字エフェクトなど
    this.foreContainer = new PIXI.Container(); //手前に表示する 文字エフェクトなど
    this.filterContainer = new PIXI.Container(); //画面遷移フィルター
    this.UIContainer = new PIXI.Container(); //UI

    this.renderTarget.addChild(this.backGroundContainer);
    this.renderTarget.addChild(this.backContainer);
    this.renderTarget.addChild(this.entityContainer);
    this.renderTarget.addChild(this.foreEntityContainer);
    this.renderTarget.addChild(this.foreContainer);
    this.renderTarget.addChild(this.filterContainer);
    this.renderTarget.addChild(this.UIContainer);
    this.Stage.addChild(this.renderTarget);

    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH, PIXI_HEIGHT);

    /*拡大率*/
    this.magnification = DEFAULT_MAGNIFICATION;
    this.backGroundContainer.scale.set(DEFAULT_MAGNIFICATION);
    this.backContainer.scale.set(this.magnification);
    this.entityContainer.scale.set(this.magnification);
    this.UIContainer.scale.set(this.magnification);
    this.foreContainer.scale.set(this.magnification + 1);
    this.foreEntityContainer.scale.set(this.magnification);
    this.filterContainer.scale.set(this.magnification + 1);
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    this.outlineFilter = new PIXI.filters.NoiseFilter();

    this.mapSize = {
      width: 32,
      height: 32
    };
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite, CONTAINER) {
    switch (CONTAINER) {
      case "UI":
        this.UIContainer.addChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.addChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.addChild(sprite);
        break;
      case "FORE":
        this.foreContainer.addChild(sprite);
        break;
      case "FOREENTITY":
        this.foreEntityContainer.addChild(sprite);
        break;
      case "BACK":
        this.backContainer.addChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.addChild(sprite);
        break;
      default:
        console.warn(CONTAINER);
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite, container) {
    switch (container) {
      case "UI":
        this.UIContainer.removeChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.removeChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.removeChild(sprite);
        break;
      case "FORE":
        this.foreContainer.removeChild(sprite);
        break;
      case "FOREENTITY":
        this.foreEntityContainer.removeChild(sprite);
        break;
      case "BACK":
        this.backContainer.removeChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.removeChild(sprite);
        break;
      default:
        console.warn(container);
    }
  }

  static SetMap(x, y) {
    this.mapSize.width = x;
    this.mapSize.height = y;
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos) {
    //this.renderTarget.anchor.x = 0.5;
    //this.renderTarget.anchor.y = 0.5;
    //this.renderTarget.rotation = Math.PI + Math.sin(Timer.timer/100)*0.1;
    centerX = clamp(
      this.magnification * (-pos.x - 8) + PIXI_WIDTH / 2,
      this.magnification * (-this.mapSize.width * 16) + PIXI_WIDTH,
      0
    );
    centerY = clamp(
      //8ブロックぶん上げる
      this.magnification * (-pos.y - 8) + PIXI_HEIGHT / 2,
      this.magnification * (-this.mapSize.height * 16) + PIXI_HEIGHT,
      0
    );
    toX = this.entityContainer.x + (centerX - this.entityContainer.x) / 8;
    toY = this.entityContainer.y + (centerY - this.entityContainer.y) / 8;
    //背景レイヤ
    //スクロールが遅い
    this.backGroundContainer.x = Math.floor((toX / 4) % 256);
    this.backGroundContainer.y = Math.floor((toY / 4) % 256);
    //Entityレイヤ

    let to = vec2(Math.floor(toX - (toX % 2)), Math.floor(toY - (toY % 2)));
    let toDelay = vec2(
      Math.floor((toX * 4) / 3 - (toX % 2)),
      Math.floor((toY * 4) / 3 - (toY % 2))
    );
    this.backContainer.position = to;
    this.entityContainer.position = to;
    this.foreEntityContainer.position = to;
    this.foreContainer.position = toDelay;
    //UIは動かない
  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos) {
    centerX = clamp(
      this.magnification * (-pos.x - 8) + PIXI_WIDTH / 2,
      this.magnification * (-this.mapSize.width * 16) + PIXI_WIDTH,
      0
    );
    centerY = clamp(
      //8ブロックぶん上げる
      this.magnification * (-pos.y - 8) + PIXI_HEIGHT / 2,
      this.magnification * (-this.mapSize.height * 16) + PIXI_HEIGHT,
      0
    );
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreEntityContainer.x = Math.floor(centerX);
    this.foreEntityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }
  //フィルタ
  static SetFilter(filters) {
    //Drawer.renderTarget.filters = filters;
    const r = PIXI.getRenderTarget(); //.filters = filters;
  }
  static Dist() {
    let extract = this.Renderer.plugins.extract;
    let canvas = extract.canvas();
    const distContext = canvas.getContext("webgl");
    var rgba = context.getImageData(p.x, p.y, 1, 1).data;
  }
  static Quake(diff) {
    this.Stage.x = Math.floor(diff.x);
    this.Stage.y = Math.floor(diff.y);
  }
  static QuakeRot(arg) {
    this.renderTarget.rotation = arg;
  }
  static SetMagnification(magnification) {
    this.magnification = magnification;
    this.backGroundContainer.scale.set(DEFAULT_MAGNIFICATION);
    this.backContainer.scale.set(this.magnification);
    this.entityContainer.scale.set(this.magnification);
    //this.UIContainer.scale.set(this.magnification);
    this.foreContainer.scale.set(this.magnification + 1);
    this.foreEntityContainer.scale.set(this.magnification);
    this.filterContainer.scale.set(this.magnification + 1);
  }
  //塗りつぶし
  static ScreenPaint(color) {
    Drawer.SetFilter([Drawer.fireFilter]);
  }
  static ScreenPos(pos) {
    return sub(pos, this.entityContainer.position);
  }
  static SetFilter(filters) {
    Drawer.Stage.filters = filters;
  }
  static GetGameScreenSize() {
    return vec2(
      PIXI_WIDTH / DEFAULT_MAGNIFICATION,
      PIXI_HEIGHT / DEFAULT_MAGNIFICATION
    );
  }
}
