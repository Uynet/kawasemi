import EntityManager from './entityManager.js';
import BackEntity from '../Entity/backEntity.js';
import Wall from '../Entity/wall.js';
import MapData from './mapData.js';

export default class StageGen{
  static Init(){
    this.wall = {
      left :{
        list : [],
        leftside : 6,
        rightside : 8,
        topGrid : {
          x : 7,
          y : 32,
        },
        lastGrid : {
          x : 12,
          y : 32,
        },
        dirrection : "U",
        dimmension : "R",
      }
    }
    this.checkpoint = 32;
  }
  static DimToID(dim){
    switch(dim){
      case "DRI": return 49;break;
      case "DLI": return 51;break;
      case "URI": return 65;break;
      case "ULI": return 67;break;
      case "ULO": return 52;break;
      case "URO": return 54;break;
      case "DLO": return 68;break;
      case "DRO": return 70;break;
      case "U"  : return 53;break;
      case "L"  : return 60;break;
      case "R"  : return 62;break;
      case "D"  : return 69;break;
    }
  }
  static Rot(dir,side){
    if(side == "R") {
      switch(dir){
        case "R" :return "D";
        case "D" :return "L";
        case "L" :return "U";
        case "U" :return "R";
      }
    }
    if(side == "L") {
      switch(dir){
        case "R" :return "U";
        case "D" :return "R";
        case "L" :return "D";
        case "U" :return "L";
      }
    }
  }
  static DirToV(dir){
    switch(dir){
      case "R": return {x:1,y:0};break;
      case "D": return {x:0,y:1};break;
      case "L": return {x:-1,y:0};break;
      case "U": return {x:0,y:-1};break;
    }
  }
  static DirSideToDim(dir,side){
    let dim;
    if(dir =="U" && side =="L") dim = "URO";
    if(dir =="U" && side =="R") dim = "DRI";
    //if(dir =="D" && side =="L") dim = "URO";
    //if(dir =="D" && side =="R") dim = "DRI";
    if(dir =="R") dim = "DRO";
    if(dir =="L") dim = "URI";
    return dim;
  }
  static GenerateChunk(playerY){
    this.GenerateWall(playerY);
  }
  static DeleteChunk(playerY){

  }
  static GenerateWall(playerY){
    //うねうね
    let grid = this.wall.left.topGrid;
    let dist = 2;//移動距離
    let dir =  this.wall.left.dirrection;
    let dim = this.wall.left.dimmension;
    let length = 20;//チャンク区間
    this.checkpoint -= length;
    //回す
    //置く
    //すすめる
    //left
    let leftSide = this.wall.left.leftside;
    let rightSide = this.wall.left.rightside;
    //checkpointの3ブロック↑まで生成する
    while(grid.y > this.checkpoint - 3){
      dim = this.Rot(dir,"R");
      dist--;
      //this.Rot
      if(Dice(2) * dist == 0){
        dist = 2
        let side;
        if(Dice(2)==0)side = "R";
        else side = "L";
        //区間指定
        if(dir == "L")side = "R";//→→↑
        if(dir == "R")side = "L";//↑←←
        if(grid.x<leftSide && this.dir == "U")side = "R";//↑→
        if(grid.x>rightSide && this.dir == "U")side = "L";//←↑
        dim = this.DirSideToDim(dir,side);
        dir = this.Rot(dir,side);
      }
      //put
      let ID = this.DimToID(dim);
      let entity = new Wall(MLV(VECN(16),grid),MapData.WallTile(ID));
      EntityManager.addEntity(entity);
      this.wall.left.list.push(entity);
      //fill
    if(dir == "U"){
        let i = grid.x-1;
        while(i>0){
          let back = new BackEntity({x:16*i,y:16*(grid.y)},MapData.WallTile(79));
          EntityManager.addEntity(back);
          i--;
        }
      }
      //step
      grid = ADV(grid,this.DirToV(dir));
    }
    this.wall.left.topGrid = grid;
    //dequeue
    let dewall;
    while(this.wall.left.lastGrid.y > this.checkpoint + 2*length){
      dewall = this.wall.left.list.shift();
      this.wall.left.lastGrid.x = dewall.pos.x/16;
      this.wall.left.lastGrid.y = dewall.pos.y/16;
      EntityManager.removeEntity(dewall);
      let i = this.wall.left.lastGrid.x -1;
      while(i>0){
        i--;
      }
    }
  }
}
