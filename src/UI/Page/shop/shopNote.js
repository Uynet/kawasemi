import UI from "../../ui.js";
import Art from "../../../art.js";
import Key from "../../atoms/key.js";
import Text from "../../text.js";

export default class ShopNote extends UI{
    constructor(){
        super(vec2(220,20));
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0xcfcdc9}
        const p1 = vec2(-38 , 15);
        const p2 = vec2(0 , 15);
        
        const x = new Key(p1 , "X");
        x.sprite.scale.set(0.8);
        this.addChild(x);
        const t1 = new Text(vec2(p1.x + 14 , p1.y + 2), "決定" , style);
        this.addChild(t1);

        const c = new Key(p2 , "C");
        c.sprite.scale.set(0.8);
        this.addChild(c);
        const t2 = new Text(vec2(p2.x + 14 , p2.y + 2), "戻る" , style);
        this.addChild(t2);
    }
}