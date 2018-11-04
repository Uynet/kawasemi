import Collision from '../../Collision/collision.js';

export default class BasicAI{
  constructor(effect){
    this.effect = effect;
  }
  Do(){
    this.effect.EffectPhysics();
  }
}
