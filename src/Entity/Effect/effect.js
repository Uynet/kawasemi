import Entity from '../entity.js';

//これ継承してる意味ある？？
export default class EFFECT extends Entity{
  constructor(pos,vel){
    if(!vel) vel = VEC0();
    super(pos,vel);
    this.type = "MOVER";
    this.layer = "ENTITY";
    this.isUpdater = true;
  }
}
