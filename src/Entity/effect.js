import Entity from './entity.js';

//これ継承してる意味ある？？
export default class EFFECT extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    this.type = ENTITY.EFFECT;
    /*パラメータ*/
  }
}
