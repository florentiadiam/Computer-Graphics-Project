attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
// Add a uniform for the heightmap texture
uniform sampler2D uHeightmap;

varying vec2 vTextureCoord;

void main() {
 // Sample the heightmap texture at the current texture coordinate
    float height = texture2D(uHeightmap, aTextureCoord).b; // Assuming you want to use the red channel

    // Displace the vertex along the y-axis based on the heightmap value
    vec3 displacedPosition = aVertexPosition + vec3(0.0, height, 0.0);

    // Transform the displaced vertex position
    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);

    // Pass along the texture coordinate for fragment shader
    vTextureCoord = aTextureCoord;
}
