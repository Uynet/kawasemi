//パラメータ管理クラス
export default class Param{
  static Init(){
    this.player = {
      JUMP_VEL : 5,//ジャンプ力
      RUN_VEL : 0.4,//はしり速度
      GRAVITY : 0.15,
      HP : 100,
      BULLET : 100,
      FLICTION : 0.7,
      INV_TIME : 5,//無敵時間
      
      ANIM_RUN : 4,
      ANIM_WAIT : 7,

      VX_MAX : 3,
      VY_MAX : 8
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
      agi : 3,
      cost : 3,
      speed : 10, 
      length : 180,
      //optional
      isTarget : true,
      isHorming : false,
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
      isLasersight : true,
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
      atkMax : 10,
      atkMin : 5,
      hp : 99999,
    }
  }
  GetParam(entity){
    return this.weapon1;
  }
}
