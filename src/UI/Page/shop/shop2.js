import UIComponent from "../../uiComponent.js";
import ShopBG from "./shopBG.js";
import Drawer from "../../../drawer.js";
import Audio from "../../../audio.js";
import ShopCarousel from "./shopCarousel.js";
import ShopMessage from "./shopMessage.js";
import ParameterLabel from "./parameterLabel.js";
import NameLabel from "./nameLabel.js";
import Game from "../../../game.js";
import Key from "../../atoms/key.js";
import Input from "../../../input.js";
import ShopConfirmWindow from "./shopConfirmWindow.js";
import PriceLabel from "./priceLabel.js";
import EntityManager from "../../../Stage/entityManager.js";
import Param from "../../../param.js";
import ShopNote from "./shopNote.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Shop2 extends UIComponent{
    constructor(shopData){
        super(vec0());
        Audio.PlaySE("coin2", -0.6, 0.6);
        Audio.PlaySE("stageChange", -0.6, 1.5);
        this.type = "SHOP";
        this.sprite = new PIXI.Sprite();
        this.size = gameSreensize;
        this.stetes = {focused:null}
        this.shopData = shopData;

        this.selectedItem;
        this.render();
    }
    onKeyClick(keyCode){
       if(!this.states.focused)return;
       if(keyCode == KEY.C){
            this.closeShop();
            return;
       }
       this.states.focused.onKeyClick(keyCode);
    }
    onFocus(shopcarousel){
        if(this.parameterLabel)this.removeChild(this.parameterLabel);
        if(this.priceLabel)this.removeChild(this.priceLabel);

        this.parameterLabel = new ParameterLabel();
        this.addChild(this.parameterLabel);

        this.priceLabel = new PriceLabel();
        this.addChild(this.priceLabel);

        //forEach children
        this.message.onFocus(shopcarousel);
        this.parameterLabel.onFocus(shopcarousel);
        this.nameLabel.onFocus(shopcarousel);
        this.priceLabel.onFocus(shopcarousel);
    }
    closeShop(){
        this.Remove();
        Audio.PlaySE("empty", -0.6, 0.8);
        Game.state.transit("main");
    }
    buy(){
        const player = EntityManager.player;
        const price = this.selectedItem.itemData.price;
        player.GetScore(-price);
        const itemID = this.selectedItem.itemID;
        Param.GetWeapon(itemID);
        Audio.PlaySE("itemGet", -0.3);
        this.onDeselect();
    }
    openConfirmWindow(){
        Audio.PlaySE("coin1");
        this.selector = new ShopConfirmWindow();
        this.selector.parent = this;
        this.addChild(this.selector);

        this.setState({focused:this.selector});
        this.selector.onSelect();
        this.message.onSelect();
    }
    buycancel(){
        Audio.PlaySE("playerDamage");
        //this.removeChild(this.selector);
        this.message.onBuyCancel();
    }
    onSelect(selectedItem , isBuyable){
        this.selectedItem = selectedItem;
        if(isBuyable)this.openConfirmWindow();
        else this.buycancel();
    }
    onDeselect(){
        this.setState({focused:this.shopCarousel});
        this.message.onFocus(this.shopCarousel);
        this.removeChild(this.selector);
    }
    render(){
       this.addChild(new ShopBG());
       this.addChild(new ShopNote());

       this.nameLabel= new NameLabel();
       this.addChild(this.nameLabel);

       this.message = new ShopMessage();

       this.shopCarousel = new ShopCarousel(this.shopData);
       this.shopCarousel.parent = this;
       this.shopCarousel.focus();
       this.setState({focused:this.shopCarousel});
       this.addChild(this.shopCarousel);

       this.addChild(this.message);

    }
    Update(){
        this.children.forEach(ui=>ui.Update());
    }
}