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

    var startStack = height /  2
    for(var j=0; j<this.stacks;j++){
        for (var i = 0; i < this.slices; i++) {
            // Vertices on the top face
            this.vertices.push(Math.cos(ang) *0.5 , Math.sin(ang) *0.5, startStack);
            
            // Vertices on the bottom face
            this.vertices.push(Math.cos(ang) *0.5, Math.sin(ang)*0.5, -stacksheight +startStack);
        
            // Indices for the side faces
            this.indices.push(2 * i, (2 * i + 1) % (2 * this.slices), (2 * i + 2) % (2 * this.slices));
            this.indices.push((2 * i + 1) % (2 * this.slices), (2 * i + 3) % (2 * this.slices), (2 * i + 2) % (2 * this.slices));    
              
            // Normals for the side faces (assuming a regular prism)
            var normalX1 = Math.cos(ang+ step/2);
            var normalY1 = Math.sin(ang+ step/2);
            var normalZ = 0;

            // Top face normal
            this.normals.push(normalX1, normalY1, normalZ);
            // Bottom face normal
            this.normals.push(normalX1, normalY1, normalZ);

      
            ang += step;
        }
        for (var i = 0; i < this.slices; i++) {
            // Vertices on the top face
            this.vertices.push(Math.cos(ang)*0.5, Math.sin(ang)*0.5,  startStack);
            
            // Vertices on the bottom face
            this.vertices.push(Math.cos(ang)*0.5, Math.sin(ang)*0.5,  -stacksheight + startStack);
        
            // Indices for the side faces
            this.indices.push(2 * i, (2 * i + 1) % (2 * this.slices), (2 * i + 2) % (2 * this.slices));
            this.indices.push((2 * i + 1) % (2 * this.slices), (2 * i + 3) % (2 * this.slices), (2 * i + 2) % (2 * this.slices));    
              
            // Normals for the side faces (assuming a regular prism)
            var normalX1 = Math.cos(ang- step/2);
            var normalY1 = Math.sin(ang- step/2);
            var normalZ = 0;

            // Top face normal
            this.normals.push(normalX1, normalY1, normalZ);
            // Bottom face normal
            this.normals.push(normalX1, normalY1, normalZ);

      
            ang += step;
        
        }
        startStack += stacksheight
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
    

    
