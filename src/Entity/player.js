class Player extends Entity{
  constructor(pos){
    super(pos);
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.circle = new Circle(pos,10);
    this.shape = "circle";
    this.collisionShape;//衝突判定の形状
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

    for(let l of stageEntity.EntityList){
      if(collision.on(this,l).isHit){
        console.log(typeof(l));
      }
    }
    this.sprite.position = this.pos;
  }
}

