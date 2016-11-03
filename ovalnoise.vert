#version 330 compatibility

uniform float uAd;
uniform float uBd;
uniform float uNoiseAmp;
uniform float uNoiseFreq;

//Variables sent to the fragment shader
out vec4 vTexCoord;
out vec3 vMCposition;

void main( )
{
	vTexCoord = gl_MultiTexCoord0;
	vMCposition = (gl_Vertex).xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}