import Entity from './entity.js'
import Art from '../art.js'
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/Box.js';
import Input from '../input.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import EventManager from '../Event/eventmanager.js';
import Event from '../Event/event.js';
import StageResetEvent from '../Event/stageResetEvent.js';
import GameOverEvent from '../Event/gameOverEvent.js';
import Drawer from '../drawer.js';
import Game from '../Game.js';
import WeaponManager from '../Weapon/weaponManager.js';
import Timer from '../timer.js';
import UIManager from '../UI/uiManager.js';
import Font from './font.js';
import FontEffect from './fontEffect.js';

const JUMP_VEL = 7;//ジャンプ力
  const RUN_VEL = 0.5;//はしり速度
const PLAYER_GRAVITY = 0.4;
const PLAYER_HP = 100;
const FLICTION = 0.7;
const POP_PLAYER = -1;
const INV_TIME = 5;//無敵時間
  /*アニメーションのインターバル*/
  const ANIM_RUN = 4;
const ANIM_WAIT = 7;

const VX_MAX = 3;
const VY_MAX = 7;

const STATE = {
  WAITING : 0,
  RUNNING  : 1,
  JUMPING : 2,
  FALLING : 3,
  DYING : 4,//死んでから遷移開始するまでの操作不能状態
  DEAD : 5
}

const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};
/*フラグと状態が同じものを意味しててキモい*/

