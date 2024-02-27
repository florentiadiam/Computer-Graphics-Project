import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
    this.quad=new MyQuad(this.scene);
	}
	
    TransformationMatrix(Tx,Ty,Tz){
        return [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        Tx,  Ty,  Tz,  1.0,
        ];
    }
        
    RotationMatrixY(a){
        return [
          Math.cos(a), 0.0, -Math.sin(a), 0.0,
          0.0, 1.0, 0.0, 0.0,
          Math.sin(a), 0.0, Math.cos(a), 0.0,
          0.0, 0.0, 0.0, 1.0
        ];
      }
      
    RotationMatrixX(a){
        return [
          1.0, 0.0, 0.0, 0.0,
          0.0, Math.cos(a), Math.sin(a), 0.0,
          0.0, -Math.sin(a), Math.cos(a), 0.0,
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
    var SquareScale=[
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
  ]

  var SquareTran=[
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0,  0.5,  1.0
  ]

        this.scene.pushMatrix();
        this.scene.multMatrix(SquareTran);
        this.scene.multMatrix(SquareScale);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.quad.display();
        this.scene.popMatrix();
        this.initGLBuffers();
	}
}

