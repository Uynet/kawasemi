class Player extends Entity{
  updatePosition(){
    if(input.isKeyInput(40)){
      this.y++;
      this.Sprite.position.y = this.y;
    }
  }
}

