import Entity from './entity.js'
import Param from '../param.js';
import Art from '../art.js'
import Audio from '../audio.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import Input from '../input.js';
import EntityManager from '../Stage/entityManager.js';
import MapData from '../Stage/mapData.js';
import StageGen from '../Stage/stageGen.js';
import EventManager from '../Event/eventmanager.js';
import GameOverEvent from '../Event/gameOverEvent.js';
import Drawer from '../drawer.js';
import Game from '../game.js';
import WeaponManager from '../Weapon/weaponManager.js';
import UIManager from '../UI/uiManager.js';
import FontEffect from './Effect/fontEffect.js';
import BulletShot from './Effect/bulletShot.js';
import Explosion1 from './Effect/explosion1.js';
import Explosion2 from './Effect/explosion2.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Enemy3 from './Enemy/enemy3.js';

const STATE = {
  WAITING : "WAITING",
  RUNNING  : "RUNNING",
  JUMPING : "JUMPING",
  FALLING : "FALLING",
  DYING : "DYING",//死んでから遷移開始するまでの操作不能状態
  DEAD : "DEAD"
}

const DIR = {
  UR : "UR",
  UL : "UL",
  DR : "DR",
  DL : "DL",
  R : "R",
  L : "L",
};

let po = (i)=>{
  if(i>0) return 1 + 2 * Math.atan(i-10)/Math.PI;
  else return -(1 + 2 * Math.atan(-i-10)/Math.PI);
};

export default class Player extends Entity{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    let p = CPV(this.pos);
    this.collider = new Collider(SHAPE.BOX,new Box(pos,8,16));//衝突判定の形状
      this.type = ENTITY.PLAYER;
    this.layer = "ENTITY";
    this.frame = 0;
    this.frameDead;//死んだ時刻
    this.frameDamaged;//最後に攻撃を食らった時刻 無敵時間の計算に必要
    this.frameShot = 0;//最後にshotした時刻
      this.e = 0.1;//反発係数
    this.score = 0;
    this.offset = 0;//↑入力での画面スクロールに使う変数
      this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.playerPattern;
    this.spid = 0 // spriteIndex 現在のスプライト番号
      this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.maxHP = Param.player.maxHp;
    this.hp = this.maxHP;
    this.maxBullet = Param.player.maxBullet;
    this.bullet = this.maxBullet;
    this.gravity = Param.player.gravity;
    this.arg = 0;//狙撃角度 0 - 2π
      this.scArg = 0;//スクロール用
    this.toArg = 0;
    this.scPos = VEC0();//スクロール位置

