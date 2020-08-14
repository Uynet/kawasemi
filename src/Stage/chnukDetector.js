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
     const player = EntityManager.player;
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
    let ID;
    for (let y = y0 ; y < y1; y++) {
      for (let x = x0 ; x <x1; x++) {
        ID = MapData[layer][MapData.width * y + x] - 1;
        //tiledのIDがjsonデータより1小さいので引く
        if (ID == -1) continue; //空白はjsonで0なので(引くと)-1となる
        let p = { x: 16 * x, y: 16 * y }; //座標を変換
        const entity = MapData.getEntityTypeFromID(wallTiletype , ID , layer , x , y , p);
        if(entity.name!="player")EntityManager.addEntity(entity);
        }
      }
    }

  static DeleteStage() {
        const entitiesExeptPlayer = EntityManager.entityList.filter(e=> e.name!="player");
        entitiesExeptPlayer.forEach(e => EntityManager.removeEntity(e))
  }

    static Update(){
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