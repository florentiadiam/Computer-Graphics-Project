import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyTriangleBig2 extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			0, 2, 0,	//Af 0 //pano
			-2, 0, 0,	//Bf 1 //aristera
			2, 0, 0,	//Cf 2 //dejia
			0, 2, 0,	//Ab 3
			-2, 0, 0,	//Bb 4
			2, 0, 0		//Cb 5
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

		this.texCoords = [
			0.5, 0.5,  	//pano	
			1, 0,		//aristera
			1, 1		//dejia
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
