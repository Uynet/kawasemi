import Mover from './mover.js'
import Art from '../art.js'
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Circle from '../Collision/Circle.js';
import Box from '../Collision/Box.js';
import Input from '../input.js';
import StageEntity from '../Stage/stageEntity.js';
import Util from '../util.js';
import EventManager from '../Event/eventmanager.js';
import Event from '../Event/event.js';
import StageResetEvent from '../Event/stageResetEvent.js';
import Teki1 from './teki1.js';
import Bullet from './bullet.js';

import Drawer from '../drawer.js';


/*TODO フラグの管理*/
export default class Player extends Mover{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    this.type = ENTITY.PLAYER;
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.hp = PLAYER_HP;
    this.gravity = PLAYER_GRAVITY;

    this.flagAlive = true;
    this.flagJump = false;//空中にいる時1
  }

  /*キー入力による移動*/
  moveByInput(){
    if(this.flagJump == false){
      if(Input.isKeyInput(KEY.UP) || Input.isKeyInput(KEY.Z)){
        this.vel.y = -JUMP_VEL;
        this.flagJump = true;
      }
    }
    if(Input.isKeyInput(KEY.LEFT)){
      this.vel.x = -RUN_VEL;
    }
    if(Input.isKeyInput(KEY.RIGHT)){
      this.vel.x = RUN_VEL;
    }


    if(Input.isKeyClick(KEY.X)){
      let bullet = new Bullet({x:this.pos.x+16 , y:this.pos.y});
      StageEntity.addEntity(bullet);
    }
  }

  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = StageEntity.getEntityList();

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.WALL :
        /*衝突判定*/
        if(Collision.on(this,l).isHit){
          /* 衝突応答*/
          /*TODO Colクラスに核*/

          /*フラグの解除*/
          if(Collision.on(this,l).n.y == -1){
            this.flagJump = 0;
          }

          /*速度*/
          if(Collision.on(this,l).n.x != 0) this.vel.x = 0;
          if(Collision.on(this,l).n.y != 0) this.vel.y = 0;

          /*押し出し*/
          while(Collision.on(this,l).isHit){
            this.pos.x += Collision.on(this,l).n.x/5;
            this.pos.y += Collision.on(this,l).n.y/5;
          }
          /*note : now isHit == false*/
        }
        break;
      }
    }
  }

  Update(){
    /*キー入力による移動*/
    this.moveByInput();

    Drawer.ScrollOnPlayer(this);

    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.y += this.gravity;

    if(this.flagJump == false){
      this.vel.x *= FRICTION;
    }

    /*衝突*/
    this.collision();

    /*observer*/
    if(this.hp <= 9){
      let restartEvent = new StageResetEvent(this);
      EventManager.PushEvent(restartEvent);
    }

    this.sprite.position = this.pos;
  }
}

