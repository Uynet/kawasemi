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
    if(typeof Player.instance === "object"){
      return Player.instance;
    }
    Player.instance = this;
    return this;
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
  //Entityに紐付けられたSpriteをStage
  //Stageはsingletonなので同一のinstanceをさす
  static addEntity(entity){
    console.log(entity.Sprite.position.x);
    new Stage().Entity.push(entity); 
    Drawer.addStage(entity.Sprite);
  }
}
