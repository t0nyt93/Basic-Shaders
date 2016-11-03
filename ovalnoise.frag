#version 330 compatibility

uniform float  uAd;
uniform float uBd;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uTol;
uniform float uAlpha;
uniform sampler3D Noise3;

//Take in our variables from the .vert shader
in vec4 vTexCoord;
in vec3 vMCposition;

out vec4 fragcolor;
void main( )
{	

	//Get our current location in s,t
	float sp = 4 * vTexCoord.s;
	float tp = vTexCoord.t;
	//Turn our diameter into a radius for further use
	float uAr = uAd/2.;
	float uBr = uBd/2.;
	float numins = floor( sp / (2. * uAr));
	float numint = floor( tp / (2. * uBr));
	
	//Create our noise
	vec3 stp = uNoiseFreq * vMCposition;
	vec4 nv = texture(Noise3,stp);
	//Add up all of the components
	float myRand = nv.r + nv.g + nv.b + nv.a;
	myRand = myRand - 2;
	//Implement noiseAmp
	myRand = myRand * uNoiseAmp;

	float sc = numins * uAd + uAr;
	float tc = numint * uBd + uBr;
	
	//Code below is the same as Project #2
	vec3 sptp = vec3(sp,tp,0.);
	vec3 cntr = vec3(sc,tc,0.);
	
	vec3 delta = sptp - cntr;

	float oldRadius = length(delta);
	float newRadius = oldRadius + myRand;

	delta = delta * newRadius/oldRadius;

	float deltaU = delta.x;
	float deltaV = delta.y;
	float d = pow((deltaU/uAr),2) + pow((deltaV/uBr),2);

		if (d <= 1. )
		{
			float t = smoothstep (1. - uTol, 1 + uTol, d);
			fragcolor = mix(vec4(0.5,1.,.5,1.), vec4(.3,.25,.75,1.),t);
		}
		else
		{
			if (uAlpha == 0)
			{
				discard;
			}
			fragcolor = vec4(.3,.25,.75,uAlpha);
		}

	//gl_FragColor.rgb *= vLightIntensity;	// apply lighting model
}
