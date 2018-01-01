  /*loop
   */
  let loop = ()=>{
    requestAnimationFrame(loop);

    switch(state){
      /*更新*/
      case 0 : Game.Update();
      break;

    }

    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
