import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, topTexture, frontTexture, rightTexture, backTexture, leftTexture, bottomTexture, coords) {
		super(scene);
		this.initBuffers();
		this.initMaterials(topTexture, frontTexture, rightTexture, backTexture, leftTexture, bottomTexture);
		this.quad = new MyQuad(this.scene);
		if (coords !== undefined)
			this.updateTexCoords(coords);
	}
  initMaterials(topTexture, frontTexture, rightTexture, backTexture, leftTexture, bottomTexture) {
    this.topFace = new CGFappearance(this.scene);
    this.topFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.topFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.topFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.topFace.setShininess(10.0);
    this.topFace.loadTexture(topTexture);
    this.topFace.setTextureWrap('REPEAT', 'REPEAT');

    this.rightFace = new CGFappearance(this.scene);
    this.rightFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.rightFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.rightFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.rightFace.setShininess(10.0);
    this.rightFace.loadTexture(rightTexture);
    this.rightFace.setTextureWrap('REPEAT', 'REPEAT');

    this.leftFace = new CGFappearance(this.scene);
    this.leftFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.leftFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.leftFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.leftFace.setShininess(10.0);
    this.leftFace.loadTexture(leftTexture);
    this.leftFace.setTextureWrap('REPEAT', 'REPEAT');

    this.frontFace = new CGFappearance(this.scene);
    this.frontFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.frontFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.frontFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.frontFace.setShininess(10.0);
    this.frontFace.loadTexture(frontTexture);
    this.frontFace.setTextureWrap('REPEAT', 'REPEAT');

    this.backFace = new CGFappearance(this.scene);
    this.backFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.backFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.backFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.backFace.setShininess(10.0);
    this.backFace.loadTexture(backTexture);
    this.backFace.setTextureWrap('REPEAT', 'REPEAT');

    this.bottomFace = new CGFappearance(this.scene);
    this.bottomFace.setAmbient(0.1, 0.1, 0.1, 1);
    this.bottomFace.setDiffuse(0.9, 0.9, 0.9, 1);
    this.bottomFace.setSpecular(0.1, 0.1, 0.1, 1);
    this.bottomFace.setShininess(10.0);
    this.bottomFace.loadTexture(bottomTexture);
    this.bottomFace.setTextureWrap('REPEAT', 'REPEAT');

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
        this.frontFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.backFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.rightFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.leftFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.topFace.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.bottomFace.apply();
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

