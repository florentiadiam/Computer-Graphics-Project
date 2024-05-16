#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor; // Time factor to control animation
uniform float frequency;  // Frequency to control speed of the movement

varying vec2 vTextureCoord;

void main(void) {
    vTextureCoord = aTextureCoord;

    // Calculate the vertical position (py) as a factor from 0.0 at the bottom to 2.5 at the top
    float py = aVertexPosition.y  / 2.5;

    // Calculate displacement along the z-axis
    float displacement =  py*cos(timeFactor * frequency)*sin(py*0.8);

    // Displace the vertex position along the z-axis
    vec3 displacedPosition = aVertexPosition + vec3(0.0, 0.0, displacement);

    vec4 mvPosition = uMVMatrix * vec4(displacedPosition, 1.0);
    gl_Position = uPMatrix * mvPosition;
}
