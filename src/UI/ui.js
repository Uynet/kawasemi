import Art from '../art.js';

const OUTSIDE = -999;

export default class UI{
  constructor(UItexture,type){
    this.type = type;
    switch (type){
      /*武器アイコン*/
      case UI_.WICON: this.sprite = Art.SpriteFactory(UItexture); break;
        /*セレクトボックス*/
      case UI_.SELBOX: this.sprite = Art.SpriteFactory(UItexture); break;
        /*装備中の武器*/
      case UI_.WEQUIP: this.sprite = Art.SpriteFactory(UItexture); break;
        /*HP*/
      case UI_.HP : this.sprite = Art.SpriteFactory(UItexture); break;
      default:
        console.warn(this);
    }
    this.sprite.position.x = OUTSIDE;
    this.sprite.position.y = OUTSIDE;
  }
}
