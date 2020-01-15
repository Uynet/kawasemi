//全ステージに関するデータ
export default class StageData {
  static getStageBGM(stageNum) {
    if (stageNum == 0) return "title";
    if (101 <= stageNum && stageNum <= 199) return "stage8"; //tutorial
    if (201 <= stageNum && stageNum <= 299) return "stage8"; // shop
    if (301 <= stageNum && stageNum <= 399) return "stage5"; // cave2
    if (401 <= stageNum && stageNum <= 499) return "stage5"; // cave1
    if (stageNum == 501) return "0"; //ボス前
    if (stageNum == 502) return "0"; //boss
    if (stageNum == 1) return 0;
  }
  static Init() {
    this.StageBackGround = {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      21: 1
    };
  }
}
