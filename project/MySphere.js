import { CGFobject } from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
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
        var ang = (Math.PI/2)/this.stacks;
        var step = 2*Math.PI/this.slices;

  
    for(var j=-this.stacks;j<=this.stacks;j++){
        for (var i = 0; i < this.slices; i++) {
            
            // Normals for the side faces 
            var normalX1 = Math.cos(i*step)*Math.cos(j*ang);
            var normalY1 = Math.sin(j*ang);
            var normalZ = Math.sin(i*step)*Math.cos(j*ang);
        
            for(var l=0;l<4;l++){
                this.normals.push(normalX1, normalY1, normalZ);
            }
        }  
   
    }
var count=0;
    for(let k=0;k<this.stacks*2;k++){
             for(let m=0;m<this.slices;m++){
            // Indices for the side faces
                this.indices.push(count, count+this.slices+1,count+this.slices);
                this.indices.push(count,count+1,count+this.slices+1);   
                count++; 
               }
    }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
   
   
    
   updateBuffers(complexity){
       this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

       // reinitialize buffers
       this.initBuffers();
       this.initNormalVizBuffers();
   }

}
    