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
    
        for (var j = -Math.PI / 2; j <= Math.PI / 2; j += ang) {
            for (var i = 0; i < this.slices; i++) {
    
                // Vertices
                var X1 = Math.cos(i * step) * Math.cos(j);
                var Y1 = Math.sin(j);
                var Z1 = Math.sin(i * step) * Math.cos(j);
                this.vertices.push(X1, Y1, Z1)
    
                if (this.inside == false) {
                    // Normal
                    this.normals.push(-X1, -Y1, -Z1);
                } else
                    this.normals.push(X1, Y1, Z1);
    
    
                // Texture coordinates
                var s = i / this.slices; // Horizontal (s) coordinate
                var t = (j + Math.PI / 2) / Math.PI; // Vertical (t) coordinate
                this.texCoords.push(-s, -t);
            }
        }
        var count = 0;
        for (let k = 0; k < this.stacks; k++) {
            for (let m = 0; m < this.slices; m++) {
                // Indices for the side faces
                this.indices.push(count, count + this.slices + 1, count + this.slices);
                this.indices.push(count, count + 1, count + this.slices + 1);
                count++;
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}