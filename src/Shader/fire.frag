precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float paintCol; 

void main(void) {
  vec2 uv = vTextureCoord;
  vec4 color = texture2D(uSampler, uv);
  gl_FragColor = color;
  gl_FragColor = vec4(paintCol,paintCol,paintCol,1);
}
