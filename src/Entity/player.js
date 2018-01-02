class Player extends Entity{
  constructor(pos){
    super(pos);
    this.shape = "circle";
    this.sprite = Art.SpriteFactory(Art.playerTexture);
    this.sprite.position = pos;
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

    this.sprite.position = this.pos;
  }
}

