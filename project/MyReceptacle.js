import { CGFobject } from '../lib/CGF.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        angle_stacks = (Math.PI/2)/ this.stacks;
        angle_slides = 2*Math.PI/ this.slices;

        for(let j=0; j<this.stacks;j++){
            height= Math.sin(angle_stacks);
            angle_stacks =+ angle_stacks;
        }
    

    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        
    }
}
