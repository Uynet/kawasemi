import Art from "../../art.js";
import Audio from "../../audio.js";
import Box from "../../Collision/box.js";
import Collider from "../../Collision/collider.js";
import Collision from "../../Collision/collision.js";
import Drawer from "../../drawer.js";
import EventManager from "../../Event/eventmanager.js";
import GameOverEvent from "../../Event/gameOverEvent.js";
import Input from "../../input.js";
import Param from "../../param.js";
import DistanceField from "../../Stage/distanceField.js";
import EntityManager from "../../Stage/entityManager.js";
import Pool from "../../Stage/pool.js";
import Timer from "../../timer.js";
import StagePop from "../../UI/stagePop.js";
import UIManager from "../../UI/uiManager.js";
import WeaponManager from "../../Weapon/weaponManager.js";
import BasicAI from "../AI/Basic/basicAI.js";
import Explosion5 from "../Effect/Explosion/explosion5.js";
import FontEffect from "../Effect/fontEffect.js";
import WeaponIcon from "../Effect/weaponIcon.js";
import Entity from "../entity.js";
import Spilit from "./spilit.js";

const STATE = {
  WAITING: "WAITING",
  RUNNING: "RUNNING",
  JUMPING: "JUMPING",
  FALLING: "FALLING",
  DYING: "DYING", //死んでから遷移開始するまでの操作不能状態
  DEAD: "DEAD"
};

const DIR = {
  UR: "UR",
  UL: "UL",
  DR: "DR",
  DL: "DL",
  R: "R",
  L: "L"
};

let po = i => {
  if (i > 0) return 1 + (2 * Math.atan(i - 10)) / Math.PI;
  else return -(1 + (2 * Math.atan(-i - 10)) / Math.PI);
};

//ぽよぽよイベント
class Elast {
  constructor() {
    function* elast() {
      let timer = 30;
      let player = EntityManager.player;
      player.sprite.scale.y = 0.6;
      player.sprite.scale.x = 2.0;
      while (timer > 0) {
        timer--;
        let difY = 1 - player.sprite.scale.y;
        player.sprite.scale.y += difY * 0.2;
        player.sprite.scale.x = 1 / player.sprite.scale.y;
        player.sprite.position.x -= (16 * (player.sprite.scale.x - 1)) / 2;
        player.sprite.position.y -= 16 * (player.sprite.scale.y - 1);
        yield;
      }
      player.sprite.scale.y = 1;
      yield;
    }
    this.func = elast();
  }

  Do() {
    return this.func.next();
  }
}

export default class Player extends Entity {
  constructor(pos) {
    super(pos, vec0(), vec0());
    /*基本情報*/
    let p = copy(this.pos);
    this.collider = new Collider(SHAPE.BOX, new Box(pos, 8, 16)); //衝突判定の形状
    this.type = ENTITY.PLAYER;
    this.layer = "ENTITY";
    this.name = "player";
    this.frame = 0;
    this.frameDead; //死んだ時刻
    this.frameDamaged; //最後に攻撃を食らった時刻 無敵時間の計算に必要
    this.frameShot = 0; //最後にshotした時刻
    this.e = 0.1; //反発係数
    this.score = 0;
    this.offset = 0; //↑入力での画面スクロールに使う変数
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.playerPattern;
    this.spid = 0; // spriteIndex 現在のスプライト番号
    this.sprite = Art.Sprite(this.pattern[this.spid]); //現在表示中のスプライト
    this.sprite.position.x = Math.floor(this.pos.x);
    this.sprite.position.y = Math.floor(this.pos.y);
    /*パラメータ*/
    this.param = Param.player;
    this.maxHP = Param.player.maxHp;
    this.maxBullet = Param.player.maxBullet;
    this.gravity = Param.player.gravity;
    this.bullet = this.maxBullet;
    this.hp = this.maxHP;
    this.arg = 0; //狙撃角度 0 - 2π
    this.scArg = 0; //スクロール用
    this.toArg = 0;
    this.scPos = vec0(); //スクロール位置
    this.score = this.param.score;
    this.vxMax = Param.player.vxMax;
    this.vyMax = Param.player.vyMax;
    /*状態*/
    this.state = STATE.WAITING;
    this.weapon = WeaponManager.weapons[this.param.equip]; //選択中の武器のインスタンス
    this.weapon.Init();
    this.dir = DIR.R; //向き
    /*フラグ*/
    this.isJump = false; //空中にいるか
    this.isRun = false; //走っているか
    this.isAlive = true; //
    this.isInvincible = false; //無敵時間
    this.isCanRead = false; //看板を読める状態
    this.isReading = false; //看板を読んでいる
    /*床の親子関係*/
    this.floor = {
      on: false, //乗っているか
      under: null //自分の下
    };
    //??
    this.poyo = true;
    this.eventList = [];
    let spilit = new Spilit(add(this.pos, VECY(-16)));
    this.spilit = spilit;
    EntityManager.addEntity(spilit);
    this.addAI(new BasicAI(this));

    // TODO:refactoring
    this.SetUIStatus();
  }
  //死亡後に初期状態に回復するため
  ResetStatus() {
    this.param.status = {
      hp: this.param.maxHp,
      bullet: this.param.maxBullet
    };
  }
  //ステージクリア後にStatusを引き継ぐため
  SetStatus() {
    this.hp = this.param.status.hp;
    this.bullet = this.param.status.bullet;
  }

