import UI from "./ui.js";

export default class ListUI extends UI{
   constructor(pos,list){
       super(pos);
       this.list = list;
       this.type = "OTHER";
       //this.SetPos(this.pos); 
   }
   SetPos(pos){
       let offSet = 0;
       this.list.forEach(u=>{
        const p = copy(pos);
        let spriteSize = u.GetSpriteSize();
        p.x += offSet;
        u.SetPos(p);
        offSet += spriteSize.x;
        this.children.push(u);
        u.Add();
       })
   }
}