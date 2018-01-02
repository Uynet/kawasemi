class Player extends Entity{
  constructor(x,y,Sprite){
    super(x,y,Sprite);
    this.shape = "circle";
  }
  updatePosition(){
    if(input.isKeyInput(40)){
      this.y++;
      this.Sprite.position.y = this.y;
    }
    if(input.isKeyInput(38)){
      this.y--;
      this.Sprite.position.y = this.y;
    }
    if(input.isKeyInput(37)){
      this.x--;
      this.Sprite.position.x = this.x;
    }
    if(input.isKeyInput(39)){
      this.x++;
      this.Sprite.position.x = this.x;
    }

  }
}

