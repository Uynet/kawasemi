class Entity{
  constructor(x,y,Sprite){
    this.x = x;
    this.y = y;
    this.Sprite = Sprite;
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
    this.Entity = ["u","i"]; 
    if(typeof Entity.instance === "object"){
      return Entity.instance;
    }
    Entity.instance = this;
    return this;
  }

  static addEntity(entity){
    new Stage().Entity.push(entity); 
    Drawer.addStage(entity.Sprite);
  }
}
