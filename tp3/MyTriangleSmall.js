import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 1, 0,	//Af 0
			-1, 0, 0,	//Bf 1
			1, 0, 0,	//Cf 2
			0, 1, 0,	//Ab 3
			-1, 0, 0,	//Bb 4
			1, 0, 0,	//Cb 5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5, 4, 3
		];

		this.normals=[
			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
			0, 0, -1,
            0, 0, -1,
            0, 0, -1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
