
import UI from "../../ui.js";
import Art from "../../../art.js";
import Key from "../../atoms/key.js";
import Text from "../../text.js";
import EntityManager from "../../../Stage/entityManager.js";
import Event from "../../../Event/event.js";


class MoveScore extends Event{
  constructor(ui , start , end){
    super(1);
    let current = start;

    const d = start - end;

    function* gen() {
      while (current > end) {
        current -= Math.max(1,Math.floor(d/30));
        current = Math.max(end,current);

        ui.text.ChangeText(current);
        yield;
      }
      ui.text.ChangeText(end);
      yield;
    }
    this.func = gen();
  }
}

export default class ShopScore extends UI{
    constructor(){
        super(vec2(220,3));
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0xcfcdc9}
        const p = vec2(0,8);
        this.score = EntityManager.player.score;
        this.text = new Text(p , this.score , style);
        this.addChild(this.text);

        const icon = new UI(vec0());
        icon.sprite = Art.CreateSprite(Art.UIPattern.score.icon);
        icon.sprite.position = vec2(-14,2);
        this.addChild(icon);
    }
    setScore(decreaseToScore){
        this.Animate(new MoveScore(this , this.score , decreaseToScore));
        this.score = decreaseToScore;
    }
}