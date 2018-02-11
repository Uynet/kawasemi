const DIR = {
  UP : 0,
  DOWN : 1,
  RIGHT : 2,
  LEFT : 3,
};

/*形状*/
const SHAPE = {
  BOX : 0,
  CIRCLE : 1,
  LINE : 2
};

/*Key*/
const KEY = {
  LEFT : 37,
  UP : 38,
  RIGHT : 39,
  DOWN : 40,
  Z : 90,
  X : 88,
  C : 67,
  H : 72,
  J : 74,
  K : 75,
  L : 76,
  SP : 32
}

/*State*/ 
const STATE = {
  INIT : "INIT",
  STAGE : "STAGE",
  TITLE : "TITLE",
  PAUSE : "PAUSE"
}

/*Entity*/
const ENTITY = {
  PLAYER  : "PLAYER",
  WALL : "WALL",
  ENEMY : "ENEMY",
  BULLET : "BULLET",
  EFFECT : "EFFECT",
  BG : "BG"
}

/*MapChip*/
const TILE = {
  SPACE : 0,
  WALL :1,
  PLAYER : 2,
  ENEMY : 3,
  GOAL : 4,
  BG : 5,
  SIGN : 6
}

const CONTAINER = {
  ENTITY : "ENTITY",
  FILTER : "FILTER"
}

/*UI*/
const UI_ = {
  WICON : "WICON",
  SELBOX : "SELBOX",
  WEQUIP : "WEQUIP",
  HP : "HP",
  BULLET : "BULLET",
  FONT : "FONT"
}
const WICON_X = 8;
const WICON_Y = 40;

/*Vector*/
let VEC0 = {x:0,y:0};


/*for debug*/
let po = ()=>{console.log("po")};
let cl = console.log;

//audio test
let a = true;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();

// Audio 用の buffer を読み込む
let getAudioBuffer = function(url, fn) {  
  let req = new XMLHttpRequest();
  // array buffer を指定
  req.responseType = 'arraybuffer';
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        // array buffer を audio buffer に変換
        context.decodeAudioData(req.response, function(buffer) {
          // コールバックを実行
          fn(buffer);
        });
      }
    }
  };
  req.open('GET', url, true);
  req.send('');
};

// サウンドを再生
let playSound = function(buffer) {
  // source を作成
  let source = context.createBufferSource();
  // buffer をセット
  source.buffer = buffer;
  // context に connect
  source.connect(context.destination);
  source.loop = true;
  // 再生
  source.start(1);
};

// main
window.onload = function() {
  // サウンドを読み込む
  getAudioBuffer('src/boss.mp3', function(buffer) {
    // 読み込み完了後にボタンにクリックイベントを登録
      // サウンドを再生
    //  console.log(a)
      if(a){
   //   console.log("po")
    //  playSound(buffer);
      a = false;
    };
  });
};
