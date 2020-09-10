import UI from "../../ui.js";
import Art from "../../../art.js";

export default class shopBG extends UI{
    constructor(){
        super(vec0);
        this.sprite = Art.Sprite(Art.shopPattern.BG);
        this.sprite.scale.set(0.68);
    }
}