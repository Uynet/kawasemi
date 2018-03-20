//パラメータ管理クラス
export default class Param{
  static Init(){
    this.player = {
      jumpVel : 4.5,//ジャンプ力
      runVel : 0.4,//はしり速度
      gravity : 0.15,
      maxHp : 20,
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
      equip : "normal",
    }
    this.enemy1 = {
      hp : 10,
      atkMax : 10,
      atkMin : 5,
      gravity : 0.1,
      coin : 1
    }
    this.enemy2 = {
      hp : 20,
      atkMax : 10,
      atkMin : 5,
      gravity : 0.0,
      coin : 4
    }
    this.enemy3 = {
      hp : 100,
      atkMax : 10,
      atkMin : 5,
      gravity : 0,
      range : 80,
      coin : 3
    }
    this.enemy4 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0.2,
      coin : 2
    }
    this.enemy5 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0.2,
      term : 100,
      coin : 2
    }
    this.enemy6 = {
      hp : 10,
      atkMax : 3,
      atkMin : 1,
      gravity : 0,
      term : 100,
      coin : 1
    }
    this.eBullet1 = {
      hp : 1,
      atkMin : 1,
      atkMax : 1,
    }
    this.eBullet2 = {
      hp : 1,
      atkMin : 20,
      atkMax : 30,
      gravity : 0.05
    }
    this.weapon1 = {
      //status
      agi : 30,
      cost : 30,
      speed : 7, 
      length : 580,
      //optional
      isTarget : true,
      isHorming : true,
      isLasersight : true,
    }
    this.weapon11 = {
      agi : 2,
      cost : 6,
      speed : 0.0001, 
      length : 180,
    }
    this.weapon2 = {
      agi : 26,
      cost : 12,
      length : 300,
      //optional
      isTarget : true,
     // isHorming : false,
      isLasersight : false,
    }
    //normal
    this.weapon3 = {
      agi : 16,
      cost : 8,
      speed : 6, 
      length : 300,
      //optional
      isTarget : false,
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
      atkMax : 50,
      atkMin : 1,
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
