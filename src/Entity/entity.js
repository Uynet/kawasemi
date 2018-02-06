export default class Entity{
  constructor(pos,vel){
    this.pos = pos;
    this.vel = vel;
    this.acc = {
      x:0,
      y:0
    }
    
    this.sprite;
    this.type;//enum
  }
}


