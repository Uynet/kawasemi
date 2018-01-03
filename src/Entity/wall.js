class Wall extends Entity{
  constructor(pos){
    super(pos);
    this.shape = "circle";
    this.sprite = Art.SpriteFactory(Art.teki1Texture);
    this.sprite.position = pos;
    this.circle = new Circle(pos,10);
  }
  updatePosition(){
    /*nothing to do*/
  }
}
