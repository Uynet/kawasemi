//パラメータ管理クラス
export default class Param{
  static Init(){
    this.player = {
      //プレイ中ステータス
      status : {
        hp : 100,
        bullet : 100,
      },
      jumpVel : 6.2,//ジャンプ力
      runVel : 0.4,//はしり速度
      gravity : 0.30,
      maxHp : 100,
      maxBullet : 100,
      fliction : 0.7,
      invTime : 5,//無敵時間
      
      animRun : 4,
      animWait : 7,
      score : 0,

      vxMax : 3,
      vyMax : 7,
      //手に入れた武器の情報
      havingWeaponList : {
        normal : true,
        missile :false,
        laser : false,
        weapon4 : false,//false,
        weapon5 : false,//false,
      },
      //装備中の武器
      equip : "normal",
    }
    this.enemy1 = {
      hp : 3000,
      atkMax : 10000,
      atkMin : 1,
      gravity : 0.030,
      coin : 15
    }
    this.enemy2 = {
      hp : 20,
      atkMax : 10,
      atkMin : 5,
      gravity : 0.0,
      coin : 4
    }
    this.enemy3 = {
      hp : 30,
      atkMax : 10,
      atkMin : 5,
      gravity : 0,
      range : 80,
      coin : 3
    }
    this.enemy4 = {
      hp : 20,
      atkMax : 5,
      atkMin : 1,
      gravity : 0.2,
      coin : 2
    }
    this.enemy5 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0,
      term : 80,
      coin : 2
    }
    this.enemy6 = {
      hp : 1,
      atkMax : 3,
      atkMin : 1,
      gravity : 0,
      term : 50,
      coin : 1,
      exp : 49,
    }
    this.eBullet1 = {
      hp : 1,
      atkMin : 2,
      atkMax : 4,
    }
    this.eBullet2 = {
      hp : 1,
      atkMin : 5,
      atkMax : 10,
      gravity : 0.05
    }
    this.weapon1 = {
      //status
      agi : 13,
      cost : 6,
      speed : 2, 
      length : 580,
      //optional
      isTarget : true,
      isHorming : true,
      isLasersight : false,
    }
    this.weapon2 = {
      agi : 26,
      cost : 10,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : true,
    }
    //normal
    this.weapon3 = {
      agi : 6,
      cost : 1,
      speed : 10, 
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //??
    this.weapon4 = {
      agi : 1,
      cost : 1,
      speed : 10, 
      length : 30,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //??
    this.weapon5 = {
      agi : 300,
      cost : 1,
      speed : 1, 
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //Missile
    this.bullet1 = {
      atkMax : 50,
      atkMin : 20,
      hp : 1,
      curve : 0.2
    }
    //Laser
    this.bullet2 = {
      atkMax : 50,
      atkMin : 25,
      hp : 99999,
    }
    //normal
    this.bullet3 = {
      atkMax : 12,
      atkMin : 8,
      hp : 1,
      curve : 0.2
    }
  }
}
