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
//   initMaterials() {
//     //Green Diamond
//     this.material1 = new CGFappearance(this);
//     this.material1.setAmbient(0, 1, 0, 1.0);
//     this.material1.setDiffuse(0, 1, 0, 1.0);
//     this.material1.setSpecular(0.5, 1, 0.5, 1.0);
//     this.material1.setShininess(10.0);

//     // Orange Triangle
//     this.material2 = new CGFappearance(this);
//     this.material2.setAmbient(1, 0.5, 0, 1.0);
//     this.material2.setDiffuse(1, 0.5, 0, 1.0);
//     this.material2.setSpecular(1, 0.8, 0, 1.0);
//     this.material2.setShininess(10.0);

//     // Pink
//     tthis.material3 = new CGFappearance(this);
//     this.material3.setAmbient(1, 0.5, 0.5, 1.0);
//     this.material3.setDiffuse(1, 0.5, 0.5, 1.0);
//     this.material3.setSpecular(1, 0.8, 0.8, 1.0);
//     this.material3.setShininess(10.0);
    

//     //Red
//     this.material4 = new CGFappearance(this);
//     this.material4.setAmbient(1, 0, 0, 1.0);
//     this.material4.setDiffuse(1, 0, 0, 1.0);
//     this.material4.setSpecular(1, 0.8, 0.8, 1.0);
//     this.material4.setShininess(10.0);

//     //Purple
//     this.material5 = new CGFappearance(this);
//     this.material5.setAmbient(0.5, 0, 0.5, 1.0);
//     this.material5.setDiffuse(0.5, 0, 0.5, 1.0);
//     this.material5.setSpecular(0.8, 0.8, 1, 1.0);
//     this.material5.setShininess(10.0);

//     //Yellow
//     this.material6 = new CGFappearance(this);
//     this.material6.setAmbient(1, 1, 0, 1.0);
//     this.material6.setDiffuse(1, 1, 0, 1.0);
//     this.material6.setSpecular(1, 1, 0, 1.0);
//     this.material6.setShininess(10.0);




//     this.materials = [this.material1, this.material2, this.material3,this.material4,this.material5,this.material6];
// }
 
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
    //this.scene.materials[0].apply();
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
