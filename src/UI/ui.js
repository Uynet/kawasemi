import Art from '../art.js';

export default class UI{
  constructor(UItexture,type){
    this.type = type;
    switch (type){
      /*武器アイコン*/
      case 0:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = 32;
        this.sprite.position.y = 32;
        break;
        /*セレクトボックス*/
      case 1:
        this.sprite = Art.SpriteFactory(UItexture);
        this.sprite.position.x = 30;
        this.sprite.position.y = 30;
        break;
    }
  }
}