      this.vxMax = Param.player.vxMax;
    this.vyMax = Param.player.vyMax;
    /*状態*/
    this.state = STATE.WAITING;
    this.weapon = WeaponManager.weapons.normal;//選択中の武器のインスタンス
      this.weapon.Init();
    this.dir = DIR.R;//向き
      this.score = 0;
    /*フラグ*/
    this.isJump = false;//空中にいるか
      this.isRun = false;//走っているか
    this.isAlive = true;//
      this.isInvincible = false//無敵時間
        /*床の親子関係*/
        this.floor = {
          on : false,//乗っているか
          under : null,//自分の下
        }
        //??
        this.poyo = true;
  }
  /*キー入力による移動*/
  Input(){
    /*ジャンプ*/
    if(Input.isKeyClick(KEY.Z)){
      if(this.isJump == false){
        this.vel.y = - Param.player.jumpVel;
        this.isJump = true;
        this.state = STATE.JUMPING;
        // ■ SoundEffect : jump
        Audio.PlaySE("jump1");
      }
    }
    /*空中ジャンプ*/
    //空中でZ押すとbulletを消費してジャンプできる
    if(Input.isKeyClick(KEY.Z)){
      if(this.state == STATE.FALLING){
        let jumpCost = 20
          if(this.bullet >= jumpCost){
            Audio.PlaySE("jump2");
            EntityManager.addEntity(new Explosion2(CPV(this.pos),Math.PI*(1/2)));
            EventManager.eventList.push(new QuakeEvent(20,5));
            this.frameShot = this.frame;//最終ショット時刻
              this.vel.y = - Param.player.jumpVel;
            this.bullet -= 20;
            this.state = STATE.JUMPING;
          }else{
            //足りないとできない
            Audio.PlaySE("empty");
            EntityManager.addEntity(new FontEffect(this.pos,"たりないよ","pop"));
          }
      }
    }
    /*右向き*/
    if(Input.isKeyInput(KEY.RIGHT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.toArg = 0;
      this.acc.x = Param.player.runVel;
    }
    /*左向き*/
    if(Input.isKeyInput(KEY.LEFT)){
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.toArg = Math.PI;
      this.acc.x = -Param.player.runVel;
    }
    /*上向き*/
    if(Input.isKeyInput(KEY.UP)){
      //右向き上 or 左向き上
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.UR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.UL;
      }
      this.toArg = 3 * Math.PI/2;
    }
    /*下向き*/
    //看板が近くにあれば優先
    if(Input.isKeyInput(KEY.DOWN)){
      //右向き下 or 左向き下
      if(this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR){
        this.dir = DIR.DR;
      }else if(this.dir == DIR.L || this.dir == DIR.UL || this.dir == DIR.DL){
        this.dir = DIR.DL;
      }
      this.toArg = Math.PI/2;
    }
    /*shot*/
    if(Input.isKeyInput(KEY.X)){
      this.weapon.shot(this);
    }
    /*for debug*/
    if(Input.isKeyInput(KEY.J)){
      this.Damage(-999);
    }
    if(Input.isKeyInput(KEY.K) && this.frame%10 == 0){
      let p = {
        x:this.pos.x,
        y:this.pos.y - 32
      }
      //EntityManager.addEntity(new Enemy2(p));
      }
  }

  /*状態からアニメーションを行う*/
  Animation(){
    this.frame++;
    switch(this.state){
      case STATE.WAITING :
        this.spid = (Math.floor(this.frame/Param.player.animWait))%4
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
        this.spid = (Math.floor(this.frame/Param.player.animRun))%4
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
        this.spid = (Math.floor(this.frame/Param.player.animRun))%4;
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
        this.spid = (Math.floor(this.frame/Param.player.animRun))%6;
        switch(this.dir){
          case DIR.R : this.sprite.texture = this.pattern.runR[this.spid]; break;
          case DIR.L : this.sprite.texture = this.pattern.runL[this.spid]; break;
          case DIR.UR : this.sprite.texture = this.pattern.runUR[this.spid]; break;
          case DIR.UL : this.sprite.texture = this.pattern.runUL[this.spid]; break;
          case DIR.DR : this.sprite.texture = this.pattern.runDR[this.spid]; break;
          case DIR.DL : this.sprite.texture = this.pattern.runDL[this.spid]; break;
        }
        //走り中は画像をちょっとだけ跳ねさせる
        //スプライト位置を動かしているだけなので当たり判定は変化していない
        let a = 2;//振幅
          let l = 9;//周期
        let f = (Math.abs((this.frame%l -l/2))-l/2);
        this.sprite.position.y = this.pos.y - a*4*f*f/l/l;
        if(this.frame%5 == 0 && this.floor.on){;
          //■ SE : foot
          switch(this.floor.under.material){
            case "wall" : Audio.PlaySE("landing1",0);break;
           case "steel": Audio.PlaySE("landing2",-0.4,0.8);Audio.PlaySE("landing1",-1);break;
            default : break;
          }
        }

        break;
        //死亡
        case STATE.DYING:
          this.spid = Math.min(7,(Math.floor((this.frame - this.frameDead)/Param.player.animRun)));
          this.sprite.texture = this.pattern.dying[this.spid];
          break;
    }
  }

  //他から呼ばれる系
  /*武器チェンジ*/
  ChangeWeapon(name){
    this.weapon.Reset();
    WeaponManager.ChangeWeapon(this,name);
    UIManager.bullet.ChangeWeapon(name);
  }
  /*ダメージ*/
  /*負の値を入れる*/
  Damage(atk){
    if(atk>0 && atk%1>0){
      console.warn(atk);
      atk = Math.floor(atk);
    }
    //無敵時間は攻撃を受けない
    if(!this.isInvincible && this.isAlive){
      Audio.PlaySE("playerDamage");
      this.hp+=atk;
      //フォントはダメージ数に応じて数字を表示する　
      EntityManager.addEntity(new FontEffect(this.pos,-atk+"","player"));
      this.hp = Math.max(this.hp,0);
      //ダメージを受けて一定時間無敵になる
      this.isInvincible = true;
      this.frameDamaged = this.frame;
      EventManager.eventList.push(new QuakeEvent(5,2));
    }
    UIManager.HP.SetBar(this.hp);//HPbarの更新
  }
  //コイン取得
  GetScore(){
    if(this.isAlive){
      this.score+=1;
      this.bullet += 5;//とりあえずbulletも回復しとくか
      UIManager.score.SetScore(this.score);
    }
  }
  /* 衝突判定 */
  Collision(){
    //下からしか通れない物体
    this.floor.on = false;
    this.floor.under = null;
    //壁
    for(let l of EntityManager.colliderList){
      let c = Collision.on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        /*フラグの解除*/

        //床との衝突
        if(c.n.y == -1){
          this.floor.under = l;
          this.floor.on = true;
            if(this.isJump){
              switch(l.material){
                case "wall": Audio.PlaySE("landing1",1);break;
                case "steel": Audio.PlaySE("landing2",1);Audio.PlaySE("landing1");break;
                default : console.warn(l.material);
              }
            }
            this.isJump = false;
        }

        //Resolve
        switch(l.colType){
          case "through" : 
            //下からのみ通り抜けられる床
            if(c.n.y == -1 && l.pos.y - (this.pos.y - (this.vel.y-l.vel.y) + 8) > 0&& this.vel.y > 0){
              Collision.Resolve(this,l);
            }
            break;
          case "wall" : Collision.Resolve(this,l);break;
          default : console.warn(l.colType);break;
        /*note : now isHit == false*/
        }
      }
    }
  }
  Physics(){
    //動く床に乗っている時
    if(this.floor.on){
      this.vel.x += this.floor.under.acc.x; 
      this.vel.y += this.floor.under.acc.y; 
      this.pos.x += this.floor.under.vel.x; 
      this.pos.y += this.floor.under.vel.y; 
    }
    this.acc.y += this.gravity;
    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    //最大速度制限:
    this.vel.x = BET(-this.vxMax , this.vel.x , this.vxMax);
    if(this.vel.y > this.vyMax)this.vel.y = this.vyMax;
    //if(this.vel.y < -this.vyMax)this.vel.y = -this.vyMax;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
     if(this.state == STATE.WAITING){
       this.vel.x *= Param.player.fliction;
     }else if(this.isJump){
       this.vel.x *= 0.99;
     }
     //jumping state
     if(this.isJump && this.vel.y <= 0){
       this.state = STATE.JUMPING;
     }
     if(this.vel.y > 0 && this.isJump){
       this.state = STATE.FALLING;
     }
     this.acc.x = 0;
     this.acc.y = 0;
  }

  ScrollByDir(){
    let d = POV(this.arg,100*po(this.offset));
    let p = ADV(this.pos,d);
    if(Input.isKeyInput(KEY.SP)) {
      let to = ADV(p,MLV(this.scPos,VECN(-1)));
      this.scPos = ADV(this.scPos , MLV(to,VECN(1/20)));
      this.offset = Math.min(this.offset+0.5,20);
      Drawer.ScrollOn(this.scPos);
    }else{
      this.scPos = p;
      this.offset = 0;
    }
  }

  Observer(){
    if(this.hp <= 0){
      if(this.isAlive){
        //死亡開始時に一回だけ呼ばれる部分
        EntityManager.addEntity(new Explosion1(CPV(this.pos)));
        this.weapon.Reset();
        this.frameDead = this.frame;
        this.isDying = true;
        this.isAlive = false;
      }
      this.state = STATE.DYING;
    }
  }
  Dying(){
    //死亡中
    if(this.isDying){//まだ死んでない  
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
  }

  //bulletのかいふく
  Supply(){
    //最後に撃った時刻から経過するほど早くなる
    let t = (this.frame-this.frameShot);
    if(t<=50 && t%10 == 0) this.bullet++;
    else if(t>50 && t<=100 && t%5 == 0) this.bullet++;
    else if(t>100 && t<=150 && t%3 == 0) this.bullet++;
    else if(t>150) this.bullet++;
    this.bullet = BET(0,this.bullet,this.maxBullet);
    UIManager.bullet.SetBar(this.bullet); //BulletBarの更新
  }

  SetArg(arg){
    this.toArg %= (Math.PI * 2)
    this.arg %= (Math.PI * 2)
    let d = this.toArg - this.arg;
    if(d > Math.PI)d -= 2*Math.PI;
    if(d < -Math.PI)d += 2*Math.PI;
    this.arg += d*0.2;
  }

  CreateStage(){
    if(this.pos.y < StageGen.checkpoint * 16){
      StageGen.GenerateChunk(StageGen.checkpoint);
    }
    if(this.pos.y > StageGen.wall.left.lastGrid.y * 16){
      this.Damage(-999);
    }
  }

  Update(){
    if(this.isAlive){
      /*Init*/
      if(!this.isJump) {
        this.state = STATE.WAITING; //何も入力がなければWAITINGとみなされる
      }
      this.isRun = false;
      this.Input();//入力
      this.SetArg(this.toArg);
      this.weapon.Update(this);//weapon
      this.Physics();//物理
      this.Collision();//衝突
      this.Supply();//bulletのかいふく　
    }
    /*for debug*/
    if(Input.isKeyClick(KEY.K)){
      let p = CPV(this.pos);
      p.y -= 32;
      //EntityManager.addEntity(new Enemy3(p,VEC0()));
      switch(this.weapon.name){
        case  "missile" : this.ChangeWeapon("laser");break;
        case  "laser" : this.ChangeWeapon("normal");break;
        case  "normal" : this.ChangeWeapon("missile");break;
      }
    }
    //this.CreateStage();//マップ生成
    this.ScrollByDir();//向きに応じてスクロール位置を変更
    Drawer.ScrollOn(this.pos);//プレイヤー中心にスクロール
    this.Observer(); //死亡チェック
    this.Dying();//死亡中
    //無敵時間の有向時間
    if(this.frame - this.frameDamaged > Param.player.invTime){
      this.isInvincible = false;
    }
    this.sprite.position = {
      x : this.pos.x-4,
      y : this.pos.y
    }
    /*パラメータ*/
    this.offset *= 0.99;
    this.Animation();//状態から画像を更新
    /*reset*/
  }
}

