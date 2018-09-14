precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform float particles[30];

void main(void) {
  vec2 uv = vTextureCoord;
  //uv.y *= uv.y;
  vec4 color = texture2D(uSampler, uv);
  /*
  color += 0.4*vec4(uv,1,1);
  if(uv.x > 0.7)color += vec4(0.4);
  if(uv.y > 0.7)color += vec4(0.4);
  if(uv.x < 0.1)color += vec4(0.4);
  if(uv.y < 0.1)color += vec4(0.4);
  */
  gl_FragColor = color;
}
