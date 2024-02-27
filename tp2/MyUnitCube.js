import { CGFobject } from '../lib/CGF.js';
/**
 
MyUnitCube
@constructor
@param scene - Reference to MyScene object
*/
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5,- 0.5, 0.5,                  //Α0
            0.5, -0.5, 0.5,                  //Α1
            0.5, 0.5, 0.5,                    //Α2
            -0.5, 0.5, 0.5,                  //Α3
            -0.5,- 0.5,- 0.5,                //Α4
            0.5, -0.5, -0.5,                //Α5
            0.5, 0.5, -0.5,                 //Α6
            -0.5, 0.5, -0.5                 //Α7





        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2, 0, 2, 3,//facade, (προσωψη)
            2, 1, 0, 3, 2, 0,
            4, 5, 6, 4, 6, 7, //backface(πισω οψη)
            6, 5, 4, 7, 6, 4,
            3, 2, 6, 3, 6, 7, //landing (κατωψη)
            6, 2, 3, 7, 6, 3,
            0, 1,5 ,0 ,5 , 4, //rise (ανωψη)
            5, 1, 0, 4, 5, 0,
            4, 0, 3, 4, 3, 7, //left side view
            3, 0, 4, 7, 3, 4,
            1, 5, 6, 1, 6, 2, //right side view
            6, 5, 1, 2, 6, 1




        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}