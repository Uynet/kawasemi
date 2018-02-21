//パラメータ管理クラス
//セーブデータの保存にも使う
export default class Param{
  static Init(){
    this.PLAYER = {
      JUMP_VEL : 5,//ジャンプ力
      RUN_VEL : 0.4,//はしり速度
      GRAVITY : 0.15,
      HP : 100,
      BULLET : 100,
      FLICTION : 0.7,
      INV_TIME : 5,//無敵時間
      /*アニメーションのインターバル*/
      ANIM_RUN : 4,
      ANIM_WAIT : 7,

      VX_MAX : 3,
      VY_MAX : 11
    }

  }
}
