import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene,coords) {
		super(scene);
		this.initBuffers();
		this.initMaterials();
		this.quad = new MyQuad(this.scene);
		if (coords !== undefined)
			this.updateTexCoords(coords);
	}
  initMaterials() {
    

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
        // this.frontFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        // this.backFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        // this.rightFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        // this.leftFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        // this.topFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        // this.bottomFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        this.initGLBuffers();
	}

  /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

