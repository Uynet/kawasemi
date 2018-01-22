import Art from '../art.js';

export default class UI{
  constructor(UItexture,type){
    this.type = type;
    switch (type){
      /*武器アイコン*/
      case UI_.WICON:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = -32;
        this.sprite.position.y = WICON_Y;
        break;
        /*セレクトボックス*/
      case UI_.SELBOX:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = -32;
        this.sprite.position.y = WICON_Y-2;
        break;
        /*装備中の武器*/
      case UI_.WEQUIP:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = 8;
        this.sprite.position.y = 6;
        break;
        /*HP*/
      case UI_.HP :
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = 56;
        this.sprite.position.y = 6;
        break;
      default:
        console.warn(this);
    }
  }
}
