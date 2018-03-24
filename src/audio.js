import Timer from './timer.js';
//サウンド管理
let source,buffer,gainNode;
export default class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.BGM = { } 
    this.SE = { }
    this.stack = [];
    this.time = Timer.timer;
    this.lastSE;
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
          this.context.decodeAudioData(req.response,
            (buffer)=>{this.SE[name] = buffer
            });
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
    source = this.context.createBufferSource(); // source を作成
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
  static PlaySE(name,gain,pitch){
    //同じ効果音は同時にならないようにする
    if(Timer.timer-this.time > 2|| name != this.lastSE){
      this.time = Timer.timer;
      this.lastSE = name;
      source = this.context.createBufferSource();
      source.buffer = this.SE[name];
      source.connect(this.context.destination);
      source.loop = false; // 再生
      if(!pitch)pitch = 1;
      source.playbackRate.value = pitch + Rand(0.05);
      gainNode = this.context.createGain();
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      gainNode.gain.value = 1;
      if(gain) gainNode.gain.value += gain;
      source.start(0);
    }
  };
  static Load() {
    return new Promise(res=>{
      this.Init();
      //!ココで読み込むnameはファイル名に統一すること!
  //    this.LoadBGM('stage4');
      this.LoadBGM('stage5');

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
      this.LoadSE('normalShot');
      this.LoadSE('landing1');//着地
      this.LoadSE('landing2');//着地鉄骨
      this.LoadSE('landing3');//着地鉄骨
      this.LoadSE('blockBreak');//
      this.LoadSE('stageChange');//
      this.LoadSE('empty');//
      this.LoadSE('enemy3Shot');//
      this.LoadSE('enemy5Shot');//
      this.LoadSE('enemy6Swell');//
      this.LoadSE('changeWeapon');//
      res();
    })
  };
};
