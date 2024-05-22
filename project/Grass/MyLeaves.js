import { CGFobject } from '../../lib/CGF.js';
/**
* MyLeaves
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyLeaves extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        for(let i=0; i<=4; i+=0.5){
            this.vertices.push(-0.2, -0+i, 0);
            this.vertices.push(-0.2, 0.5+i, 0);
            this.vertices.push(0.2, -0+i, 0);
            this.vertices.push(0.2, 0.5+i, 0);
        }
        for(let j=0; j<=12;j+=4){
            this.indices.push(1+j, 0+j, 2+j)
            this.indices.push(2+j, 0+j, 1+j)
            this.indices.push(2+j, 3+j, 1+j)
            this.indices.push(1+j, 3+j, 2+j)
        }

        for(let z=0; z<=4; z+=0.5){
            this.normals.push(-0.2, -0+z, 1);
            this.normals.push(-0.2, 0.5+z, 1);
            this.normals.push(0.2, -0+z, 1);
            this.normals.push(0.2, 0.5+z, 1);
        }

        for (let i = 0; i <= 4; i+=0.5) {
            this.texCoords.push(0, 0);
            this.texCoords.push(0, 1);
            this.texCoords.push(1, 0);
            this.texCoords.push(1, 1);
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();


    }

}