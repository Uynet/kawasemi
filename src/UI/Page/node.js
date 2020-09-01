import UI from "../../UI/ui.js";
import Game from "../../game.js";
import Art from "../../art.js";
import UIManager from "../../UI/uiManager.js";

export default class Node extends UI {
  constructor(pos, stageNum, stageName) {
    super(pos);
    this.layer = "ENTITY";
    this.stageNum = stageNum;
    this.stageName = stageName;

    const spid = this.stageNum <= Game.nextStage ? 1 : 0;
    this.sprite = Art.Sprite(Art.enemyPattern.enemy4[spid]);
    this.sprite.position = pos;
    this.isActive = false;
    this.frame = 0;
  }
  OnDefocus() {
    this.isActive = false;
    this.sprite.position = this.pos;
  }
  OnFocus() {
    this.isActive = true;
    this.frame = 0;
    this.sprite.position = this.pos;
    Game.stage = this.stageNum;
    Game.currentStageSet = this.stageNum;
    const stagelabel = UIManager.find("stageLabel")[0];
    stagelabel.ChangeText(this.stageName, "MES");
    stagelabel.SetPos(vec2(108, 140));
  }
  Update() {
    /*
    if (this.isActive) {
      this.sprite.texture =
        Art.enemyPattern.enemy1[Math.floor(this.frame / 6) % 4];
    } else {
      this.sprite.texture = Art.enemyPattern.enemy4[0];
    }
    */
    this.frame++;
  }
}