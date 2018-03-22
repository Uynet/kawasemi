precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);

  float y = vTextureCoord.y;

  //color.r = min(1.0, color.r + y*y/4.0);
  //color.g = min(1.0, color.g - y*y/4.0);
  //color.b = min(1.0, color.b - y*y/4.0);
  

  gl_FragColor = color;
}
