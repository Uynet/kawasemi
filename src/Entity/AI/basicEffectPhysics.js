import Collision from '../../Collision/collision.js';

export default class BasicEffectPhysics{
  constructor(effect){
    this.effect = effect;
  }
  Do(){
    this.effect.EffectPhysics();
  }
}
