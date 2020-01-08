export default class Bullet2AI {
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet) {
    this.bullet = bullet;
  }
  Observer() {
    if (this.bullet.frame > 20) this.bullet.Delete();
  }
  Do() {
    this.Observer();
    this.bullet.sprite.position = add(this.bullet.pos, vec2(8));
    this.bullet.sprite.rotation = this.bullet.arg;
    this.bullet.frame++;
  }
}
