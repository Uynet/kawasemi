class MapData{
  constructor(){
    this.jsonObj;
  }

  Load(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','resource/map.json',true);
    xhr.onreadystatechange = ()=>{
      this.jsonObj = xhr.responseText;
    }
    xhr.send(null);
  }
}
