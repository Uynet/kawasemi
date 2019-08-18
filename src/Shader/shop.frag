precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform mat3 mappedMatrix;

float cLength(vec2 v){
  return min(abs(v.x),abs(v.y));
}
vec2 rot(vec2 p){
  float a=.9;
  vec2 q;
  q.x=p.x*cos(a)-p.y*sin(a);
  q.y=p.x*sin(a)+p.y*cos(a);
  return q;
}

void main(void){
  vec2 st=gl_FragCoord.xy;
  st/=8.;
  st-=fract(st);
  st/=80.;
  vec3 map=vec3(vTextureCoord.xy,1)*mappedMatrix;
  vec2 uv=map.xy;
  uv=abs(uv-.5);
  if(length(uv)>.68)discard;
  vec2 p=rot(st);
  p.y=fract(p.y*10.-time/60.);
  vec4 c=texture2D(uSampler,vec2(.5));
  if(p.y<.5)c.xyz*=1.2;
  gl_FragColor=c;
}
