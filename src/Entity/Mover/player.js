import Mover from './mover.js'
import Art from '../../art.js'
import CollisionShape from '../../Collision/collisionShape.js';
import Collision from '../../Collision/collision.js';
import Circle from '../../Collision/Circle.js';
import Box from '../../Collision/Box.js';
import Input from '../../input.js';
import StageEntity from '../../Stage/stageEntity.js';
import Util from '../../util.js';
import EventManager from '../../Event/eventmanager.js';

import Drawer from '../../drawer.js';

const JUMP_VEL = 13;//ジャンプ速度
  const RUN_VEL = 5;//はしり速度
const PLAYER_GRAVITY = 0.2;

/*TODO フラグの管理*/
export default class Player extends Mover{
  constructor(pos){
    super(pos,{x:0,y:-10},{x:0,y:0});
    this.type = ENTITY_TYPE.PLAYER;
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
      this.gravity = PLAYER_GRAVITY;
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
      console.log("unko");
      EventManager.PushEvent(1);
      this.pos.x = 0;
      this.pos.y = 0;
    }
  }

  updatePosition(){
    /*キー入力による移動*/
    this.moveByInput();

    Drawer.ScrollOnPlayer(this);

    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.y += this.gravity;

    /* 衝突判定 */
    /*TODO リスト分割 */
    let EntityList = StageEntity.getEntityList();

    for(let l of EntityList){
      if(l.type==ENTITY_TYPE.WALL){
        /*衝突判定*/
        if(Collision.on(this,l).isHit){
          /* 衝突応答*/
          /*TODO Colクラスに核*/
          if(Collision.on(this,l).n.y == -1){
            this.flagJump = 0;
          }
          //console.log(Collision.on(this,l).n);
          if(Collision.on(this,l).n.x != 0) this.vel.x = 0;
          if(Collision.on(this,l).n.y != 0) this.vel.y = 0;
          while(Collision.on(this,l).isHit){
            this.pos.x += Collision.on(this,l).n.x;
            this.pos.y += Collision.on(this,l).n.y;
          }
          /*note : now isHit == false*/
        }
      }
    }

    this.sprite.position = this.pos;
  }
}

