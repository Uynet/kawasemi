//パラメータ管理クラス
export default class Param{
  static Init(){
    this.player = {
      jumpVel : 5,//ジャンプ力
      runVel : 0.4,//はしり速度
      gravity : 0.15,
      maxHp : 100,
      maxBullet : 100,
      fliction : 0.7,
      invTime : 5,//無敵時間
      
      animRun : 4,
      animWait : 7,

      vxMax : 3,
      vyMax : 8,
      //手に入れた武器の情報
      weapon : {
        missile : true,
        laser : true,
      },
      //装備中の武器
      equip : "missile",
    }
    this.ENEMY1 = {
      HP : 5,
      ATK_MAX : 10,
      ATK_MIN : 5,
      GRAVITY : 0.1
    }
    this.ENEMY2 = {
      HP : 50,
      ATK_MAX : 10,
      ATK_MIN : 5,
      GRAVITY : 0.1,
      COIN : 3
    }
    this.weapon1 = {
      //status
      agi : 14,
      cost : 2,
      speed : 9, 
      length : 180,
      //optional
      isTarget : true,
      isHorming : true,
      isLasersight : true,
    }
    this.weapon11 = {
      agi : 2,
      cost : 3,
      speed : 0.0001, 
      length : 180,
    }
    this.weapon2 = {
      agi : 20,
      cost : 10,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //Missile
    this.bullet1 = {
      atkMax : 50,
      atkMin : 10,
      hp : 1,
      curve : 0.2
    }
    //Laser
    this.bullet2 = {
      atkMax : 100,
      atkMin : 5,
      hp : 99999,
    }
    //normal
    this.bullet3 = {
      atkMax : 12,
      atkMin : 10,
      hp : 1,
      curve : 0.2
    }
  }
}
