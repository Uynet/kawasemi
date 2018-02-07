import EntityManager from '../Stage/entityManager.js';
import Font from '../Entity/font.js';

//今のところ用途が文字エフェクトしかない
export default class FontManager{
  static Init(){
  }

  /*ダメージをポップ*/
  //on EntityContainer
  //str:文字(ここでは数字のみ)
  static PopDamageEffect(str,e){
    let d = str.length;//桁数
      cl(str);
    let p = e.pos;
    let v = {
      x:1.5 * (Math.random()-0.5),
      y:-2
    }
    //自分へのダメージ
    if(e.type == ENTITY.PLAYER){
      for(let i = 0;i<d;i++){
        //ここ値渡しにしないとプレイヤーと同じ座標を指してしまう
        EntityManager.addEntity(new Font({x:p.x+6*i,y:p.y},{x:v.x,y:v.y},str[i]+"r"));
      }
      //敵へのダメージ
    }else{
      for(let i = 0;i<d;i++){
        //ここ値渡し
        EntityManager.addEntity(new Font({x:p.x+6*i,y:p.y},{x:v.x,y:v.y},str[i]));
      }
    }
  }
}
