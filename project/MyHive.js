import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';


/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
        this.cube = new MyUnitCubeQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
	}

    initMaterials() {
        this.texturewood = new CGFtexture(this.scene, "images/wood.jpg");
        this.appearancewood = new CGFappearance(this.scene);
        this.appearancewood.setTexture(this.texturewood);
        this.appearancewood.setTextureWrap('REPEAT', 'REPEAT');

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1.0);
        this.red.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.red.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.red.setShininess(5.0);
    }
	
	display() {
        this.appearancewood.apply();
        //Upface
        this.scene.pushMatrix();
        this.scene.scale(5,0.2,4);
        this.scene.translate(0,10,0);
        this.cube.display();
        this.scene.popMatrix();

        //DownFace
        this.scene.pushMatrix();
        this.scene.scale(5,0.2,4);
        this.scene.translate(0,-10,0);
        this.cube.display();
        this.scene.popMatrix();

        //backFace
        this.scene.pushMatrix();
        this.scene.scale(5,4,0.2);
        this.scene.translate(0,0,-10);
        this.cube.display();
        this.scene.popMatrix();

        //RightFace
        this.scene.pushMatrix();
        this.scene.scale(0.2,4,4);
        this.scene.translate(12,0,0);
        this.cube.display();
        this.scene.popMatrix();
        
        //LeftFace
        this.scene.pushMatrix();
        this.scene.scale(0.2,4,4);
        this.scene.translate(-12,0,0);
        this.cube.display();
        this.scene.popMatrix();

        //front face
        this.scene.pushMatrix();
        this.scene.scale(5,3.5,0.2);
        this.scene.translate(0,-0.1,10);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2,0.5,0.2);
        this.scene.translate(-0.7,3.3,10);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2,0.5,0.2);
        this.scene.translate(0.7,3.3,10);
        this.cube.display();
        this.scene.popMatrix();

        //skepi
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.scale(3.5,0.2,4);
        this.scene.translate(0,15,0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.scale(3.5,0.2,4);
        this.scene.translate(0,15,0);
        this.cube.display();
        this.scene.popMatrix();

        this.red.apply();

        this.scene.pushMatrix();
        this.scene.translate(0,2,1.8);
        this.scene.scale(2.5,0.8,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,2,-1.8);
        this.scene.scale(2.5,0.8,1);
        this.scene.rotate(Math.PI,0,1,0)
        this.triangle.display();
        this.scene.popMatrix();
    }
}
