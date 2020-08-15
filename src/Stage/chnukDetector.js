import EntityManager from "./entityManager.js";
import MapData from "./mapData.js";

export default class ChunkDetector{
    static Init(){
        this.chunkHeight = 64;
        this.chunkWidh= 64;
        this.prevChunkCoord = vec0();
        this.currentChunkCoord = vec0();
    }

    static isChunkMoved(){
        if(this.prevChunkCoord.x == this.currentChunkCoord.x){
            if(this.prevChunkCoord.y == this.currentChunkCoord.y){
                return false;
            }
        }
        return true;
    }

    static ChunkReConstruct(){
        this.DeleteStage();

        this.ChunkConstruct("backEntityData");
        this.ChunkConstruct("entityData");
        this.ChunkConstruct("foreEntityData");
        this.ChunkConstruct("foreData");
        MapData.AddBackGround(1);
    }

    static ChunkConstruct(layer){
     const cp = {
        x: this.currentChunkCoord.x * this.chunkWidh / 16, 
        y: this.currentChunkCoord.y * this.chunkHeight / 16, 
    }
    const d = this.chunkHeight/16*2; 
    const y0 = Math.max(cp.y-d , 0);
    const y1 = Math.min(cp.y+d , MapData.height);
    const x0 = Math.max(cp.x-d , 0);
    const x1 = Math.min(cp.x+d , MapData.width);

    const wallTiletype = MapData.jsonObj.tilesets[0].tileproperties;
    for (let y = y0 ; y < y1; y++) {
      for (let x = x0 ; x <x1; x++) {
        const ID = MapData[layer][MapData.width * y + x] - 1;
        if (ID == -1) continue; 
        let p = { x: 16 * x, y: 16 * y }; //ブロック座標をワールド座標に変換
        const entity = MapData.createEntity(wallTiletype , ID , layer , x , y , p);
        if(this.isUnmover(entity))EntityManager.addEntity(entity);
        }
      }
    }

    static isUnmover(e){
        return e.type!=ENTITY.MOVER && e.type!=ENTITY.PLAYER && e.type !=ENTITY.ENEMY
    }

  static DeleteStage() {
        const unmoveEntities = EntityManager.entityList.filter(e=>  this.isUnmover(e));
        unmoveEntities.forEach(e => EntityManager.removeEntity(e))
  }

    static Update(){
        /*
         *  worldCoord 
         *  chunkCoord 
         *  blockCoord ... floor(worldCoord/16)
         */
        const player = EntityManager.player;
        const p = player.pos;

        this.prevChunkCoord = copy(this.currentChunkCoord);

        this.currentChunkCoord= {
            x: Math.floor((p.x/this.chunkWidh)) ,
            y: Math.floor((p.y/this.chunkHeight)) 
        }
        const isChunkMoved = this.isChunkMoved();
        if(isChunkMoved)this.ChunkReConstruct();

    }
}