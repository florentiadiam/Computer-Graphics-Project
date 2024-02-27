import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
	}
  
  TransformationMatrix(Tx,Ty,Tz){
    return [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    Tx,  Ty,  Tz,  1.0,
    ];
  }
    
  
  RotationMatrix(a){
    return [
      Math.cos(a), Math.sin(a), 0.0, 0.0,
      -Math.sin(a), Math.cos(a), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ];
  }

  ScalingMatrix(Sx,Sy,Sz){
    return[
      Sx, 0, 0, 0,
      0, Sy, 0, 0,
      0, 0, Sz, 0,
      0, 0, 0, 1
    ];
  }
   



	display() {
        this.diamond = new MyDiamond(this);
        this.triangle = new MyTriangle(this);
        this.parallelogram= new MyParallelogram(this);

    
        this.scene.pushMatrix();
        this.scene.multMatrix(ScalingMatrix(2,2,0));
        this.scene.multMatrix(RotationMatrix(Math.PI/2));
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(2,2,0));
        this.scene.multMatrix(ScalingMatrix(2,2,0));
        this.scene.multMatrix(RotationMatrix(-Math.PI/2));
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(1, 5.0, 0.0));
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(2.0, -2.0 ,0.0));
        this.scene.multMatrix(ScalingMatrix(Math.sqrt(2),Math.sqrt(2),0));
        this.scene.multMatrix(RotationMatrix(3*Math.PI/4));
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(2.5, -4.9 ,0.0));
        this.scene.multMatrix(RotationMatrix(-Math.PI/4));
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(-2, -3 ,0.0));
        this.scene.multMatrix(RotationMatrix(-Math.PI/2));
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(5.4, 4 ,0.0));
        this.scene.multMatrix(ScalingMatrix(-1,1,1))
        this.scene.multMatrix(RotationMatrix(-Math.PI/4));
        this.parallelogram.display();
        this.scene.popMatrix();
        }
      }
