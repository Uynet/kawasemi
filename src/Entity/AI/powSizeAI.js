import Ease from "../../Math/ease.js";

export default class PowScaleSprite{
  constructor(effect,a){
    this.effect = effect;
    this.ScalingFunc = Ease.pow(a);
  }
  Do(){
    this.effect.sprite.scale.set(this.ScalingFunc(this.effect.frame));
  }
}
