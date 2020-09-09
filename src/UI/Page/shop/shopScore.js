
import UI from "../../ui.js";
import Art from "../../../art.js";
import Key from "../../atoms/key.js";
import Text from "../../text.js";
import EntityManager from "../../../Stage/entityManager.js";

export default class ShopScore extends UI{
    constructor(){
        super(vec2(220,3));
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0xcfcdc9}
        const p = vec0();
        const score = EntityManager.player.score;
        this.text = new Text(p , score , style);
        this.addChild(this.text);
    }
}