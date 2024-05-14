import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';


/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPollen extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
        this.pollen = new MySphere(this.scene,50,50,false);
	}

    initMaterials() {
        this.texturepollen = new CGFtexture(this.scene, "images/pollentexture.jpg");
        this.appearancepollen = new CGFappearance(this.scene);
        this.appearancepollen.setTexture(this.texturepollen);
        this.appearancepollen.setTextureWrap('REPEAT', 'REPEAT');
    }
	
	display() {
        this.x=0;
        this.y=0;
        this.z=0;
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.8,0.5);
        this.appearancepollen.apply();
        this.pollen.display();
        this.scene.popMatrix();
    }
}
