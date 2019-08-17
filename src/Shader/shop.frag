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
  vec3 map=vec3(vTextureCoord.xy,1)*mappedMatrix;
  vec2 uv=map.xy;
  float r=68.;
  uv*=r;
  uv-=fract(uv);
  uv/=r;
  vec2 p=rot(uv);
  p.y=fract(p.y*10.-time/60.);
  uv=abs(uv-.5);
  if(length(uv)>.68)discard;
  vec4 c=texture2D(uSampler,vTextureCoord);
  if(p.y<.5)c.xyz*=1.2;
  gl_FragColor=c;
}
