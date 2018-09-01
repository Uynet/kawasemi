precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float time;
uniform float particles[30];

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);
    float a = vTextureCoord.x * 4.0; 
    a -= floor(a);
    a += particles[0];
    color.x = a;
    color.y = vTextureCoord.y*2.0;
  //if(uv.x + uv.y<0.1)color = vec4(1);
  gl_FragColor = color;
}
