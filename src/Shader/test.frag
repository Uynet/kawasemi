precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform float particles[30];

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);
  //if(uv.x + uv.y<0.1)color = vec4(1);
  gl_FragColor = color;
}
