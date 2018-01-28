import Mover from './mover.js'
import Art from '../art.js'
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/Box.js';
import Input from '../input.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import EventManager from '../Event/eventmanager.js';
import Event from '../Event/event.js';
import StageResetEvent from '../Event/stageResetEvent.js';
import Drawer from '../drawer.js';
import Game from '../Game.js';
import WeaponManager from '../Weapon/weaponManager.js';
import Timer from '../timer.js';

const JUMP_VEL = 7;//ジャンプ速度
const RUN_VEL = 0.5;//はしり速度
const PLAYER_GRAVITY = 0.3;
const PLAYER_HP = 100;
const FLICTION = 0.7;
const POP_PLAYER = -1;

const VX_MAX = 3;
const VY_MAX = 3;

export default class Player extends Mover{
  constructor(pos){
    super(pos,VEC0,{x:0,y:0});
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.type = ENTITY.PLAYER;
    /*スプライト*/
    this.pattern = Art.playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos ;
    /*パラメータ*/
    this.hp = PLAYER_HP;
    this.gravity = PLAYER_GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
    /*フラグ*/
    this.isAlive = true;//生きているか
    this.isJump = false;//空中にいるか
    this.isRun = false;//走っているか
    /*状態*/
    this.weapon = WeaponManager.weaponList[0];//選択中の武器のインスタンス
    this.dir = DIR.RIGHT;//向き
  }

  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(Input.isKeyInput(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = -JUMP_VEL;
        this.isJump = true;
      }
    }
    /*右向き*/
    if(Input.isKeyInput(KEY.RIGHT)){
      this.dir = DIR.RIGHT;
      this.isRun = true;
      this.arg = 0;
      this.acc.x = RUN_VEL;
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
    }

    /*左向き*/
    if(Input.isKeyInput(KEY.LEFT)){
      this.dir = DIR.LEFT;
      this.isRun = true;
      this.arg = Math.PI;
      this.acc.x = -RUN_VEL;
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
    }
    /*上向き*/
    if(Input.isKeyInput(KEY.UP)){
      this.dir = DIR.UP;
      this.arg = -Math.PI/2;
    }
    /*下向き*/
    if(Input.isKeyInput(KEY.DOWN)){
      this.dir = DIR.DOWN;
      this.arg = Math.PI/2;
    }
    /*shot*/
    if(Input.isKeyInput(KEY.X)){
      this.weapon.Target(this);
      this.weapon.shot(this);
    }
    /*for debug*/
    if(Input.isKeyInput(KEY.SP)){
      Drawer.Yakudo();
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    switch(this.dir){
      case DIR.RIGHT :
        (this.isRun) ? this.spid = 0 + (Math.floor(Timer.timer/10))%4
                     : this.spid = 0;
        break;
      case DIR.LEFT :
        (this.isRun) ? this.spid = 4 + (Math.floor(Timer.timer/10))%4
                     : this.spid = 4;
        break;
      case DIR.UP :
        (this.isRun) ? this.spid = 8 + (Math.floor(Timer.timer/10))%4
                     : this.spid = 8;
        break;
      case DIR.DOWN :
        (this.isRun) ? this.spid = 12 + (Math.floor(Timer.timer/10))%4
                     : this.spid = 12;
        break;
    }
    this.sprite.texture = this.pattern[this.spid];
  }

  /*武器チェンジ*/
  ChangeWeapon(name){
    WeaponManager.ChangeWeapon(this,name);
  }

  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = EntityManager.entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.WALL :
          /*衝突判定*/
          if(Collision.on(this,l).isHit){
            /* 衝突応答*/
            /*TODO Colクラスに核*/

            /*フラグの解除*/
            if(Collision.on(this,l).n.y == -1){
              this.isJump = 0;
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
  Physics(){
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.vel.y += this.gravity;
    if(this.vel.x > VX_MAX)this.vel.x = VX_MAX;
    if(this.vel.x < -VX_MAX)this.vel.x = -VX_MAX;
    if(this.isJump == false){
      this.vel.x *= FLICTION;
    }
    this.acc.x = 0;

  }

  Update(){
    this.isRun = false;
    this.Input();//入力
    this.Physics();//物理
    this.collision();//衝突
    this.Animation();//状態から画像を更新
    Drawer.ScrollOnPlayer(this);

    /*observer*/
    if(this.hp <= 0){
      let restartEvent = new StageResetEvent(this);
      EventManager.PushEvent(restartEvent);
    }

    this.sprite.position = this.pos;
  }
}

