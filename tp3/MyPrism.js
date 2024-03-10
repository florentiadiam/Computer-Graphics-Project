import { CGFobject } from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {
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
        var ang = 0;
        var step = 2*Math.PI/this.slices;

        var height = 1.0; // Adjust the height of the prism as needed
        var stacksheight= height/this.stacks; // 0.05
        var startStack = 0;

  
    while(startStack<height){
        for (var i = 0; i < this.slices; i++) {
            //vertices for the top face
            this.vertices.push(Math.cos(ang) *0.5 , Math.sin(ang) *0.5, startStack);
            this.vertices.push(Math.cos(ang+step) *0.5 , Math.sin(ang+step) *0.5, startStack);
            //vertices forthe bottom face
            this.vertices.push(Math.cos(ang+step) *0.5 , Math.sin(ang+step) *0.5, startStack+stacksheight);
            this.vertices.push(Math.cos(ang) *0.5 , Math.sin(ang) *0.5, startStack+stacksheight);
            
            // Normals for the side faces (assuming a regular prism)
            var normalX1 = Math.cos(ang+ step/2);
            var normalY1 = Math.sin(ang+ step/2);
            var normalZ = 0;
        
            for(var l=0;l<4;l++){
                this.normals.push(normalX1, normalY1, normalZ);
            }
            ang += step;
        }  
    startStack += stacksheight 
    }

    for(let k=0;k<this.stacks;k++){
        var count=this.slices*4*k;
             for(let j=0;j<this.slices*4;j+=4){
            // Indices for the side faces
                this.indices.push(count+j, count+j+1,count+j+2);
                this.indices.push(count+j+2,count+j+3,count+j);    
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
    

    
