import entityManager from '../../Stage/entityManager.js';
import AI from './ai.js';
import Collision from '../../Collision/collision.js';

//リサージュ曲線で移動
export default class MoveLissajous extends AI{

  constructor(enemy,Xamp,Yamp,Xfreq,Yfreq){
    super(enemy);
    this.Xamp = Xamp;
    this.Yamp = Yamp;
    this.Xfreq = Xfreq;
    this.Yfreq = Yfreq;
    console.assert(Xamp+Yamp+Xfreq+Yfreq);
  }
  Do(enemy){
    this.enemy.vel.x = this.Xamp*Math.sin(this.enemy.frame*this.Xfreq);
    this.enemy.vel.y = this.Yamp*Math.cos(this.enemy.frame*this.Yfreq);
  }
}
