import Entity from '../entity.js';

export default class Enemy extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    this.type = ENTITY.ENEMY;
    this.hp;
    this.atk;
    this.AIList = [];//AIの配列
  }
  addAI(AI){
    this.AIList.push(AI);
  }
}
