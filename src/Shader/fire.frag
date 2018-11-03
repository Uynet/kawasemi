precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float paintCol; 
uniform float x;
uniform float y;

void main(void) {
  vec2 uv = vTextureCoord;
  float pixelCol;
  /*
  if(abs(uv.x - x)<0.5 || abs(uv.y - 0.5 )<0.01){
    pixelCol = paintCol+1.0;
  }
  */
  pixelCol = paintCol;
  gl_FragColor = vec4(pixelCol,pixelCol,pixelCol,1);
}
