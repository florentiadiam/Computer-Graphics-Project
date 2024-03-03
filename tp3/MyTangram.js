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
<<<<<<< HEAD

    this.currentColor = [1.0, 1.0, 1.0, 1.0];

    setColor(r, g, b, a) {
      this.currentColor = [r, g, b, a];
      this.scene.setDiffuse(this.currentColor[0], this.currentColor[1], this.currentColor[2], this.currentColor[3]);
      this.scene.setAmbient(this.currentColor[0], this.currentColor[1], this.currentColor[2], this.currentColor[3]);
  }

  
=======
>>>>>>> 346f0f44a2658aa6cf13400706e1587cb24c3dc5
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
    this.setColor(1.0, 0.0, 0.0, 1.0);
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
    this.scene.trianglebig.display();
    this.scene.popMatrix();
    
    //pink triangle
    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2), -Math.sqrt(2) ,0.0);
    this.scene.rotate(3*Math.PI/4,0,0,1);
    this.scene.triangle.display();
    this.scene.popMatrix();
    
    //Red Triangle
    this.scene.pushMatrix();
    this.scene.translate(1.8,-3.45,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.scene.trianglesmall.display();
    this.scene.popMatrix();
    
    //Purple triangle
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), -2.12,0.0);
    this.scene.rotate(Math.PI/4,0,0,1);
    this.scene.trianglesmall.display();
    this.scene.popMatrix();
    
    //Paralilogramo
    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4,0,0,1);
    this.scene.scale(-1,1,1);
    this.scene.translate(2, 0, 0 );
    
    this.scene.parallelogram.display();
    this.scene.popMatrix();
    }

}