  /*キー入力による移動*/
  Input() {
    /*ジャンプ*/
    if (Input.isKeyClick(KEY.Z)) {
      if (this.isJump == false) {
        //なんかバグる
        //EntityManager.addEntity(new Explosion3(copy(this.pos)));
        this.vel.y = -Param.player.jumpVel;
        this.isJump = true;
        this.state = STATE.JUMPING;
        // ■ SoundEffect : jump
        //Audio.PlaySE("jump1");
        //Audio.PlaySE("clack1", -0.8, 1.0);
        Audio.PlaySE("landing1", 0.3, 1.5);
        //Audio.PlaySE("changeWeapon",-1);
        //effect
        let p = add(this.pos, VECY(12));
        let v = {
          x: Rand(1),
          y: Rand(0.4)
        };
        let s = Pool.GetSmoke(p, v, 1);
        if (s !== false) EntityManager.addEntity(s);
      }
    }
    /*右向き*/
    if (Input.isKeyInput(KEY.RIGHT)) {
      this.state = STATE.RUNNING;
      this.dir = DIR.R;
      this.isRun = true;
      this.toArg = 0;
      this.acc.x = Param.player.runVel;
      this.vel.x = Math.max(0, this.vel.x);
    }
    /*左向き*/
    if (Input.isKeyInput(KEY.LEFT)) {
      this.state = STATE.RUNNING;
      this.dir = DIR.L;
      this.isRun = true;
      this.toArg = Math.PI;
      this.acc.x = -Param.player.runVel;
      this.vel.x = Math.min(0, this.vel.x);
    }
    /*上向き*/
    if (Input.isKeyInput(KEY.UP)) {
      //右向き上 or 左向き上
      if (this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR) {
        this.dir = DIR.UR;
      } else if (
        this.dir == DIR.L ||
        this.dir == DIR.UL ||
        this.dir == DIR.DL
      ) {
        this.dir = DIR.UL;
      }
      this.toArg = (3 * Math.PI) / 2;
    }
    /*下向き*/
    if (Input.isKeyInput(KEY.DOWN)) {
      //右向き下 or 左向き下
      if (this.dir == DIR.R || this.dir == DIR.UR || this.dir == DIR.DR) {
        this.dir = DIR.DR;
      } else if (
        this.dir == DIR.L ||
        this.dir == DIR.UL ||
        this.dir == DIR.DL
      ) {
        this.dir = DIR.DL;
      }
      this.toArg = Math.PI / 2;
    }
    /*shot*/
    //看板が近くにあれば優先
    if (Input.isKeyInput(KEY.X)) {
      if (this.isCanRead) {
        this.isReading = true;
        this.state = STATE.WAITING;
        return;
      }
      this.spilit.shot(this);
    }
  }
  /*状態からアニメーションを行う*/
  Animation() {
    this.sprite.position = {
      x: Math.floor(this.pos.x - 4),
      y: Math.floor(this.pos.y)
    };
    //無敵時間中の点滅
    if (this.isInvincible) {
      if (this.frame % 4 < 2) this.sprite.alpha = 1;
      else this.sprite.alpha = 0;
    } else {
      this.sprite.alpha = 1;
    }

    let state;
    let animWait = Math.floor(Param.player.animWait / Timer.GetTimeScale());
    let animRun = Math.floor(Param.player.animRun / Timer.GetTimeScale());
    switch (this.state) {
      case STATE.WAITING:
        this.spid = Math.floor(this.frame / animWait) % 4;
        state = "wait";
        break;
      case STATE.JUMPING:
        this.spid = Math.floor(this.frame / animRun) % 4;
        state = "jump";
        break;
      case STATE.FALLING:
        this.spid = Math.floor(this.frame / animRun) % 4;
        state = "fall";
        break;
      case STATE.RUNNING:
        this.spid = Math.floor(this.frame / animRun) % 6;
        state = "run";
        //走り中は画像をちょっとだけ跳ねさせる
        //スプライト位置を動かしているだけなので当たり判定は変化していない
        let a = 2; //振幅
        let l = 9; //周期
        let f = Math.abs((this.frame % l) - l / 2) - l / 2;
        this.sprite.position.y = this.pos.y - (a * 4 * f * f) / l / l;
        if (
          this.frame % Math.floor(10 / Timer.GetTimeScale()) == 0 &&
          this.floor.on
        ) {
          //歩き土埃エフェクト
          let p = add(this.pos, VECY(16));
          let v = {
            x: -this.vel.x / 2,
            y: -0.3 + Rand(0.1)
          };
          let s = Pool.GetSmoke(p, v, 0.6);
          if (s !== false) EntityManager.addEntity(s);
          //■ SE : foot
          switch (this.floor.under.material) {
            case "wall":
              Audio.PlaySE("landing1", 0);
              break;
            case "steel":
              Audio.PlaySE("landing2", -0.0, 0.8);
              Audio.PlaySE("landing1", -1);
              break;
            case "wood":
              Audio.PlaySE("landing1", 1);
              break;
            default:
              console.warn("マテリアルが設定されていません");
              break;
          }
        }
        break;
      //死亡
      case STATE.DYING:
        this.spid = Math.min(
          7,
          Math.floor((this.frame - this.frameDead) / animRun)
        );
        state = "dying";
        break;
    }
    if (state == "dying") {
      this.sprite.texture = this.pattern[state][this.spid];
    } else {
      this.sprite.texture = this.pattern[state + this.dir][this.spid];
    }
    //elast
    for (let e of this.eventList) {
      if (e.Do().done) {
        this.eventList.remove(e);
      }
    }
  }

