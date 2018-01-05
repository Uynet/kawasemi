class Wall extends Entity{
  constructor(pos){
    super(pos);
    this.sprite = Art.SpriteFactory(Art.teki1Texture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.CIRCLE,new Circle(pos,10));//衝突判定の形状
    this.type = ENTITY_TYPE.WALL;
  }
  updatePosition(){
    /*nothing to do*/
  }
}
