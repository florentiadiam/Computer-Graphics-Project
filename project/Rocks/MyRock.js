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

        for (var j = -Math.PI / 2; j <= Math.PI; j += ang) {
            for (var i = 0; i <= this.slices; i++) {
                // Vertices
                var x = Math.cos(i * step) * Math.cos(j);
                var y = Math.sin(j) * 0.5; // Squish down the y-coordinate
                var z = Math.sin(i * step) * Math.cos(j);

                // Perturb the vertices along their normals to create slight irregularities
                var perturbation = 0.2; // Adjust the perturbation factor as needed
                var normalFactor = 1 + (Math.random() - 0.5) * perturbation; // Random factor to perturb along normal
                x *= normalFactor;
                y *= normalFactor;
                z *= normalFactor;

                this.vertices.push(x, y, z);

                if (this.inside == false) {
                    // Normal
                    this.normals.push(-x, -y, -z);
                } else {
                    this.normals.push(x, y, z);
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
