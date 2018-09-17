precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform float x;
uniform float y;
uniform vec2 p;

void main(void) {
  vec2 uv = vTextureCoord;
  uv -= 0.5;
  vec2 p = vec2(x,y)-0.5;
  float L = abs(abs(uv.x-p.x)-time*0.02);
  //uv.x += exp(-L*40.0)*sin(L*10.0)*0.5;
  uv.y += exp(-L*40.0-4.0)*1.5;
  uv.x = clamp(uv.x , -0.5 , 0.5);

  vec4 color = texture2D(uSampler, uv+0.5);
  gl_FragColor = color;
}
