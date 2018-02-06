import Entity from './entity.js';

/* 動く物体クラス*/
export default class Mover extends Entity{
  /*
   * vel : 速度
   * acc : 加速度
   * */
  constructor(pos,vel){
    super(pos);
    this.vel = {
      x:vel.x,
      y:vel.y
    }
    this.acc = {x:0,y:0};
    this.AIList = [];//AIの配列
    //this.dir; //enum dirrection
  }
}
