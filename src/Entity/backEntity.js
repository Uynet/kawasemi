import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';

//背景オブジェクト 何もしない
export default class BackEntity extends Entity{
  constructor(pos,tex){
    super(pos,VEC0());
    this.type = ENTITY.BACK;
    this.isUpdater = false;
    this.tex = tex
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
