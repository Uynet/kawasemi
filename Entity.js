//EntityとSpriteを結びつけるべきなのか?
class Entity{
  constructor(x,y,Sprite){
    this.x = x;
    this.y = y;
    this.Sprite = Sprite;
    this.Sprite.position.x = x;
    this.Sprite.position.y = y;
  }
}

/*singleton*/
class Player extends Entity{
  constructor(){
  }

  updatePlayer(){
    if(isKeyInput[40]){
      this.y++;
    }
  }
}

/*singleton*/
class Stage{
  constructor(){
    this.Entity = []; 
    if(typeof Entity.instance === "object"){
      return Entity.instance;
    }
    Entity.instance = this;
    return this;
  }

  //Entityをリストに登録
  addEntity(entity){
    this.Entity.push(entity); 
    Drawer.addStage(entity.Sprite);
  }
}
