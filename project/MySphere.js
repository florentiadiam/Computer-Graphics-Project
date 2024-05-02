import { CGFobject } from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inside) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside=inside;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var ang = Math.PI / this.stacks;
    
        var step = 2 * Math.PI / this.slices;
    
        for (var j = 0 ; j <=this.stacks; j ++) {
            var a=j*ang;
            var x1=Math.sin(a);
            var y1=Math.cos(a);
            for (var i = 0; i <=this.slices; i++) {
                var f=i*step;
                var x2=Math.sin(f);
                var z1=Math.cos(f);
    
                // Vertices
                var X1 = z1*x1
                var Y1 = y1
                var Z1 = x2*x1
                

                this.vertices.push(X1, Y1, Z1)
                
                if (this.inside == true) {
                    // Normal
                    this.normals.push(-X1, -Y1, -Z1);
                } else
                    this.normals.push(X1, Y1, Z1);
    
              
                // Texture coordinates
                var s = i / this.slices; // Horizontal (s) coordinate
                var t = 1-j/this.stacks; // Vertical (t) coordinate
                this.texCoords.push(s, t);
            }
        }
        
        
        var count = 0;
        for (let k = 0; k <=this.stacks; k++) {
            for (let m = 0; m <= this.slices; m++) {
                // Indices for the side faces
                if(this.inside==false)
                {
                this.indices.push(count, count + this.slices + 1, count + this.slices);
                this.indices.push(count, count + 1, count + this.slices + 1);
                }
                else{
                this.indices.push(count, count+this.slices , count+this.slices +1);
                this.indices.push(count, count + this.slices+1, count+1);
                }
                count++;
            }
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }
    display() {
        // Enable backface culling
        this.scene.gl.enable(this.scene.gl.CULL_FACE);

        // Set culling mode to back faces
        this.scene.gl.cullFace(this.scene.gl.BACK);

        // Call the superclass display method
        super.display();

        // Disable backface culling after rendering
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
    }

}