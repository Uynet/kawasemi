import Art from '../art.js';

export default class UI{
  constructor(UItexture,type){
    this.type = type;
    switch (type){
      /*武器アイコン*/
      case 0:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = -32;
        this.sprite.position.y = WICON_Y;
        break;
        /*セレクトボックス*/
      case 1:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = WICON_X-2;
        this.sprite.position.y = WICON_Y-2;
        break;
        /*装備中の武器*/
      case 2:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = 8;
        this.sprite.position.y = 6;
        break;
    }
  }
}
