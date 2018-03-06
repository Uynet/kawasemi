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
      jump1 : null,
      jump2 : null,
      coin1 : null,
      coin2 : null,
      enemyDamage : null,
      missileShot : null,
      missileHit : null,
      laserShot : null,
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
  static LoadBGM(name){
    let url = "src/resource/BGM/" + name + ".mp3";
    let req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = ()=>{
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          this.context.decodeAudioData(req.response,(buffer)=>{this.BGM[name] = buffer});
        }
      }
    }
    req.open('GET', url, true);
    req.send('');
  }
  // サウンドを再生
  static PlayBGM(name,gain){
    let buffer = this.BGM[name];
    let source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = true; // 再生
      if(gain){
        let gainNode = this.context.createGain();
        source.connect(gainNode);
        gainNode.connect(this.context.destination);
        gainNode.gain.value = gain;
      }
    source.start(0);
  };
  static PlaySE(name,gain){
    let buffer = this.SE[name];
    let source = this.context.createBufferSource(); // source を作成
    source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = false; // 再生
    if(gain){
      let gainNode = this.context.createGain();
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      gainNode.gain.value = gain;
    }
    source.start(0);
  };
  static async Load() {
    this.Init();
    //this.LoadSound('src/resource/BGM/boss.mp3');
    //!ココで読み込むnameはファイル名に統一すること!
    this.LoadBGM('stage1');
    this.LoadBGM('stage2');
    this.LoadBGM('stage3');
    this.LoadBGM('boss');

    this.LoadSE('jump1');
    this.LoadSE('jump2');//空中ジャンプ
    this.LoadSE('coin1');
    this.LoadSE('coin2');//コイン反射
    this.LoadSE('targetOn');//照準
    this.LoadSE('playerDamage');
    this.LoadSE('enemyDamage');
    this.LoadSE('missileHit');
    this.LoadSE('missileShot');
    this.LoadSE('laserShot');
  };
};
