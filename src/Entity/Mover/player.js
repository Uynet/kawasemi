import Mover from './mover.js'
import Art from '../../art.js'
import CollisionShape from '../../Collision/collisionShape.js';
import Collision from '../../Collision/collision.js';
import Circle from '../../Collision/Circle.js';
import Input from '../../input.js';
import StageEntity from '../../Stage/stageEntity.js';

const JUMP_VEL = 7;//ジャンプ速度

  export default class Player extends Mover{
    constructor(pos){
      super(pos,{x:0,y:-10},{x:0,y:0});
      this.type = ENTITY_TYPE.PLAYER;
      this.sprite = Art.SpriteFactory(Art.playerTexture);
      this.sprite.position = pos;
      this.collisionShape = new CollisionShape(SHAPE.CIRCLE,new Circle(pos,10));//衝突判定の形状
    }



    updatePosition(){
      if(Input.isKeyInput(40)){
        this.vel.y = JUMP_VEL;
      }
      if(Input.isKeyInput(38) || Input.isKeyInput(90)){
        this.vel.y = -JUMP_VEL;
      }
      if(Input.isKeyInput(37)){
        this.vel.x = -1;
      }
      if(Input.isKeyInput(39)){
        this.vel.x = 1;
      }

      this.pos.x += this.vel.x; 
      this.pos.y += this.vel.y; 
      this.sprite.position = this.pos;
      /* */
      this.vel.y += 0.8;

      /* 衝突判定 */
      /*TODO リスト分割 */
      let EntityList = StageEntity.getEntityList();
      
      for(let l of EntityList){
        if(l.type==ENTITY_TYPE.WALL){
          if(Collision.on(this,l).isHit){
            /* 衝突応答をかく */
            this.vel = {x:0,y:0};//とりあえず
          }
        }
      }


    }
  }

