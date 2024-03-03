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
            0.5, -0.5, 0.5,                  //Α0 Ar
            0.5, -0.5, -0.5,                 //Α1 Br
            0.5, 0.5, 0.5,                   //Α2 Cr
            0.5, 0.5, -0.5,                  //Α3 Dr
            0.5, -0.5, -0.5,                 //Α4 Bb
            -0.5,- 0.5,- 0.5,                //Α5 Eb
            0.5, 0.5, -0.5,                  //Α6 Db
            -0.5, 0.5, -0.5,                 //Α7 Gb
            -0.5,- 0.5, 0.5,                 //Α8 Ff
            0.5, -0.5, 0.5,                  //Α9 Af
            -0.5, 0.5, 0.5,                  //Α10 Hf
            0.5, 0.5, 0.5,                   //Α11 Cf
            -0.5, 0.5,  0.5,                 //Α12 Hl
            -0.5, 0.5, -0.5,                 //Α13 Gl
            -0.5, -0.5, 0.5,                 //Α14 Fl
            -0.5, -0.5, -0.5,                //Α15 El
            0.5, 0.5, 0.5,                   //Α16 Cu
            0.5, 0.5, -0.5,                  //Α17 Du
            -0.5, 0.5, 0.5,                  //Α18 Hu
            -0.5, 0.5, -0.5,                 //Α19 Gu
            0.5, -0.5, -0.5,                 //Α20 Bd
            0.5, -0.5, 0.5,                  //Α21 Ad
            -0.5,- 0.5,- 0.5,                //Α22 Ed
            -0.5,- 0.5, 0.5,                 //Α23 Fd
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            1, 3, 2,            //right side view
            4, 5, 6,
            5, 7, 6,            //backface(πισω οψη)
            8, 9, 10,
            9, 11, 10,          //facade, (προσωψη)
            12, 13, 14,
            13, 15, 14,           //left side view
            16, 17, 18,
            17, 19, 18,         //landing (κατωψη)
            20, 21, 22,
            21, 23, 22          //rise (ανωψη)
        ];


        this.normals=[
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
            0, 0,-1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0,-1, 0,
            0,-1, 0,
            0,-1, 0,
            0,-1, 0,
        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}