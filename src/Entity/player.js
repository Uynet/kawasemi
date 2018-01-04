let JUMP_VEL = 7;//ジャンプ速度

class Player extends Mover{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape("circle",new Circle(pos,10));//衝突判定の形状
      this.type = "PLAYER";

  }



  updatePosition(){
    if(input.isKeyInput(40)){
      this.vel.y = JUMP_VEL;
    }
    if(input.isKeyInput(38) || input.isKeyInput(90)){
      this.vel.y = -JUMP_VEL;
    }
    if(input.isKeyInput(37)){
      this.vel.x = -1;
    }
    if(input.isKeyInput(39)){
      this.vel.x = 1;
    }

    this.pos.x += this.vel.x; 
    this.pos.y += this.vel.y; 
    this.sprite.position = this.pos;
    /* */
    this.vel.y += 0.8;

    /* 衝突判定 */
    /*TODO リスト分割 */
    for(let l of stageEntity.EntityList){
      if(l.type=="WALL"){
        if(collision.on(this,l).isHit){
          /* 衝突応答をかく */
          this.vel = {x:0,y:0};//とりあえず
        }
      }
    }


  }
}

