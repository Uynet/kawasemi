import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Shot from '../AI/shot.js';
import MoveLissajous from '../AI/moveLissajous.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/Explosion/explosion2.js';

let STATE = {
  WAITING : "WAITING",
  ACTIVE : "ACTIVE",
}

export default class Enemy3 extends Enemy{
  constructor(pos){
    super(pos,vec0());
    /*基本情報*/
    this.name = "enemy3";
    this.arg = 0;
    this.frameShot = 0;//最後にshotした時刻
    this.BasicEnemyInit();
    /*スプライト*/
    this.sprite.position = add(this.pos , vec2(8));
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.addAI(new Shot(this));
    this.addAI(new MoveLissajous(this,1,1,1/10,1/8));
    /*state*/
    this.state = "WAITING";
  }
  OnCollisionEnemy(c,entity){
    Collision.Resolve(this,entity);
  }
  OnCollisionWall(c,entity){
    Collision.Resolve(this,entity);
  }

  Update(){
    this.AIList[0].Do();
    this.AIList[1].Do();
    if(EntityManager.player.weapon.isSeen(EntityManager.player,this)){
        this.state = "ACTIVE";
    }else{
      this.state = "WAITING";
    }
    switch(this.state){
      case "WAITING" :
        this.sprite.scale.set(1);
        this.sprite.rotation = 0; 
        this.spid = 0;
        this.vel = vec0();
        break;
      case "ACTIVE" :
        this.sprite.rotation += 0.1;
        this.sprite.scale.set(1 + Math.cos(this.frame/2)/5);
        this.spid = 1
        this.AIList[2].Do();
        this.AIList[3].Do();
        break;
      default :
        console.warn(this.state);
    }
    this.Collision();
    this.arg = argument(sub(EntityManager.player.pos,this.pos))
    this.sprite.position = add(this.pos,vec2(8));
  }
}
