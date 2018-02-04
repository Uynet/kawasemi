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
import UIManager from '../UI/uiManager.js';

const JUMP_VEL = 7;//ジャンプ力
  const RUN_VEL = 0.5;//はしり速度
const PLAYER_GRAVITY = 0.4;
const PLAYER_HP = 100;
const FLICTION = 0.7;
const POP_PLAYER = -1;
/*アニメーションのインターバル*/
const ANIM_RUN = 3;
const ANIM_WAIT = 7;

const VX_MAX = 3;
const VY_MAX = 7;

let state = {
  WAITING : 0,
  RUNNING  : 1,
  FALLING : 3,
  DEAD : 4
}
/*フラグと状態が同じものを意味しててキモい*/

export default class Player extends Mover{
  constructor(pos){
    super(pos,VEC0,{x:0,y:0});
    /*基本情報*/
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.type = ENTITY.PLAYER;
    this.frame = 0;
    this.frameDead;//死んだ時刻
    /*スプライト*/
    this.pattern = Art.playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.hp = PLAYER_HP;
    this.gravity = PLAYER_GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
    /*状態*/
    this.state = state.WAITING;
    this.weapon = WeaponManager.weaponList[0];//選択中の武器のインスタンス
    this.dir = DIR.RIGHT;//向き
    /*フラグ*/
    this.isJump = false;//空中にいるか
    this.isRun = false;//走っているか
    this.isAlive = true;//
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
      this.state = state.RUNNING;
      this.dir = DIR.RIGHT;
      this.isRun = true;
      this.arg = 0;
      this.acc.x = RUN_VEL;
      /*
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
      */
    }
    /*左向き*/
    if(Input.isKeyInput(KEY.LEFT)){
      this.state = state.RUNNING;
      this.dir = DIR.LEFT;
      this.isRun = true;
      this.arg = Math.PI;
      this.acc.x = -RUN_VEL;
      /*
      if(!this.isJump){
        this.isJump = true;
        this.vel.y = POP_PLAYER;
      }
      */
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
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    switch(this.state){
      case state.WAITING :
        switch(this.dir){
          case DIR.RIGHT :
            this.spid = 16 + (Math.floor(Timer.timer/ANIM_WAIT))%4
            break;
          case DIR.LEFT :
            this.spid = 20 + (Math.floor(Timer.timer/ANIM_WAIT))%4
            break;
          case DIR.UP :
            this.spid = 24 + (Math.floor(Timer.timer/ANIM_WAIT))%4
            break;
          case DIR.DOWN :
            this.spid = 28 + (Math.floor(Timer.timer/ANIM_WAIT))%4
            break;
        }
        break;
      case state.RUNNING :
        switch(this.dir){
          case DIR.RIGHT :
            this.spid = 0 + (Math.floor(Timer.timer/ANIM_RUN))%4
            break;
          case DIR.LEFT :
            this.spid = 4 + (Math.floor(Timer.timer/ANIM_RUN))%4
            break;
          case DIR.UP :
            this.spid = 8 + (Math.floor(Timer.timer/ANIM_RUN))%4
            break;
          case DIR.DOWN :
            this.spid = 12 + (Math.floor(this.frame/ANIM_RUN))%4
            break;
        }
        break;
      case state.DEAD :
        this.spid = 32 + (Math.floor((this.frame - this.frameDead)/ANIM_RUN));
        if(this.spid == 40){
          this.spid = 39;
          let restartEvent = new StageResetEvent();
          EventManager.PushEvent(restartEvent);
        }
        break;
    }
    this.sprite.texture = this.pattern[this.spid];
  }

  /*武器チェンジ*/
  ChangeWeapon(name){
    WeaponManager.ChangeWeapon(this,name);
  }
  /*ダメージ*/
  /*負の値を入れる*/
  Damage(atk){
    this.hp+=atk;
    UIManager.HP.Bar();
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    for(let l of EntityManager.wallList){
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
    }
  }
  Physics(){
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.vel.y += this.gravity;
    //最大速度制限:
    if(this.vel.x > VX_MAX)this.vel.x = VX_MAX;
    if(this.vel.x < -VX_MAX)this.vel.x = -VX_MAX;
    if(this.vel.y > VY_MAX)this.vel.y = VY_MAX;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
    if(this.state == state.WAITING){
      this.vel.x *= FLICTION;
    }
    this.acc.x = 0;

    if(this.vel.y > 1){
      this.state = state.FALLING;
    }
  }

  Update(){
    this.isRun = false;
      if(this.isAlive){
        this.state = state.WAITING; //何も入力がなければWAITINGとみなされる
        this.Input();//入力
      }
    this.Physics();//物理
    this.collision();//衝突
    this.Animation();//状態から画像を更新
    Drawer.ScrollOn(this.pos);

    /*observer*/
    if(this.hp <= 0){
      //死亡時刻を設定
      if(this.isAlive){
        this.frameDead = this.frame;
      }
      this.isAlive = false;
      this.state = state.DEAD;

//      let restartEvent = new StageResetEvent();
 //     EventManager.PushEvent(restartEvent);
    }

    this.sprite.position = this.pos;
    this.frame++;
  }
}

