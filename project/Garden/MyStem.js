import { CGFobject } from '../../lib/CGF.js';
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
        let ang = 0;
        const step = 2*Math.PI/this.slices;

        const height = this.stacks; // Adjust the height of the prism as needed
        const stacksheight= height/this.stacks; // 0.05
        let startStack = 0;

  
    for(let j=0;j<this.stacks+2;j++){
        for (let i = 0; i < this.slices; i++) {

            //vertices for the top face
            this.vertices.push(Math.cos(ang)/3 , Math.sin(ang)/3 , startStack/3);
   
            // Normals for the side faces (assuming a regular prism)
            var normalX1 = Math.cos(ang);
            var normalY1 = Math.sin(ang);
            var normalZ = 0;
        
          
            this.normals.push(normalX1, normalY1, normalZ);
            
            
            ang += step;
        }  
            startStack += stacksheight  
    }

    for(let k=0;k<this.stacks;k++){
        const count=this.slices*k;
             for(let j=0;j<this.slices;j++){
            // Indices for the side faces
                this.indices.push(count+j, count+j+1,count+j+this.slices);
                this.indices.push(count+j+1,count+j+this.slices+1,count+j+this.slices);    
               }
    }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
         /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
