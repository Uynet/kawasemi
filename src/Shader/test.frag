precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float time;
uniform float x;
uniform float y;
uniform vec2 p;

uniform mat3 mappedMatrix;

void main(void){
  vec3 map=vec3(vTextureCoord.xy,1)*mappedMatrix;
  //vec2 uv=vTextureCoord;
  vec2 uv=map.xy;
  vec4 color1=texture2D(uSampler,vTextureCoord);
  uv=fract(uv*10.);
  vec4 color2=vec4(uv,0.,.2);
  gl_FragColor=mix(color1,color2,.3);
}
