import { CGFobject } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, inside) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
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
            var y1=Math.cos(a)*0.5;
            for (var i = 0; i <=this.slices; i++) {
                var f=i*step;
                var x2=Math.sin(f);
                var z1=Math.cos(f);
    
                // Vertices
                var X1 = z1*x1
                var Y1 = y1
                var Z1 = x2*x1

                       // Perturb the vertices along their normals to create slight irregularities
              var perturbation = 0.2; // Adjust the perturbation factor as needed
              var normalFactor = 1 + (Math.random() - 0.5) * perturbation; // Random factor to perturb along normal
              
                X1 *= normalFactor;
                Y1 *= normalFactor;
                Z1 *= normalFactor;
                
                this.vertices.push(X1, Y1, Z1)

                if (this.inside == false) {
                    // Normal
                    this.normals.push(-X1, -Y1, -Z1);
                } else {
                    this.normals.push(X1, Y1, Z1);
                }

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
