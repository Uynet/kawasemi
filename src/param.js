import { debugOption } from "./debug.js";
//パラメータ管理クラス
export default class Param {
  static ApplyDebugOption() {
    this.player.havingWeaponList = debugOption.playerHavingWeaponList;
    this.player.score = debugOption.score;
    if (debugOption.invincibleMode) Param.bullet1.atkMax = 9999;
  }
  static isHaveWeapon(name) {
    return this.player.havingWeaponList[name];
  }
  static GetWeapon(name) {
    this.player.havingWeaponList[name] = true;
  }
  static Init() {
    this.frags = {
      isShopEverUsed: false //  今までにshopを開いたことがあるか/チュートリアル用
    };
    this.player = {
      //プレイ中ステータス
      jumpVel: 6.2, //ジャンプ力
      runVel: 0.3, //はしり速度
      gravity: 0.26,
      maxHp: 10,
      maxBullet: 100,
      fliction: 0.7,
      invTime: 30, //無敵時間

      animRun: 4,
      animWait: 11,
      score: 0,

      vxMax: 3,
      vyMax: 7,
      //手に入れた武器の情報
      havingWeaponList: {
        normal: true,
        missile: false,
        laser: false,
        fire: false,
        weapon5: false
      },
      //装備中の武器
      equip: "normal"
    };
    (this.player.status = {
      hp: this.player.maxHp,
      bullet: this.player.maxBullet
    }),
      (this.enemy1 = {
        hp: 500,
        atkMax: 10000,
        atkMin: 1,
        gravity: 0.03,
        coin: 35
      });
    this.enemy2 = {
      hp: 10,
      atkMax: 5,
      atkMin: 1,
      gravity: 0.0,
      coin: 4
    };
    this.enemy3 = {
      hp: 50,
      atkMax: 10,
      atkMin: 1,
      gravity: 0,
      range: 80,
      coin: 6
    };
    this.enemy4 = {
      hp: 5,
      atkMax: 3,
      atkMin: 2,
      gravity: 0.2,
      coin: 2
    };
    this.enemy5 = {
      hp: 5,
      atkMax: 3,
      atkMin: 1,
      gravity: 0,
      term: 80,
      coin: 2
    };
    this.enemy6 = {
      hp: 1,
      atkMax: 3,
      atkMin: 1,
      gravity: 0,
      term: 50,
      coin: 1,
      exp: 49
    };
    this.enemy7 = {
      hp: 50,
      atkMax: 3,
      atkMin: 2,
      gravity: 0.02,
      coin: 2
    };
    this.eBullet1 = {
      hp: 1,
      atkMin: 2,
      atkMax: 4
    };
    this.eBullet2 = {
      hp: 1,
      atkMin: 5,
      atkMax: 10,
      gravity: 0.05
    };
    this.weapon1 = {
      //status
      agi: 25,
      cost: 50,
      speed: 12,
      length: 280,
      remain: 180,
      //optional
      isTarget: true,
      isHorming: true,
      isLasersight: false
    };
    this.weapon2 = {
      agi: 25,
      cost: 20,
      length: 300,
      //optional
      isTarget: true,
      // isHorming : false,
      isLasersight: true
    };
    //normal
    this.weapon3 = {
      agi: 7,
      cost: 3,
      speed: 6,
      length: 150,
      //optional
      isTarget: true,
      isHorming: true,
      isLasersight: false
    };
    //??
    this.fire = {
      agi: 1,
      cost: 2,
      speed: 4,
      length: 400,
      //optional
      isTarget: true,
      // isHorming : false,
      isLasersight: false
    };
    //??
    this.weapon5 = {
      agi: 300,
      cost: 1,
      speed: 1,
      length: 300,
      //optional
      isTarget: true,
      // isHorming : false,
      isLasersight: false
    };
    //Missile
    this.bullet1 = {
      atkMax: 25,
      atkMin: 18,
      hp: 1,
      curve: 0.2
    };
    //Laser
    this.bullet2 = {
      atkMax: 20,
      atkMin: 15,
      hp: 99999
    };
    //normal
    this.bullet3 = {
      atkMax: 5,
      atkMin: 3,
      hp: 1,
      curve: 0.1,
      deleteFrameCount: 180 //残存時間
    };
    this.bullet4 = {
      atkMax: 1,
      atkMin: 1,
      hp: 10,
      curve: 0.2
    };
    if (isDebugMode) Param.ApplyDebugOption();
  }
}
