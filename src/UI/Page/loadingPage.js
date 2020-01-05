import Font from "../font.js";
import UI from "../ui.js";

export default class LoadingPage extends UI {
  constructor() {
    super(vec2(0));
    //背景色
    let BG = new UI(vec2(0));
    let rectBG = new PIXI.Graphics();
    rectBG.beginFill(0x201040);
    rectBG.drawRect(0, 0, 800, 640);
    rectBG.endFill();
    BG.sprite = rectBG;

    //ローディングバー
    let LoadingBar = new UI(vec2(0));
    LoadingBar.type = "OTHER";
    const f = function() {
      this.frame++;
      this.sprite.scale.x = Math.min(1, this.frame / 100);
      this.sprite.position.x = 8.0 - 8.0 * this.sprite.scale.x;
    };
    f.bind(LoadingBar);
    LoadingBar.Update = f;

    const w = 252;
    const h = 16;
    let rect = new PIXI.Graphics();
    rect.beginFill(0xec3070);
    rect.drawRect(8, 232 - w / 2, w, h);
    rect.endFill();
    LoadingBar.sprite = rect;

    //メッセージ
    const p = vec2(8, 196);
    let loadingmes = new Font(p, "ロードちゅう...", "MES");
    const f2 = function() {
      this.frame++;
      this.sprite.alpha = Math.pow(Math.sin(this.frame / 10), 2);
    };
    loadingmes.Update = f2;

    //進捗率
    const p2 = vec2(128, 96);
    let progress = new Font(p, "0%", "MES");
    const f3 = function() {
      this.frame++;
      const str = Math.min(this.frame, 100) + "%";
      this.ChangeText(str);

      //ちょっと跳ねる
      if (this.frame >= 100) {
        let d = this.frame - 100;
      }
    };
    progress.SetPos(p2);
    progress.Update = f3;

    /*
    const style = {}
    const componentTree = {
      leaf1:BG,
      leaf2:LoadingBar,
      leaf3:Loadingmes,
      leaf4:progress,
    }

    const component = new Component(componentTree,style,this,"root");
    */
    //本当はcomponentTreeにしたいが、実装が固まってから
    this.addChild(BG);
    this.addChild(LoadingBar);
    this.addChild(loadingmes);
    this.addChild(progress);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
