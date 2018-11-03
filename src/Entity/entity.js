import Collider from '../Collision/collider.js';
import Timer from "../timer.js";
import EntityManager from "../Stage/entityManager.js";
import Box from '../Collision/box.js';
import Animator from "./AI/animator.js";

export default class Entity{
  constructor(pos,vel){
    /*phys*/
    this.pos = pos;
    this.vel = vel;
    this.acc = VEC0();
    this.force = VEC0();
    this.gravity;
    this.size = 16;
    //this.e = 0.9;
    /*standard*/
    this.frame = 0;
    this.spid = 0;
    this.type = "MOVER";//最も深い階層に書いたもので上書きされる
    //this.collider;
    //this.isUpdater = true;    
    //this.isMultiple;
    /*sprite*/
    //this.sprite;
    //this.container;
    /*未実装*/
    this.layer;
    /* Other */
    this.AIList = [];
  }
  /*common*/
  Physics(){};
  BasicPhysics(){
    this.acc.x += this.force.x*Timer.timeScale; 
    this.acc.y += this.force.y*Timer.timeScale; 
    this.vel.x += this.acc.x*Timer.timeScale; 
    this.vel.y += this.acc.y*Timer.timeScale; 
    this.pos.x += this.vel.x*Timer.timeScale+this.acc.x*this.acc.x*Timer.timeScale; 
    this.pos.y += this.vel.y*Timer.timeScale+this.acc.y*this.acc.y*Timer.timeScale; 
    this.acc.y = 0;
    this.acc.x = 0;
  }
  MoveByGravity(){
    if(this.gravity)this.acc.y += this.gravity;
  }
  MoveOnFloor(){
    //動く床に乗っている時
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x*Timer.timeScale;  
      this.pos.y += this.floor.under.vel.y*Timer.timeScale;  
    }
  }
  Collision(){};
  Update(){};
  Set(param , value){
    this[param] = value;
  }
  SetSize(size){
    this.size = size;
    this.sprite.scale.set(this.size/16);
    this.collider = new Collider(SHAPE.BOX,new Box(this.pos,this.size,this.size));//衝突判定の形状
  }
  AddForce(f){
    this.force.x = f.x;
    this.force.y = f.y;
  }
  ExecuteAI(){
    for (let AI of this.AIList){
      AI.Do();
    }
  }
  Delete(){
    EntityManager.removeEntity(this);
  }
  addAI(AI){
    this.AIList.push(AI);
  }
  addAnimator(isLoop,term,frames){
    this.addAI(new Animator(this,isLoop,term,frames));
  }
  onAnimationEnd(){
    this.Delete();
  }
  /*Hurt()*/
}


