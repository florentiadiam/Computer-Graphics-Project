import { CGFobject } from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyParallelogram extends CGFobject {
	constructor(scene,coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			1, 1, 0,	//0	//pano aristera
			0, 0, 0,	//1	//kato aristera
			2, 0, 0,    //2	//kato dejia
            2, 0, 0,	//3	//kato dejia
			1, 1, 0,	//4	//pano aristera
			3, 1, 0	    //5	//pano dejia
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 4, 5,
            5, 4, 3,
			2, 1, 0
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

		this.texCoords = [
			0.75, 0.75,		//pano aristera
			1, 1,			//kato aristera
			0.5, 1,     	//kato dejia
            0.5, 1, 		//kato dejia
			0.75, 0.75,		//pano aristera
			0.25, 0.75		//pano dejia
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

