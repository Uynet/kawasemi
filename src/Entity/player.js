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
import Game from '../Game.js';

const JUMP_VEL = 7;//ジャンプ速度
  const RUN_VEL = 4;//はしり速度
const PLAYER_GRAVITY = 0.3;
const PLAYER_HP = 10;
const FRICTION = 0.9;
const POP_PLAYER = -1;

let rect = new PIXI.Rectangle(0,0,16,16);
/*TODO フラグの管理*/
export default class Player extends Mover{
  constructor(pos){
    super(pos,VEC0,VEC0);
    this.type = ENTITY.PLAYER;
    this.texture = Art.playerTexture;
    this.texture.frame = rect;
    this.sprite = Art.SpriteFactory(this.texture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.hp = PLAYER_HP;
    this.gravity = PLAYER_GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
    this.flagAlive = true;
    this.flagJump = false;//空中にいる時1
      this.dir = DIR.RIGHT;//向き
  }

  /*パターン画像の左上から何番目をクリップするか選択*/
  pattern(i){
    rect.x = i*16;
    this.texture.frame = rect;
    return this.texture;
  }

  /*キー入力による移動*/
  moveByInput(){
    /*ジャンプ*/
    if(Input.isKeyInput(KEY.Z)){
      if(this.flagJump == false){
        this.vel.y = -JUMP_VEL;
        this.flagJump = true;
      }
    }
    /*上向き*/
    if(Input.isKeyInput(KEY.UP)){
      this.dir = DIR.UP;
      this.arg = -Math.PI/2;
      this.pattern(2);
    }
    /*左向き*/
    if(Input.isKeyInput(KEY.LEFT)){
      this.dir = DIR.LEFT;
      this.arg = Math.PI;
      this.pattern(1);
      this.vel.x = -RUN_VEL;
      if(!this.flagJump){
        this.flagJump = true;
        this.vel.y = POP_PLAYER;
      }
    }
    /*右向き*/
    if(Input.isKeyInput(KEY.RIGHT)){
      this.dir = DIR.RIGHT;
      this.arg = 0;
      this.texture = this.pattern(0);
      this.vel.x = RUN_VEL;
      if(!this.flagJump){
        this.flagJump = true;
        this.vel.y = POP_PLAYER;
      }
    }


    if(Input.isKeyClick(KEY.X)){
      /*これはbulletが持つべき*/
      //bulletの初速度
      for(let i = 0;i<500;i++){
        let vi = 5 + 5 * Math.random();
        let v = {
          x: vi * Math.cos(this.arg+ (Math.random()/2)/5),
          y: vi * Math.sin(this.arg+ (Math.random()/2)/5)
        }
        //bulletの出現位置
        let p = {
          x: this.pos.x + 5 * Math.cos(this.arg),
          y: this.pos.y + 5 * Math.sin(this.arg),
        }
        let bullet = new Bullet(p,v);
        StageEntity.addEntity(bullet);
      }
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

