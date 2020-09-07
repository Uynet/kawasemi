import UIComponent from "./uiComponent";

export default class Shop2 extends UIComponent{
    constructor(){
        super(vec0());
        //Audio.PlaySE("enemy3shot", -0.6);
        Audio.PlaySE("coin2", -0.6, 0.6);
        Audio.PlaySE("stageChange", -0.6, 1.5);
        this.type = "SHOP";
        this.sprite = new PIXI.Sprite();
        this.size = gameSreensize;
        this.children = [];
        this.selectPointerIndex = 0;
        this.stetes = {focused:null}

        this.render();
    }
    render(){

    }
}