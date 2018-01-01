//EntityとSpriteを結びつけるべきなのか?
class Entity{
  constructor(x,y,Sprite){
    this.x = x;
    this.y = y;
    this.Sprite = Sprite;
    this.Sprite.position.x = x;
    this.Sprite.position.y = y;
  }
  update(){console.log("Po")};
}

/*singleton*/
class Player extends Entity{
  updatePosition(){
    if(input.isKeyInput(40)){
      this.y++;
      this.Sprite.position.y++;
    }
  }
}

/*singleton*/
class StageEntity{
  constructor(){
    this.EntityList = []; 
  }

  //Entityをリストに登録
  addEntity(entity){
    this.EntityList.push(entity); 
    Drawer.addStage(entity.Sprite);
  }

}
