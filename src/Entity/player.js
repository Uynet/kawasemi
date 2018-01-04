class Player extends Entity{
  constructor(pos){
    super(pos);
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape("circle",new Circle(pos,10));//衝突判定の形状
      this.type = "PLAYER";

  }
  updatePosition(){
    if(input.isKeyInput(40)){
      this.pos.y++;
    }
    if(input.isKeyInput(38)){
      this.pos.y--;
    }
    if(input.isKeyInput(37)){
      this.pos.x--;
    }
    if(input.isKeyInput(39)){
      this.pos.x++;
    }

    /*TODO 高速化 */
    for(let l of stageEntity.EntityList){
      if(l.type=="WALL"){
        if(collision.on(this,l).isHit){
          console.log("hi");
        }
      }
    }
    this.sprite.position = this.pos;
  }
}

