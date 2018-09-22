import Drawer from "../drawer.js";
import Art from "../art.js";

export default class DistanceField{
  static Init(){
    let test = new PIXI.Sprite(Art.test);
    let width = test.width;
    let height = test.height;//怪しい
    test.scale.set(8);
    Drawer.addContainer(test,"ENTITY");

    //画像から直接pickしてきたもの
    this.extract = Drawer.Renderer.plugins.extract.pixels(test);

    for(let i = 0;i<this.extract.length/4;i++){
      this.extract[i] = this.extract[i*4];
    }

    //バイナリ値
    this.binaryField = new Array(width);
    for(let i=0;i<width;i++){
      this.binaryField[i]=new Array(height);
    }
    for(let y=0;y<height;y++){
      for(let x=0;x<width;x++){
        this.binaryField[y][x]=this.extract[width*y+x];
      }
    }

    //距離場
    this.distanceFiled = DistanceField.GenerateDistanceField(this.binaryField);
  }

  //field上の座標posでの壁までの最短距離
  static GridDistance(field,pos){
    //true : inner wall
    //false: outside
    let side = (field[pos.y][pos.x]!=0);  

    let d = 999999;
    for(let y=0;y<field.length;y++){
      for(let x=0;x<field[0].length;x++){
        //表ならばウラ、裏ならばオモテ
        let side2 = (field[y][x]!=0)
        if(side != side2){
          let p = vec2(x,y);
          d = Math.min(d,DIST(pos,p));
        }
      }
    }
    //めり込んだ場合は負の値を返す
    if(side)d*=-1;
    return d;
  }
  //binary  :２次元配列 壁の01を表したもの
  //distance:２次元配列 その座標から最短の壁までの距離
  static GenerateDistanceField(binaryField){
    let width = binaryField[0].length;
    let height = binaryField.length;

    let distanceFiled = new Array(height);
    for(let i=0;i<height;i++){
      distanceFiled[i] = new Array(width);
    }

    for(let y=0;y<height;y++){
      for(let x=0;x<width;x++){
        distanceFiled[y][x] = this.GridDistance(binaryField,vec2(x,y));
      }
    }
    return distanceFiled;
  }
  //画像→距離グリッド生成→距離場補間
  static GetDistance(pos){
    let p = this.TransformWorldToFiled(pos);
    //正規化済み
    let uv = {
      x : (pos.x/8 - p.x),
      y : (pos.y/8 - p.y),
    }
    //biliniar補間
    let p0 = this.distanceFiled[p.y][p.x];
    let p1 = this.distanceFiled[p.y][p.x+1];
    let p2 = this.distanceFiled[p.y+1][p.x];
    let p3 = this.distanceFiled[p.y+1][p.x+1];
    let d = p0*(1-uv.x)*(1-uv.y) + p1*uv.y*(1-uv.x) +p2*uv.y*(1-uv.x)    + p3*uv.x*uv.y;
    return d;
  }
  static GetDistanceGrad(pos){
    let pdx = {
      x:pos.x + 1,
      y:pos.y,
    }
    let pdy = {
      x:pos.x,
      y:pos.y + 1,
    }
    let dx = this.GetDistance(pdx)-this.GetDistance(pos);
    let dy = this.GetDistance(pdy)-this.GetDistance(pos);
            
    return normalize(vec2(dx,dy));
  }


  static TransformWorldToFiled(pos){
    //8 = 16 / magnification
    return {
      x: Math.floor((pos.x)/8),
      y: Math.floor((pos.y)/8),
    }
  }
}
