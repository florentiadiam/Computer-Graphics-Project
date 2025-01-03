import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//Af 0
			-1, 1, 0,	//Bf 1
			1, -1, 0,	//Cf 2
			-1, -1, 0,	//Ab 3
			-1, 1, 0,	//Bb 4
			1, -1, 0	//Cb 5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 0, 2,
			5, 3, 4
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

