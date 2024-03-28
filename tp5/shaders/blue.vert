attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float norm;
uniform float time;

varying vec4 colorver;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + norm*sin(time), aVertexPosition.y, aVertexPosition.z, 1.0);
    colorver = gl_Position;
}

