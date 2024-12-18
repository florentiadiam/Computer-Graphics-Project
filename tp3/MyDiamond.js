import { CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//Bf (0)
			0, -1, 0,	//Df (1)
			0, 1, 0,	//Af (2)
			1, 0, 0,	//Cf (3)
			0, 1, 0,	//Ab (4)
			-1, 0, 0,	//Bb (5)
			1, 0, 0,	//Cb (6)
			0, -1, 0,	//Db (7)


		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			5, 4, 7,
			4, 6, 7
		];

		this.normals=[
			0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
			0, 0, -1,
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