  //他から呼ばれる系
  /*武器チェンジ*/
  ChangeWeapon(name) {
    this.weapon.Reset();
    WeaponManager.ChangeWeapon(this, name);
    const bullet = UIManager.find("BULLET")[0];
    bullet.ChangeWeapon(name);
    //変更先の武器アイコンをpop
    let p = copy(this.pos);
    p.y -= 8;
    EntityManager.addEntity(new WeaponIcon(p, name));
  }
  /*ダメージ*/
  Damage(atk) {
    if (atk > 0 && atk % 1 > 0) {
      console.warn(atk);
      atk = Math.floor(atk);
    }
    //無敵時間は攻撃を受けない
    if (!this.isInvincible && this.isAlive) {
      Audio.PlaySE("playerDamage");

      this.hp -= atk;
      //フォントはダメージ数に応じて数字を表示する
      EntityManager.addEntity(new FontEffect(this.pos, atk + "", "player"));
      this.hp = Math.max(this.hp, 0);
      //ダメージを受けて一定時間無敵になる
      this.isInvincible = true;
      this.frameDamaged = this.frame;
      this.Quake(10, 0.6);
      this.SetUIStatus();
    }
  }
  //コイン取得
  GetScore(score) {
    if (this.isAlive) {
      this.score += score;
      this.param.score = this.score;
      this.bullet += 5;
      this.hp = clamp(this.hp, 0, this.maxHP);
      const scoreUI = UIManager.find("SCORE")[0];
      if (scoreUI) scoreUI.setState("score", this.score);
      UIManager.find("HP")[0].setState("value", this.hp);
    }
  }
  OnCollision(c, l) {
    /* 衝突応答*/

    //床との衝突
    if (c.n.y == -1 && this.vel.y > 0) {
      this.floor.under = l;
      this.floor.on = true;
      /*直せ*/
      if (l.name == "enemy6") {
        l.isSwelling = true;
      }
      if (this.isJump) {
        //ぽよぽよイベント
        this.eventList.push(new Elast());
        //着地効果音
        switch (l.material) {
          case "wall":
            Audio.PlaySE("landing1", 1);
            break;
          case "steel":
            Audio.PlaySE("landing2", 1);
            Audio.PlaySE("landing1");
            break;
          case "wood":
            Audio.PlaySE("landing1", 1);
            break;
          default:
            console.warn(l.material);
        }
        this.isJump = false;
      }
    }
    //Resolve
    switch (l.colType) {
      case "through":
        //下からのみ通り抜けられる床
        if (
          c.n.y == -1 &&
          l.pos.y - (this.pos.y - (this.vel.y - l.vel.y) + 8) > 0 &&
          this.vel.y > 0
        ) {
          Collision.Resolve(this, l);
        }
        break;
      case "wall":
        Collision.Resolve(this, l);
        break;
      default:
        console.warn(l.colType);
        break;
    }
  }
  /* 衝突判定 */
  Collision() {}

