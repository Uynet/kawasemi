import Drawer from './drawer.js';
import UI from './ui.js';
import Input from './input.js';
import Timer from './timer.js';

let shift = false;

/*イテレータ*/
let it;
let openIt;
/*
 * d : 必要時間
 * b : 開始点
 * c : 移動量*/
let ease = function*(d,b,c){
  let x = 0;
  let s = Timer.timer;//開始時点の時刻
  let f = (x)=>{return Math.sqrt(x)};
  while(x < 1){
    x = (Timer.timer - s)/d;
    cl(x);
    yield b + c*f(x);
  }
  yield b + c;
}

/*UIクラス*/
/*TODO リファクタリング*/
export default class UIManager{
  static Init(){
    /*content
     * HP
     * 武器
     * その他
     */
    this.UIList = [];//UI全部のリスト
      this.WeaponIconList = [];//武器アイコンのリスト

  }
  /*WeaponIconのポップアップ*/
  static OpenWeapon(){
    for(let i = 0;i<this.WeaponIconList.length;i++){
      let to = 32 + 20*i;
      let dif = to - this.WeaponIconList[i].sprite.x;
      this.WeaponIconList[i].sprite.x += dif * 0.6;
    }
  }
  /*ポップアップの逆(?)*/
  static CloseWeapon(){
    for(let i = 0;i<this.WeaponIconList.length;i++){
      this.WeaponIconList[i].sprite.x = 32;
    }
  }

  /*UIをリストに登録*/
  static addUI(ui){
    /*TODO リストの重複を排除*/
    this.UIList.push(ui); 
    switch (ui.type){
      case 0 : 
        this.WeaponIconList.push(ui);
        break;
        //add more...
        }
    Drawer.addContainer(ui.sprite,"UI");
  }
  /*UIをリストから削除*/
  static removeUI(ui){
    let i = this.UIList.indexOf(ui);
    Drawer.removeContainer(ui.sprite,"UI");
    this.UIList.splice(i,1);
  }
  /*UIの更新*/
  static Update(){
  /* f : easing function
   * d : 必要時間
   * b : 開始時刻*/
    UIManager.OpenWeapon();
    for(let l of UIManager.UIList){
      switch (l.type){
        case 0:
          /* */
          break;
        case UI.SELECTBOX://カーソル移動
          po();
          if(Input.isKeyClick(KEY.RIGHT)){
            /*TODO 入力先読みにする*/
            if(!shift){
              shift = true;
              it = ease(2,l.sprite.x,20);
            }
          }
          if(Input.isKeyClick(KEY.LEFT)){
            if(!shift){
              shift = true;
              it = ease(2,l.sprite.x,-20);
            }
          }

          if(shift){
            if(!it.next().done) {
              l.sprite.x = it.next().value;
            }else{
              shift = false;
            }
          }

          break;
      }
    }
  }
}
