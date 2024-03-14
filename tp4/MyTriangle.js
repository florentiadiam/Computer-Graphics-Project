import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyTriangle extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//Af 0	//aristera kato
			-1, 1, 0,	//Bf 1	//aristera pano
			1, -1, 0,	//Cf 2	//dejia kato
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

		this.texCoords = [
			0, 1,  	//aristera kato
			0.5, 1,	//aristera pano
			0, 0.5	//dejia kato
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

