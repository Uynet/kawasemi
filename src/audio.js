//サウンド管理
export default class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.BGM = {
      stage1:null,
      stage2:null,
      stage3:null,
    } 
    this.SE = {
      jump : null,
      enemyDamage : null,
      missileShot : null,
      missileHit : null,
    }
  };
  static LoadSE(name){
    let url = "src/resource/SE/" + name + ".wav";
    let req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = ()=>{
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          this.context.decodeAudioData(req.response,(buffer)=>{this.SE[name] = buffer});
        }
      }
    }
    req.open('GET', url, true);
    req.send('');
  }
  // サウンドを再生
  static PlayBGM(buffer){
    let source = this.context.createBufferSource(); // source を作成
      source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = true; // 再生
      source.start(0);
  };
  static PlaySE(name){
    let buffer = this.SE[name];
    let source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = false; // 再生
    source.start(0);
  };
  static async Load() {
    this.Init();
    //this.LoadSound('src/resource/BGM/boss.mp3');
    //!ココで読み込むnameはファイル名に統一すること!
    this.LoadSE('jump');
    this.LoadSE('enemyDamage');
    this.LoadSE('missileHit');
    this.LoadSE('missileShot');
  };
};
