import EntityManager from "./entityManager.js";
import MapData from "./mapData.js";

const blockWidth = 16;

export default class ChunkDetector{
    static Init(){
        this.chunkHeight = 96;
        this.chunkWidh= 96;
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
    }

    static generateSingleChunk(chunkCoord,layer){
     const blockCoord = {
        x: chunkCoord.x * this.chunkWidh / blockWidth, 
        y: chunkCoord.y * this.chunkHeight / blockWidth, 
    }
    const cpb = this.chunkWidh/blockWidth;
    const y0 = Math.max(blockCoord.y , 0);
    const y1 = Math.min(blockCoord.y+cpb , MapData.height);
    const x0 = Math.max(blockCoord.x , 0);
    const x1 = Math.min(blockCoord.x+cpb , MapData.width);

    const wallTiletype = MapData.jsonObj.tilesets[0].tileproperties;
    for (let y = y0 ; y < y1; y++) {
      for (let x = x0 ; x <x1; x++) {
        const ID = MapData[layer][MapData.width * y + x] - 1;
        if (ID == -1) continue; 
        const worldCoord = { x: blockWidth * x, y: blockWidth * y }; 
        const entity = MapData.createEntity(wallTiletype , ID , layer , x , y , worldCoord);
        if(this.isUnmover(entity))EntityManager.addEntity(entity);
        }
      }
    }

    static ChunkConstruct(layer){
        // gen 9 chunks around the player
        const y0 = this.currentChunkCoord.y -3 ;
        const y1 = this.currentChunkCoord.y +3 ;
        const x0 = this.currentChunkCoord.x -3 ;
        const x1 = this.currentChunkCoord.x +3 ;
        for (let y = y0 ; y < y1; y++) {
            for (let x = x0 ; x <x1; x++) {
                this.generateSingleChunk(vec2(x,y),layer)
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
         *  blockCoord ... floor(worldCoord/blockWidth)
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