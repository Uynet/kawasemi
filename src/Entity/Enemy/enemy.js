import Entity from '../entity.js';

export default class Enemy extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    /*固有情報*/
    this.AIList = [];//AIの配列
  }
  addAI(AI){
    this.AIList.push(AI);
  }
}
