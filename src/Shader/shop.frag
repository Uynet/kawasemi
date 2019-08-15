precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform mat3 mappedMatrix;

float cLength(vec2 v){
  return min(abs(v.x),abs(v.y));
}
vec2 rot(vec2 p){
  float a = 0.9;
  vec2 q; 
  q.x = p.x*cos(a)-p.y *sin(a);
  q.y = p.x*sin(a)+p.y *cos(a);
  return q;
}

void main(void) {
  vec3 map = vec3(vTextureCoord.xy, 1) * mappedMatrix;
  vec2 uv = map.xy;
  vec2 p = uv;
  p = rot(p);
  p.y = fract(p.y*10.-time/60.0);
  uv= abs(uv-0.5);
  if(length(uv)>0.68)discard;
  vec4 c =  texture2D(uSampler, vTextureCoord);
  if(p.y<0.5)c.xyz *= 1.2;
  gl_FragColor = c;
}
