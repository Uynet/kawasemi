import Art from "../art.js";
import MapData from "./mapData.js";

let wallTileInfo = {
  outer: [52, 53, 54, 60, 61, 62, 68, 69, 70],
  inner: [67, 65, 51, 49],
  ID: 58
};
let backTileInfo = {
  outer: [28, 29, 30, 36, 37, 38, 44, 45, 46],
  inner: [43, 41, 27, 25],
  ID: 34
};

// Automatic Wall Tiling
export default class GenerateWall {
  //壁タイルIDとテクスチャの対応付
  static WallData(i, layer, x, y) {
    //エイリアス
    let wall = Art.wallPattern;
    let adaptive = Art.wallPattern.edge.adapt;
    let out = Art.wallPattern.edge.out;
    let inner = Art.wallPattern.edge.inner;
    let backOut = Art.wallPattern.edge.back.out;
    let backInner = Art.wallPattern.edge.back.inner;
    let steel = Art.wallPattern.steel;
    let needle = Art.wallPattern.needle;
    //戻り値データ
    let tex; //テクスチャ
    let material = "wall"; //材質
    let colType = "wall"; //すり抜け床かどうか
    let isBreakable = false; //壊せるか
    switch (i) {
      //Bigblock
      case 82:
        tex = wall.bigBlock[0];
        break;
      case 83:
        tex = wall.bigBlock[1];
        break;
      case 90:
        tex = wall.bigBlock[2];
        break;
      case 91:
        tex = wall.bigBlock[3];
        break;
      //block
      case 84:
        tex = wall.block;
        break;
      case 85:
        tex = wall.HPBlock;
        break;
      case 86:
        tex = wall.bulletBlock;
        break;
      //adaptive wall
      case 58:
        return this.WallData(this.AdaptMap(layer, x, y, wallTileInfo));
      //adaptive wall
      case 34:
        return this.WallData(this.AdaptMap(layer, x, y, backTileInfo));
      //edge in
      case 49:
        tex = inner[0];
        break;
      case 51:
        tex = inner[1];
        break;
      case 65:
        tex = inner[2];
        break;
      case 67:
        tex = inner[3];
        break;
      //edge out
      case 52:
        tex = out[0];
        break;
      case 53:
        tex = out[1];
        break;
      case 54:
        tex = out[2];
        break;
      case 60:
        tex = out[3];
        break;
      case 61:
        tex = out[4];
        break;
      case 62:
        tex = out[5];
        break;
      case 68:
        tex = out[6];
        break;
      case 69:
        tex = out[7];
        break;
      case 70:
        tex = out[8];
        break;
      //edge in back
      case 25:
        tex = backInner[0];
        break;
      case 27:
        tex = backInner[1];
        break;
      case 41:
        tex = backInner[2];
        break;
      case 43:
        tex = backInner[3];
        break;
      //edge out back
      case 28:
        tex = backOut[0];
        break;
      case 29:
        tex = backOut[1];
        break;
      case 30:
        tex = backOut[2];
        break;
      case 36:
        tex = backOut[3];
        break;
      case 37:
        tex = backOut[4];
        break;
      case 38:
        tex = backOut[5];
        break;
      case 44:
        tex = backOut[6];
        break;
      case 45:
        tex = backOut[7];
        break;
      case 46:
        tex = backOut[8];
        break;
      //steel
      case 72:
        tex = steel.entity[0];
        material = "steel";
        break;
      case 73:
        tex = steel.entity[1];
        material = "steel";
        break;
      case 74:
        tex = steel.entity[2];
        material = "steel";
        break;
      case 75:
        tex = steel.entity[3];
        material = "steel";
        break;
      case 76:
        tex = steel.back[0];
        break;
      case 77:
        tex = steel.back[1];
        break;
      case 78:
        tex = steel.back[2];
        break;
      case 79:
        tex = steel.back[3];
        break;
      //needle
      case 0:
      case 1:
      case 2:
      case 3:
        tex = needle[i];
        isBreakable = true;
        break;
      case 8:
      case 9:
      case 10:
      case 11:
        tex = needle[i - 4];
        break;
      //through
      case 96:
        tex = wall.through[0];
        colType = "through";
        material = "steel";
        break;
    }
    return {
      colType: colType,
      material: material,
      texture: tex,
      isBreakable: isBreakable
    };
  }

  //エッジを自動的にいい感じに対応させる
  //IDが帰ってくる
  static AdaptMap(layer, x, y, tileInfo) {
    /* 隣接項
     * 0 1 2
     * 3 4 5 < 4は自分なので冗長であるが入れている
     * 6 7 8
     * */
    let adj = this.GetIsAdjacent(layer, x, y, tileInfo);
    /* 外枠(非背景)のTiled上のID
     * 0 1 2
     * 3 4 5
     * 6 7 8
     * */
    // 外側の辺
    // 上
    if (!adj[1]) {
      if (!adj[3]) return tileInfo.outer[0]; //左上
      if (!adj[5]) return tileInfo.outer[2];
      //右上
      else return tileInfo.outer[1]; //真上
    }
    // 下
    if (!adj[7]) {
      if (!adj[3]) return tileInfo.outer[6]; //左下
      if (!adj[5]) return tileInfo.outer[8];
      //右下
      else return tileInfo.outer[7]; //ました
    }
    //左
    if (!adj[3]) return tileInfo.outer[3];
    //右
    if (!adj[5]) return tileInfo.outer[5];

    /* 内枠(非背景)のTiled上のID
     * 01
     * 23
     * */

    // 内側
    if (adj[1] && adj[3] && adj[5] && adj[7]) {
      if (!adj[0]) return tileInfo.inner[0]; //左上
      if (!adj[2]) return tileInfo.inner[1]; //
      if (!adj[6]) return tileInfo.inner[2]; //
      if (!adj[8]) return tileInfo.inner[3]; //
      return tileInfo.outer[4]; //中央
    }
    console.error("invalid tile");
  }
  //周囲8マスのステージ壁の有無
  static GetIsAdjacent(layer, x, y, tileInfo) {
    /*
     * [0,1,2,
     *  3,4,5,
     *  6,7,8]
     * */
    const adaptiveWallID = tileInfo.ID; //...ステージ壁
    let adj = [
      adaptiveWallID == MapData[layer][MapData.width * (y - 1) + (x - 1)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y - 1) + (x + 0)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y - 1) + (x + 1)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y + 0) + (x - 1)] - 1,
      true,
      adaptiveWallID == MapData[layer][MapData.width * (y + 0) + (x + 1)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y + 1) + (x - 1)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y + 1) + (x + 0)] - 1,
      adaptiveWallID == MapData[layer][MapData.width * (y + 1) + (x + 1)] - 1
    ];
    if (x == 0) {
      adj[0] = true;
      adj[3] = true;
      adj[6] = true;
    }
    if (x == this.width - 1) {
      adj[2] = true;
      adj[5] = true;
      adj[8] = true;
    }
    if (y == 0) {
      adj[0] = true;
      adj[1] = true;
      adj[2] = true;
    }
    if (y == this.height - 1) {
      adj[6] = true;
      adj[7] = true;
      adj[8] = true;
    }

    return adj;
  }
}
