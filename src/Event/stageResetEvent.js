import Event from './event.js';

export default class StageResetEvent extends Event{
  //プレイヤーから参照を受け取り、
  //「プレイヤーの座標をリセットする関数」を返す
  constructor(player){
    super(1);
    let PositionReset = this.ReturnFunc(player);
    this.func = PositionReset;
  }

  ReturnFunc(player){
    let posreset = () =>{
      player.hp = 10;
      player.pos.x = 32;
      player.pos.y = 64;
      player.vel.x = 0;
      player.vel.y = 0;
      console.log("reset");
    }
    return posreset;
  }
}
