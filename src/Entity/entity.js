export default class Entity{
  constructor(pos,vel){
    /*phys*/
    this.pos = pos;
    this.vel = vel;
    this.acc = VEC0();
    this.gravity;
    //this.e = 0.9;
    /*standard*/
    this.frame = 0;
    this.type = "MOVER";//最も深い階層に書いたもので上書きされる
    //this.collider;
    //this.isUpdater = true;    
    //this.isMultiple;
    /*sprite*/
    //this.sprite;
    //this.container;
    /*未実装*/
    this.layer;
    /* Other */
  }
  /*common*/
  Physics(){};
  Collision(){};
  Update(){};
  /*Hurt()*/
}


