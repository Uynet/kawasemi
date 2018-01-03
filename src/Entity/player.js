class Player extends Entity{
  constructor(pos){
    super(pos);
    this.shape = "circle";
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
    this.circle = new Circle(pos,10);
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
      if(l != this){
        if(collision.on(this,l).isHit){
          console.log("hit");
        }
      }
    }
    this.sprite.position = this.pos;
  }
}

