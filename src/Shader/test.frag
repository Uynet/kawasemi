precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);

  color.r = min(1.0, color.r + (vTextureCoord.y)*(vTextureCoord.y));
  color.g = min(1.0, color.g + (vTextureCoord.y)*(vTextureCoord.y)/4.0);

  
  for(int i = 0;i<10;i++){
    color.r *= min(1.0,(0.7 + color.a));
    color.g *= min(1.0,(0.7 + color.a));
  }

  gl_FragColor = color;
}
