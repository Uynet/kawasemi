precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  //vec4 color = texture2D(uSampler, vTextureCoord);
  vec4 color = vec4(0);

  vec2 uv = vTextureCoord.xy/16.0-vec2(0.5);

  if(uv.x + uv.y<0.1)color = vec4(1);
  gl_FragColor = color;
}