export default class Player extends Entity{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
      this.type = ENTITY.PLAYER;
    this.frame = 0;
    this.frameDead;//死んだ時刻
    this.frameDamaged;//最後に攻撃を食らった時間 無敵時間の計算に必要
    this.e = 0.1;
    /*スプライト*/
    this.pattern = Art.playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
      this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.maxHP = PLAYER_HP;
    this.hp = this.maxHP;
    this.gravity = PLAYER_GRAVITY;
    this.arg = 0;//狙撃角度 0 - 2π
      /*状態*/
      this.state = STATE.WAITING;
    this.weapon = WeaponManager.weaponList[0];//選択中の武器のインスタンス
    this.weapon.isTargetOn = false;
    this.weapon.target = null;//これ大丈夫か??
    this.dir = DIR.R;//向き
      if(UIManager.HP){
      }
    /*フラグ*/
    this.isJump = false;//空中にいるか
      this.isRun = false;//走っているか
    this.isAlive = true;//
      this.isInvincible = false//無敵時間
  }
  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(Input.isKeyInput(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = -JUMP_VEL;
        this.isJump = true;
        this.state = STATE.JUMPING;
      }
    }
    /*右向き*/
    if(Input.isKeyInput(KEY.RIGHT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.arg = 0;
      this.acc.x = RUN_VEL;
    }
    /*左向き*/
    if(Input.isKeyInput(KEY.LEFT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.arg = Math.PI;
      this.acc.x = -RUN_VEL;
    }
    /*上向き*/
    if(Input.isKeyInput(KEY.UP)){
      //右向き上 or 左向き上
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.UR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.UL;
      }
      this.arg = -Math.PI/2;
    }
    /*下向き*/
    if(Input.isKeyInput(KEY.DOWN)){
      //右向き下 or 左向き下
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.DR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.DL;
      }
      this.arg = Math.PI/2;
    }
    /*shot*/
    if(Input.isKeyInput(KEY.X)){
      this.weapon.shot(this);
    }
    /*for debug*/
    if(Input.isKeyInput(KEY.SP) && this.frame%10 == 0){
      let p = {
        x:this.pos.x,
        y:this.pos.y
      }
      let v = {
        x:(Math.random()-0.5)*2,
        y:-5
      }

      /*
      switch(Math.floor(25*Math.random())){
        case 0 :EntityManager.addEntity(new Font(p,v,"あ"));break;
        case 1 :EntityManager.addEntity(new Font(p,v,"い"));break;
        case 2 :EntityManager.addEntity(new Font(p,v,"う"));break;
        case 3 :EntityManager.addEntity(new Font(p,v,"え"));break;
        case 4 :EntityManager.addEntity(new Font(p,v,"お"));break;
        case 5 :EntityManager.addEntity(new Font(p,v,"か"));break;
        case 6 :EntityManager.addEntity(new Font(p,v,"き"));break;
        case 7 :EntityManager.addEntity(new Font(p,v,"く"));break;
        case 8 :EntityManager.addEntity(new Font(p,v,"け"));break;
        case 9 :EntityManager.addEntity(new Font(p,v,"こ"));break;
        case 10 :EntityManager.addEntity(new Font(p,v,"さ"));break;
        case 11 :EntityManager.addEntity(new Font(p,v,"し"));break;
        case 12 :EntityManager.addEntity(new Font(p,v,"す"));break;
        case 13 :EntityManager.addEntity(new Font(p,v,"せ"));break;
        case 14 :EntityManager.addEntity(new Font(p,v,"そ"));break;
        case 15 :EntityManager.addEntity(new Font(p,v,"た"));break;
        case 16 :EntityManager.addEntity(new Font(p,v,"ち"));break;
        case 17 :EntityManager.addEntity(new Font(p,v,"つ"));break;
        case 18 :EntityManager.addEntity(new Font(p,v,"て"));break;
        case 19 :EntityManager.addEntity(new Font(p,v,"と"));break;
        case 19 :EntityManager.addEntity(new Font(p,v,"な"));break;
        case 20 :EntityManager.addEntity(new Font(p,v,"に"));break;
        case 21 :EntityManager.addEntity(new Font(p,v,"ぬ"));break;
        case 22 :EntityManager.addEntity(new Font(p,v,"ね"));break;
        case 23 :EntityManager.addEntity(new Font(p,v,"の"));break;
        case 24 :EntityManager.addEntity(new Font(p,v,"は"));break;
      }
      */
    EntityManager.addEntity(new FontEffect(this.pos,"こんにちは","pop"));
    }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    switch(this.state){
      case STATE.WAITING :
        this.spid = (Math.floor(Timer.timer/ANIM_WAIT))%4
          switch(this.dir){
            case DIR.R : this.sprite.texture = this.pattern.waitR[this.spid]; break;
            case DIR.L : this.sprite.texture = this.pattern.waitL[this.spid]; break;
            case DIR.UR : this.sprite.texture = this.pattern.waitUR[this.spid]; break;
            case DIR.UL : this.sprite.texture = this.pattern.waitUL[this.spid]; break;
            case DIR.DR : this.sprite.texture = this.pattern.waitDR[this.spid]; break;
            case DIR.DL : this.sprite.texture = this.pattern.waitDL[this.spid]; break;
          }
          break;
      case STATE.JUMPING :
        this.spid = (Math.floor(Timer.timer/ANIM_RUN))%4
          switch(this.dir){
            case DIR.R : this.sprite.texture = this.pattern.jumpR[this.spid]; break;
            case DIR.L : this.sprite.texture = this.pattern.jumpL[this.spid]; break;
            case DIR.UR : this.sprite.texture = this.pattern.jumpUR[this.spid]; break;
            case DIR.UL : this.sprite.texture = this.pattern.jumpUL[this.spid]; break;
            case DIR.DR : this.sprite.texture = this.pattern.jumpDR[this.spid]; break;
            case DIR.DL : this.sprite.texture = this.pattern.jumpDL[this.spid]; break;
          }
          break;
      case STATE.FALLING :
        this.spid = (Math.floor(Timer.timer/ANIM_RUN))%4;
        switch(this.dir){
          case DIR.R : this.sprite.texture = this.pattern.fallR[this.spid]; break;
          case DIR.L : this.sprite.texture = this.pattern.fallL[this.spid]; break;
          case DIR.UR : this.sprite.texture = this.pattern.fallUR[this.spid]; break;
          case DIR.UL : this.sprite.texture = this.pattern.fallUL[this.spid]; break;
          case DIR.DR : this.sprite.texture = this.pattern.fallDR[this.spid]; break;
          case DIR.DL : this.sprite.texture = this.pattern.fallDL[this.spid]; break;
        }
        break;
      case STATE.RUNNING :
        this.spid = (Math.floor(Timer.timer/ANIM_RUN))%6;
        switch(this.dir){
          case DIR.R : this.sprite.texture = this.pattern.runR[this.spid]; break;
          case DIR.L : this.sprite.texture = this.pattern.runL[this.spid]; break;
          case DIR.UR : this.sprite.texture = this.pattern.runUR[this.spid]; break;
          case DIR.UL : this.sprite.texture = this.pattern.runUL[this.spid]; break;
          case DIR.DR : this.sprite.texture = this.pattern.runDR[this.spid]; break;
          case DIR.DL : this.sprite.texture = this.pattern.runDL[this.spid]; break;
        }
        break;
        //死亡
        case STATE.DYING:
          this.spid = Math.min(7,(Math.floor((this.frame - this.frameDead)/ANIM_RUN)));
          this.sprite.texture = this.pattern.dying[this.spid];
          break;
    }
  }

  /*武器チェンジ*/
  ChangeWeapon(name){
    WeaponManager.ChangeWeapon(this,name);
  }
  /*ダメージ*/
  /*負の値を入れる*/
  Damage(atk){
    //無敵時間は攻撃を受けない
    if(!this.isInvincible){
      if(this.isAlive){
        this.hp+=atk;
        //フォントはダメージ数に応じて数字を表示する　
        EntityManager.addEntity(new FontEffect(this.pos,-atk+"","player"));
        this.hp = Math.max(this.hp,0);
        UIManager.HP.UpdateBar(this.hp);
        //ダメージを受けて一定時間無敵になる
        this.isInvincible = true;
        this.frameDamaged = this.frame;
      }
    }
  }
  /* 衝突判定 */
  collision(){
    for(let l of EntityManager.enemyList){
      let c = Collision.on(this,l)
        if(c.isHit){
          /* 衝突応答*/
          /*フラグの解除*/
          if(c.n.y == -1){
            this.isJump = 0;
            Collision.Resolve(this,l);
          }
          /*note : now isHit == false*/
        }
    }
    for(let l of EntityManager.wallList){
      if(Collision.on(this,l).isHit){
        /* 衝突応答*/
        /*フラグの解除*/
        if(Collision.on(this,l).n.y == -1){
          this.isJump = 0;
        }
        Collision.Resolve(this,l);
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
    if(this.vel.y < -VY_MAX)this.vel.y = -VY_MAX;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
     if(this.state == STATE.WAITING){
       this.vel.x *= FLICTION;
     }
     this.acc.x = 0;

     if(this.vel.y > 2){
       this.state = STATE.FALLING;
     }
  }

  Update(){
    //照準を自動でやってる

    if(this.isAlive){
      this.state = STATE.WAITING; //何も入力がなければWAITINGとみなされる

        this.isRun = false;
      this.Input();//入力
      this.weapon.Target(this);

      //jumping state
      if(this.isJump && this.vel.y <= -1){
        this.state = STATE.JUMPING;
      }
      this.Physics();//物理
    }
    this.collision();//衝突
    this.Animation();//状態から画像を更新

    //向きに応じてスクロール位置を変更
    /*
     switch(this.dir){
     case DIR.UR :
     case DIR.UL :
     Drawer.ScrollOn({x:this.pos.x,y:this.pos.y-40});
     break;
     default :
     Drawer.ScrollOn(this.pos);
     }
     */
    Drawer.ScrollOn(this.pos);

    /*observer*/
    if(this.hp <= 0){
      //死亡開始時に一回だけ呼ばれる部分
      if(this.isAlive){
        this.frameDead = this.frame;
        this.isDying = true;
        this.isAlive = false;
      }
      this.state = STATE.DYING;
    }
    //死亡中
    if(this.isDying){       //まだ死んでない  
      if(this.frame - this.frameDead < 50){
        this.isDying = true;
      }else{
        //完全に死んだ
        //完全死亡時に一回だけ呼ばれる部分
        if(this.isDying){
          //this.state = STATE.DEAD
          let g = new GameOverEvent();
          EventManager.eventList.push(g);
        }
        this.isDying = false;
      }
    }
    //無敵時間の有向時間
    if(this.frame - this.frameDamaged > INV_TIME){
      this.isInvincible = false;
    }
    //
    this.sprite.position = this.pos;
    this.frame++;
  }
}

