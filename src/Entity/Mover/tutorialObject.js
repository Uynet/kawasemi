import Input from "../../input.js";
import Entity from "../entity.js";
import Art from "../../art.js";
import Explosion3 from "../Effect/Explosion/explosion3.js";
import Explosion4 from "../Effect/Explosion/explosion4.js";
import Explosion5 from "../Effect/Explosion/explosion5.js";
import EntityManager from "../../Stage/entityManager.js";
import MoveLissajous from '../AI/moveLissajous.js';
import EventManager from "../../Event/eventmanager.js";
import QuakeEvent from "../../Event/quakeEvent.js";
import Audio from "../../audio.js";


export default class TutorialObject extends Entity{
  constructor(pos){
    super(pos,vec0());
    this.type = "MOVER";
    this.name = "tutorialObject";
    this.pattern = Art.enemyPattern.coin;
    this.sprite = new PIXI.Sprite(Art.font["ゆ"]);
    this.sprite.position = pos;
    this.layer = "ENTITY";
    this.isUpdater = true;

    this.addAI(new MoveLissajous(this,0.4,0.4,0.13+Rand(0.03),0.17));
  }
  Explode(){
    const e = new Explosion5(copy(this.pos),vec0());
    EntityManager.addEntity(e);
  }
  Clear(){
    this.Explode();
    EventManager.eventList.push(new QuakeEvent(10,0.2,false));
    Audio.PlaySE("enemyDamage");
    this.Delete();
  }
  Phisics(){
    this.pos = add(this.pos,this.vel);
  }
  Update(){
    this.ExecuteAI();
    this.Phisics();
    let player = EntityManager.player;
    if(player.isJump && Math.abs(player.pos.x-this.pos.x)<100){
      if(Input.isKeyClick(KEY.Z)){
        this.Clear();
      }
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