  Physics() {
    this.MoveOnFloor();
    this.MoveByGravity();
    this.BasicPhysics();
    //最大速度制限:
    this.vel.x = clamp(this.vel.x, -this.vxMax, this.vxMax);
    if (this.vel.y > this.vyMax) this.vel.y = this.vyMax;
    //if(this.vel.y < -this.vyMax)this.vel.y = -this.vyMax;
    /*摩擦
     * 地面にいる&&入力がない場合のみ有向*/
    if (this.state == STATE.WAITING) {
      this.vel.x *= Param.player.fliction;
    } else if (this.isJump) {
      this.vel.x *= 0.99;
    }
    //jumping state
    if (this.isJump && this.vel.y <= 0) {
      this.state = STATE.JUMPING;
    }
    if (this.vel.y > 0 && this.isJump) {
      this.state = STATE.FALLING;
    }

    //画面端の制限
    this.pos.x = clamp(this.pos.x, 0, 16 * Drawer.mapSize.width - 8);
    this.pos.y = Math.max(this.pos.y, 0); //↑端
    if (this.pos.y > Drawer.mapSize.height * 16 + 8) this.Damage(999); //下端
    this.force.x *= Math.pow(0.9, Timer.GetTimeScale()); //遅い
    this.force.y *= Math.pow(0.9, Timer.GetTimeScale()); //遅い
    //this.CollisionByDistance();
  }
  CollisionByDistance() {
    if (DistanceField.GetDistance(this.pos) <= 0) {
      let t = 0;
      while (DistanceField.GetDistance(this.pos) <= 0 && t < 16) {
        let grad = DistanceField.GetDistanceGrad(this.pos);
        let dist = DistanceField.GetDistance(this.pos);
        this.pos.x += grad.x;
        this.pos.y += grad.y;
        t++;
      }
      this.isJump = false;
    }
  }

  OnDying() {
    //死亡開始時に一回だけ呼ばれる部分

    if (this.isAlive) {
      Timer.SetTimeScale(0.1);
      //TODO:fix
      //Audio.StopBGM();
      this.param.maxHp += 2;
      this.ResetStatus();
      this.Quake(50, 0.9);
      EntityManager.addEntity(new Explosion5(copy(this.pos)));
      Audio.PlaySE("bomb", -1.0);
      Audio.PlaySE("missileHit");
      this.weapon.Reset();
      this.frameDead = this.frame;
      this.isDying = true;
      this.isAlive = false;
      this.state = STATE.DYING;
      //死亡開始時に一回だけ呼ばれる部分
    }
  }

