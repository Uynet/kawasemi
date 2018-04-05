import Entity from './entity.js';
import Art from '../art.js';
import EntityManaer from '../Stage/entityManager.js';

//真の背景であり背景オブジェクトではない
export default class BackEntity extends Entity{
  constructor(pos,tex){
    super(pos,VEC0());
    this.layer = "BG";
    this.isUpdater = false;
    this.tex = tex;
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.scale = VECN(2);
    this.sprite.position = pos;
  }
}
