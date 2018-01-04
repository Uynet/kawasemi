/* 動く物体クラス*/
class Mover extends Entity{
  /*
   * vel : 速度
   * acc : 加速度
   * */
  constructor(pos,vel,acc){
    super(pos);
    this.vel = vel;
    this.acc = acc;
    //this.dir; //enum dirrection
  }
}