  Dying() {
    //死亡中
    if (this.isDying) {
      //まだ死んでない
      if (this.frame - this.frameDead < 100 * Timer.GetTimeScale()) {
        this.isDying = true;
      } else {
        //完全に死んだ
        //完全死亡時に一回だけ呼ばれる部分
        if (this.isDying) {
          //this.state = STATE.DEAD
          Timer.SetTimeScale(1);
          EventManager.Add(new GameOverEvent());
        }
        this.isDying = false;
      }
    }
  }

  //bulletのかいふく
  AutoSupplyBullet() {
    //最後に撃った時刻から経過するほど早くなる
    let t = this.frame - this.frameShot;
    if (t <= 500 && t % 10 == 0) this.bullet++;
    else if (t > 500 && t <= 1000 && t % 5 == 0) this.bullet++;
    else if (t > 1000 && t <= 1500 && t % 3 == 0) this.bullet++;
    else if (t > 1500) this.bullet += 2;
    this.bullet = clamp(this.bullet, 0, this.maxBullet);
    this.SetUIStatus();
  }

  SetArg(arg) {
    this.toArg %= Math.PI * 2;
    this.arg %= Math.PI * 2;
    let d = this.toArg - this.arg;
    if (d > Math.PI) d -= 2 * Math.PI;
    if (d < -Math.PI) d += 2 * Math.PI;
    this.arg += d * 0.2;
  }

  Debug() {
    if (
      this.maxHP != 300 &&
      Input.isKeyClick(KEY.K) &&
      this.isAlive &&
      isDebugMode
    ) {
      let p = {
        x: 64,
        y: 96
      };
      p.y += 10;
      const bullet = UIManager.find("BULLET")[0];
      if (!this.param.havingWeaponList.missile) {
        this.param.havingWeaponList.missile = true;
        bullet.Push("missile");
      }
      if (!this.param.havingWeaponList.laser) {
        this.param.havingWeaponList.laser = true;
        bullet.Push("laser");
      }
      //最大HP変更
      this.param.maxHp = 300;
      const HP = UIManager.find("HP")[0];
      HP.SetMaxGaugeValue(300);
      this.Damage(999);
      Audio.PlaySE("missileHit");
    }
  }

  Update() {
    this.ExecuteAI();
    if (isDebugMode) this.Debug();
    //player関連のイベントを裁く

    if (this.isAlive) {
      /*Init*/
      if (!this.isJump) {
        this.state = STATE.WAITING; //何も入力がなければWAITINGとみなされる
      }
      this.isRun = false;
      this.Input(); //入力
      this.SetArg(this.toArg);
      this.weapon.Update(this); //weapon
      this.Physics(); //物理
      if (!this.floor.on) this.isJump = true;
      this.floor.on = false;
      this.floor.under = null;
      this.AutoSupplyBullet(); //bulletのかいふく
    }
    this.isCanRead = false;
    Drawer.ScrollOn(this.pos); //プレイヤー中心にスクロール
    this.Dying(); //死亡中
    //無敵時間の有向時間
    if (this.frame - this.frameDamaged > Param.player.invTime) {
      this.isInvincible = false;
    }
    /*パラメータ*/
    this.offset *= 0.99;
    this.Animation(); //状態から画像を更新
    /*reset*/
    //this.PixelizeSpritePosition();
  }
  SetUIStatus() {
    const score = UIManager.find("SCORE")[0];
    const hp = UIManager.find("HP")[0];
    const bullet = UIManager.find("BULLET")[0];
    if (score) score.setState("score", this.score);
    if (hp) hp.setState("value", this.hp);
    if (bullet) bullet.setState("value", this.bullet);
  }

  PixelizeSpritePosition() {
    let pos = vec2(
      this.pos.x - (this.pos.x % 3),
      this.pos.y - (this.pos.y % 3)
    );
    this.sprite.position = pos;
  }
}
