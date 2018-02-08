import EntityManager from '../Stage/entityManager.js';
import Font from '../Entity/font.js';
import DamageFontEffect from '../Entity/damageFontEffect.js';

//今のところ用途が文字エフェクトしかない
export default class FontManager{
  static Init(){
  }

  /*ダメージをポップ*/
  //on EntityContainer
  //str:文字(ここでは数字のみ)
  static PopDamageEffect(str,e){
    let d = str.length;//桁数
    let p = e.pos;
    let v = {
      x:1.5 * (Math.random()-0.5),
      y:-2
    }
    //自分へのダメージ
    if(e.type == ENTITY.PLAYER){
      EntityManager.addEntity(new DamageFontEffect({x:p.x,y:p.y},{x:v.x,y:v.y},str));
      //敵へのダメージ
    }else{
      for(let i = 0;i<d;i++){
        //ここ値渡し
        EntityManager.addEntity(new Font({x:p.x+6*i,y:p.y},{x:v.x,y:v.y},str[i]));
      }
    }
  }
}
