//サウンド管理
export default class Audio{
  static Init(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  };
  static GetAudioBuffer(url, fn){  
    let req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          context.decodeAudioData(req.response, function(buffer) {
            fn(buffer);
          });
        };
      };
    };
    req.open('GET', url, true);
    req.send('');
  };
  // サウンドを再生
  static PlaySound(buffer){
    let source = this.context.createBufferSource(); // source を作成
      source.buffer = buffer; // buffer をセット
    source.connect(this.context.destination); // context に connect
    source.loop = true; // 再生
      source.start(1);
  };
  static Load() {
    this.GetAudioBuffer('src/resource/boss.mp3', function(buffer) {
      this.PlaySound(buffer);
    });
  };
};
