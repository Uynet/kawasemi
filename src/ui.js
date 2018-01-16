import Art from './art.js';

export default class UI{
  constructor(){
    this.sprite = Art.SpriteFactory(Art.weapon1Texture);
    this.sprite.position.x = 100;
    this.sprite.position.y = 100;
  }
}
