import Font from "../font.js";
import UI from "../ui.js";
import UIManager from "../uiManager.js";
import Game from "../../game.js";
import Key from "../atoms/key.js";
import Node from "./node.js";
import NodeList from "./nodeList.js";
import MapCusor from "./mapCusor.js";

export default class WorldMapPage extends UI {
  constructor() {
    super(vec2(0));
    this.layer = "ENTITY";

    //UIManager.add(new Font(vec2(100, 64), "world", "MES"));

    const stagelabel = new Font(vec2(108, 140), "stage" + Game.stage, "MES");
    stagelabel.type = "stageLabel";
    UIManager.add(stagelabel);
    const keyLeft = new Key(vec2(90, 134), "LEFT");
    keyLeft.type = "keyLeft";
    UIManager.add(keyLeft);
    const keyRight = new Key(vec2(166, 134), "RIGHT");
    keyRight.type = "keyRight";
    UIManager.add(keyRight);

    UIManager.add(new Key(vec2(190, 164), "X"));
    UIManager.add(new Font(vec2(210, 170), "けってい", "MES"));

    UIManager.add(new Key(vec2(190, 184), "Z"));
    UIManager.add(new Font(vec2(210, 190), "タイトル", "MES"));

    let p = vec2(106, 124);
    const stagelist = [101, 201, 301, 402, 404, 501];
    //クリアしてない最小のステージ番号を取得
    for (let i = 0; i < stagelist.length; i++) {
      const e = stagelist[i];
      if (e > Game.latestStage) {
        Game.nextStage = e;
        break;
      }
    }

    const stageNames = ["start", "shop", "cave1", "cave2", "cave3", "boss"];
    const nodes = [];
    for (let i = 0; i < stagelist.length; i++) {
      nodes.push(new Node(p, stagelist[i], stageNames[i]));
      p.x += 32;
    }
    const nodeList = new NodeList(nodes);
    this.addChild(nodeList);
    const cusor = new MapCusor(nodeList);

    // さっきプレイしたステージセットにフォーカスをあわせる
    let index = stagelist.indexOf(Game.currentStageSet);
    if (index == -1) {
      console.warn("invalid:", Game.currentStageSet);
      index = 0;
    }
    cusor.FocusInitialize(nodes[index]);
    this.addChild(cusor);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
