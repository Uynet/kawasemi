precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);

  color.r = min(1.0,color.r + vTextureCoord.y);
  color.g = min(1.0,color.g + vTextureCoord.y/4.0);

  color.r = color.r * color.a;
  color.g = color.g * color.a;
  gl_FragColor = color;
}
