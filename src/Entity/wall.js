class Wall extends Entity{
  constructor(pos){
    super(pos);
    this.shape = "circle";
    this.sprite = Art.SpriteFactory(Art.teki1Texture);
    this.sprite.position = pos;
  }
  updatePosition(){
    /*nothing to do*/
  }
}
