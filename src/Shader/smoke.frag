precision mediump float;
varying vec2 vtexturecoord;
uniform sampler2d usampler;

void main(void) {
  vec4 color = texture2d(usampler, vtexturecoord);

  float y = vtexturecoord.y;

  color.r = min(1.0, color.r + y*y/2.0);
  color.g = min(1.0, color.g + y*y/4.0);
  //color.b = min(1.0, color.b + y*y/5.0);

  if(color.a == 0.0){
    color = texture2d(usampler, vtexturecoord);
  }

  gl_fragcolor = color;
}
