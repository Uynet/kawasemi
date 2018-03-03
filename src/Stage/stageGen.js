import EntityManager from './entityManager.js';
import BackEntity from '../Entity/backEntity.js';
import Wall from '../Entity/wall.js';
import MapData from './mapData.js';

export default class StageGen{
  static Init(){
    this.wall = {
      left :{
        leftside : 8,
        rightside : 16,
        grid : {
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
  static GenerateChunk(playerY){
    this.GenerateWall(playerY);
  }
  static GenerateWall(playerY){
    //うねうね
    let grid = this.wall.left.grid;
    let dist;//移動距離
    let dir =  this.wall.left.dirrection;
    let dim = this.wall.left.dimmension;

    //回す
    //置く
    //すすめる

    //left
    let leftSide = this.wall.left.leftside;
    let rightSide = this.wall.left.rightside;
    //checkpointの32ブロック↑まで生成する
    while(grid.y > this.checkpoint - 3){
      dim = this.Rot(dir,"R");
      //this.Rot
      if(Dice(2)==0 || grid.x < leftSide || grid.x > rightSide){
        let side;
        if(Dice(2)==0)side = "R";
        else side = "L";

        //区間指定
        if(dir == "L")side = "R";
        if(dir == "R")side = "L";
        if(grid.x<leftSide && this.dir == "U")side = "R";
        if(grid.x>rightSide && this.dir == "U")side = "L";
        if(dir =="U" && side =="L") dim = "URO";
        if(dir =="U" && side =="R") dim = "DRI";
        //if(dir =="D" && side =="L") dim = "URO";
        //if(dir =="D" && side =="R") dim = "DRI";
        if(dir =="R") dim = "DRO";
        if(dir =="L") dim = "URI";
        dir = this.Rot(dir,side);
      }
      //put
      let ID = this.DimToID(dim);
      let entity = new Wall(MLV(VECN(16),grid),MapData.WallTile(ID));
      EntityManager.addEntity(entity);
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
    this.wall.left.grid = grid;
  }
}
