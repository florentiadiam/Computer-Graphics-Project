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
        this.quad= new MyQuad(this);

        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(0,0,0.5))
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(0,0,-0.5))
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(0.5,0,0))
        this.scene.multMatrix(RotationMatrixY(Math.PI/2))
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(-0.5,0,0))
        this.scene.multMatrix(RotationMatrixY(Math.PI/2))
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(0,0.5,0))
        this.scene.multMatrix(RotationMatrixX(Math.PI/2))
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(TransformationMatrix(0,-0.5,0))
        this.scene.multMatrix(RotationMatrixX(Math.PI/2))
        this.quad.display();
        this.scene.popMatrix();
	}
}

