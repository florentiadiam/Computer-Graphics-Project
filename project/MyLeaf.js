import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene,color1,color2,color3) {
		super(scene,color1,color2,color3);
		this.triangle1 = new MyTriangle(this.scene);
		this.cylinder = new MyStem(this.scene, 100, 5);
        this.color1 =color1;
        this.color2 =color2;
        this.color3 =color3;
        this.initMaterials();
	}

    initMaterials() {
        // Green material for diamond
        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(this.color1, this.color2, this.color3, 1.0);
        this.leafMaterial.setDiffuse(0, 1, 0, 1.0);
        this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.leafMaterial.setShininess(10.0);
    }
	
	
	display(){
		this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,1)
        this.leafMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,1)
        this.scene.rotate(Math.PI/2,0,0,1)
        this.scene.translate(1,0,0)
        this.leafMaterial.apply();
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,1)
        this.scene.rotate(-Math.PI/2,0,0,1)
        this.scene.translate(-1,0,0)
        this.triangle1.display();
        this.leafMaterial.apply();
        this.scene.popMatrix();
	}
}
