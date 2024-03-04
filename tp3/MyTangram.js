import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.parallelogram= new MyParallelogram(this.scene);
    this.trianglesmall= new MyTriangleSmall(this.scene);
    this.trianglebig= new MyTriangleBig(this.scene);
	}

	display() {
    var DiamondScale=[
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]

    var DiamondTran=[
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.5, 2*Math.sqrt(2)+1,  0.0,  1.0
    ]

    //Diamond
    this.scene.pushMatrix();
    this.scene.multMatrix(DiamondTran);
    this.scene.multMatrix(DiamondScale);
    this.scene.diamond.display();
    this.scene.popMatrix();
    

    //blue triangle
    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4,0,0,1);
    this.scene.trianglebig.display();
    this.scene.popMatrix();
    
    //orange triangle
    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2),Math.sqrt(2),0);
    this.scene.rotate(Math.PI/4,0,0,1);
    //this.scene.materials[1].apply();
    this.scene.trianglebig.display();
    this.scene.popMatrix();
    
    //pink triangle
    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2), -Math.sqrt(2) ,0.0);
    this.scene.rotate(3*Math.PI/4,0,0,1);
    //this.scene.materials[2].apply();
    this.scene.triangle.display();
    this.scene.popMatrix();
    
    //Red Triangle
    this.scene.pushMatrix();
    this.scene.translate(1.8,-3.45,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    //this.scene.materials[3].apply();
    this.scene.trianglesmall.display();
    this.scene.popMatrix();
    
    //Purple triangle
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), -2.12,0.0);
    this.scene.rotate(Math.PI/4,0,0,1);
    //this.scene.materials[4].apply();
    this.scene.trianglesmall.display();
    this.scene.popMatrix();
    
    //Paralilogramo Yellow
    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4,0,0,1);
    this.scene.scale(-1,1,1);
    this.scene.translate(2, 0, 0 );
    //this.scene.materials[5].apply();
    this.scene.parallelogram.display();
    this.scene.popMatrix();
    }
    
    initBuffers() {
      this.display();
      this.initGLBuffers();
    }

}
