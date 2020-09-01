import EntityManager from "./entityManager.js";
import MapData from "./mapData.js";

const blockSize = 16;

export default class ChunkDetector{
    static Init(){
        this.chunkWidh= 128+64;
        this.chunkHeight =128; 
        this.prevChunkCoord = vec0();
        this.currentChunkCoord = vec0();
        console.assert(this.chunkWidh % blockSize == 0 , "chunk size must be integer multiple of the blobk size.");
        console.assert(this.chunkHeight % blockSize == 0,"チャンク幅はブロックサイズの整数倍である必要があります");
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
        x: chunkCoord.x * this.chunkWidh / blockSize, 
        y: chunkCoord.y * this.chunkHeight / blockSize, 
    }
    const cpb = this.chunkWidh/blockSize;
    const y0 = Math.max(blockCoord.y , 0);
    const y1 = Math.min(blockCoord.y+cpb , MapData.height);
    const x0 = Math.max(blockCoord.x , 0);
    const x1 = Math.min(blockCoord.x+cpb , MapData.width);

    const wallTiletype = MapData.jsonObj.tilesets[0].tileproperties;
    for (let y = y0 ; y < y1; y++) {
      for (let x = x0 ; x <x1; x++) {
        const ID = MapData[layer][MapData.width * y + x] - 1;
        if (ID == -1) continue; 
        const worldCoord = { x: blockSize * x, y: blockSize * y }; 
        const entity = MapData.createEntity(wallTiletype , ID , layer , x , y , worldCoord);
        if(this.isUnmover(entity))EntityManager.addEntity(entity);
        }
      }
    }

    static ChunkConstruct(layer){
        const chunkMoveDri = sub(this.currentChunkCoord , this.prevChunkCoord);
        // gen 9 chunks around the player

        const w = 1;
        const h = 1;

        const y0 = this.currentChunkCoord.y -w ;
        const y1 = this.currentChunkCoord.y +w ;
        const x0 = this.currentChunkCoord.x -h ;
        const x1 = this.currentChunkCoord.x +h ;

        for (let y = y0 ; y <= y1; y++) {
            for (let x = x0 ; x <= x1; x++) {
                // 新規チャンクのみ生成
                // currentChunkとprevChunkの和集合(をcontinueする) 
                if( -w-chunkMoveDri.x +this.currentChunkCoord.x <= x && x <= w-chunkMoveDri.x +this.currentChunkCoord.x){
                    if( -h-chunkMoveDri.y + this.currentChunkCoord.y <= y && y <= h-chunkMoveDri.y +this.currentChunkCoord.y) 
                        continue;
                }
                this.generateSingleChunk(vec2(x,y),layer)
            }
        }
    }
    static removeChunk(unmoveEntities , cp){
        const destroy = []
        for(let i = 0;i<unmoveEntities.length ; i ++){
            const e = unmoveEntities[i];
            const isDestroy = (
                cp.x <= e.pos.x &&
                e.pos.x < cp.x + this.chunkWidh && 
                cp.y <= e.pos.y && 
                e.pos.y < cp.y + this.chunkHeight);
            if(isDestroy) destroy.push(e)
        }
        destroy.forEach(e => EntityManager.removeEntity(e))
    }

    static isUnmover(e){
        return e.type!=ENTITY.MOVER && e.type!=ENTITY.PLAYER && e.type !=ENTITY.ENEMY
    }
   
    static getAroundChunks(chunkCoord){
        let aroundChunks = []
        const w = 1;
        const h = 1;

        const y0 = chunkCoord.y -w ;
        const y1 = chunkCoord.y +w ;
        const x0 = chunkCoord.x -h ;
        const x1 = chunkCoord.x +h ;

        for (let y = y0 ; y <= y1; y++) {
            for (let x = x0 ; x <= x1; x++) {
                aroundChunks.push(vec2(x,y))
            }
        }
        return aroundChunks;
    }

  static DeleteStage() {
        const unmoveEntities = EntityManager.entityList.filter(e=>  this.isUnmover(e));

        // remove blocks who DONT belongs to one of aroundCurrentChunks
        unmoveEntities.forEach(e => {
            /*  around 3*3
               ★■■
               ■◆■
               ■■■
             */

            //◆...currendChunk
            const cp = {x: (this.currentChunkCoord .x -1)*this.chunkWidh , y: (this.currentChunkCoord.y-1)*this.chunkHeight}; //★
            const d = 3; 

            const isArroundChunk = 
                cp.x <= e.pos.x &&
                e.pos.x < cp.x + this.chunkWidh*d && 
                cp.y <= e.pos.y && 
                e.pos.y < cp.y + this.chunkHeight*d;
            if(!isArroundChunk) EntityManager.removeEntity(e);
        })
  }

  // detect who leaved from registration-chunk (around 9 chunks by the player)
  static detectMoverOutofChunk(){
        const moveEntities = EntityManager.entityList.filter(e=>  !this.isUnmover(e));
        moveEntities.forEach(mover=>{
            const moverChunkCoord = vec2(Math.floor(mover.pos.x / this.chunkWidh) , Math.floor(mover.pos.y / this.chunkHeight));
            // moverがplayer周辺9チャンクより外に出た場合updateを停止する
            mover.isUpdater = (DIST_C(this.currentChunkCoord , moverChunkCoord)<=1);
        })
  }

    static Update(){
        /*
         *  worldCoord 
         *  chunkCoord 
         *  blockCoord ... floor(worldCoord/blockSize)
         */
        this.detectMoverOutofChunk();
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