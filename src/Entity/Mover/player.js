import Mover from './mover.js'
import Art from '../../art.js'
import CollisionShape from '../../Collision/collisionShape.js';
import Collision from '../../Collision/collision.js';
import Circle from '../../Collision/Circle.js';
import Box from '../../Collision/Box.js';
import Input from '../../input.js';
import StageEntity from '../../Stage/stageEntity.js';
import Util from '../../util.js';

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
    this.flagJump = 0;//空中にいる時1
  }



  updatePosition(){
    if(Input.isKeyInput(KEY.DOWN)){
      //this.vel.y = JUMP_VEL;
      }
    if(this.flagJump==0){
      if(Input.isKeyInput(KEY.UP) || Input.isKeyInput(KEY.Z)){
        this.vel.y = -JUMP_VEL;
        this.flagJump = 1;
      }
    }
    if(Input.isKeyInput(KEY.LEFT)){
      this.vel.x = -RUN_VEL;
    }
    if(Input.isKeyInput(KEY.RIGHT)){
      this.vel.x = RUN_VEL;
    }

    //console.log(this.flagJump);
    Drawer.ScrollOnPlayer(this);

    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.sprite.position = this.pos;
    /* */
    this.vel.y += this.gravity;

    /* 衝突判定 */
    /*TODO リスト分割 */
    let EntityList = StageEntity.getEntityList();

    for(let l of EntityList){
      if(l.type==ENTITY_TYPE.WALL){
        if(Collision.on(this,l).isHit){
          /* 衝突応答をかく */

          /*押し出し*/
          if(Collision.on(this,l).n.y == -1){
            this.flagJump = 0;
          }
          //console.log(Collision.on(this,l).n);
          while(Collision.on(this,l).isHit){
            this.pos.x += Collision.on(this,l).n.x/4;
            this.pos.y += Collision.on(this,l).n.y/4;
          }
          this.vel = {x:0,y:0};//とりあえず
            /*この時点でのisHitはfalse*/
        }
      }
    }


  }
}

