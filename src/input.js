import Timer from "./timer.js";
import Game from "./game.js";

let inputedKeyList = new Array(256).fill(false);
let clickedKeyList = new Array(256).fill(false);
let anyKeyDown = false;
let anyKeyClick = false;
let timer = 0;

export default class Input {
  //20240214 start gamepad対応
  static getGamepadInput(key) {
    let gamepad_list = navigator.getGamepads();

    if (this.isLocked) return false;

    for (let i = 0; i < gamepad_list.length; i++) {
      let gamepad = gamepad_list[i];
      if (!gamepad) continue;

      let axes = gamepad.axes;
      if (!axes) continue;

      let buttons = gamepad.buttons;
      if (!buttons) continue;

      //十字キー
      if (axes[0] === 1) {
        //右
        inputedKeyList[KEY.RIGHT] = true;
      } else if (axes[0] === -1) {
        //左
        inputedKeyList[KEY.LEFT] = true;
      } else if (axes[1] === -1) {
        //上（クリックは店用）
        if (!inputedKeyList[KEY.UP]) {
          clickedKeyList[KEY.UP] = true;
          timer = Timer.timer;
        }
        inputedKeyList[KEY.UP] = true;
      } else if (axes[1] === 1) {
        //下（クリックは店用）
        if (!inputedKeyList[KEY.DOWN]) {
          clickedKeyList[KEY.DOWN] = true;
          timer = Timer.timer;
        }
        inputedKeyList[KEY.DOWN] = true;
      } else {
        inputedKeyList[KEY.RIGHT] = false;
        inputedKeyList[KEY.LEFT] = false;
        inputedKeyList[KEY.UP] = false;
        inputedKeyList[KEY.DOWN] = false;
        clickedKeyList[KEY.UP] = false;
        clickedKeyList[KEY.DOWN] = false;
      }

      inputedKeyList[KEY.Z] = false;
      inputedKeyList[KEY.X] = false;
      inputedKeyList[KEY.C] = false;
      clickedKeyList[KEY.Z] = false;
      clickedKeyList[KEY.X] = false;
      clickedKeyList[KEY.C] = false;
      for (let j = 0; j < buttons.length; j++) {
        //jはボタン番号 0:下 1:右 2:左 3:上
        if (buttons[0].pressed) {
          //下ボタン：zキー
          inputedKeyList[KEY.Z] = true;
          clickedKeyList[KEY.Z] = true;
          timer = Timer.timer;
        }
        if (buttons[1].pressed) {
          //右ボタン：xキー
          inputedKeyList[KEY.X] = true;
          clickedKeyList[KEY.X] = true;
          timer = Timer.timer;
        }
        if (buttons[2].pressed) {
          //左ボタン：cキー
          inputedKeyList[KEY.C] = true;
          clickedKeyList[KEY.C] = true;
          timer = Timer.timer;
        }
      }
    }
  }
  //20240214 end

  //入力を禁止する
  static lock() {
    this.isLocked = true;
  }
  //入力禁止を解除
  static restore() {
    this.isLocked = false;
  }
  /*押下状態のときtrue*/
  static isKeyInput(key) {
    if (this.isLocked) return false;

    //20240214 start gamepad対応
    if (!anyKeyDown && !anyKeyClick) {
      Input.getGamepadInput(key);
    }
    //20240214 end

    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key) {
    if (this.isLocked) return false;

    //20240214 start gamepad対応
    if (!anyKeyDown && !anyKeyClick) {
      if (key == 67) {
        //武器切替を連打しないようにする
        if (!inputedKeyList[KEY.C]) {
          Input.getGamepadInput(key);
        }
      } else {
        Input.getGamepadInput(key);
      }
    }
    //20240214 end

    if (timer == Timer.timer) {
      return clickedKeyList[key];
    } else {
      return false;
    }
  }
  //押してからちょっと時間がたつとtrue
  //UIの長押しの際などに必要となる挙動
  static isKeyPress(key) {
    const t = Timer.timer - timer;
    return (
      //Click後にインターバルをおいた後、一定の間隔で押下判定
      Input.isKeyClick(key) || (t > 12 && t % 5 == 0 && Input.isKeyInput(key))
    );
  }
  static VirtualKeyDown(key) {
    inputedKeyList[key] = true;
  }
  static VirtualKeyUp(key) {
    inputedKeyList[key] = false;
  }
  static isAnyKeyPress() {
    if (this.isLocked) return false;
    const t = Timer.timer - timer;
    return (
      //Click後にインターバルをおいた後、一定の間隔で押下判定
      Input.isAnyKeyClick() || (t > 12 && t % 5 == 0 && anyKeyDown)
    );
  }
  static isAnyKeyClick() {
    //console.log(timer + "/" + Timer.timer)
    //20240214 start gamepad対応
    //return timer==Timer.timer && anyKeyClick;
    if (timer == Timer.timer && anyKeyClick) {
      return timer == Timer.timer && anyKeyClick;
    }
    const t = Timer.timer - timer;
    if (t > 12) {
      //お店で選択肢を連打しないようにする
      Input.getGamepadInput("");
    }
    if (timer == Timer.timer) {
      return true;
    }
    //20240214 end
  }
  static addKeyListenner(entity, keyCode, handler) {
    if (Game.state)
      Game.state.getState().addKeyListenner(entity, keyCode, handler);
  }
  static getPressedKeys() {
    let a = inputedKeyList.map((e, i) => {
      if (e) return i;
      return e;
    });
    let b = a.filter((e) => {
      return e != false;
    });
    return b;
  }
  static getClickedKeys() {
    let a = clickedKeyList.map((e, i) => {
      if (e) return i;
      return e;
    });
    let b = a.filter((e) => {
      return e != false;
    });
    return b;
  }
}
/*receive input event*/
document.onkeydown = (e) => {
  anyKeyDown = true;
  anyKeyClick = false;
  clickedKeyList[event.keyCode] = false;
  if (!inputedKeyList[event.keyCode]) {
    clickedKeyList[event.keyCode] = true;
    anyKeyClick = true;
    timer = Timer.timer;
  }
  inputedKeyList[event.keyCode] = true;
  //上下キーを封じる
  switch (e.keyCode) {
    case KEY.UP:
    case KEY.DOWN:
    case KEY.RIGHT:
    case KEY.LEFT:
    case KEY.SP:
      event.preventDefault();
  }
};
document.onkeyup = (e) => {
  anyKeyDown = false;
  anyKeyClick = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
};
