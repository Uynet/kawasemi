export default class BasicExplosionAI{
  constructor(explosion){
    this.explosion = explosion;
  }
  Do(){
    //爆発して自分は消える
    this.explosion.Bomb();
  }
}
