/*矩形*/
export default class Box {
  //pos:左上の座標
  //width
  //height
  constructor(pos, width, height) {
    this.set(pos, width, height);
  }
  set(pos, width, height) {
    this.pos = pos;
    this.width = width;
    this.height = height;
  }
}
