class Entity{
  constructor(x,y){
    this.position.x = x;
    this.position.y = y;
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


class Stage{
  constructor(){

  }
}
