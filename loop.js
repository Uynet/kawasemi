  /*loop
   */
  let loop = ()=>{
    requestAnimationFrame(loop);

    /*更新*/
    Game.Update();

    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
