import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../MyTriangle.js';
import { MyStem } from './MyStem.js';
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
	}
	
	display(){
		this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,1)
        this.cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,1)
        this.scene.rotate(Math.PI/2,0,0,1)
        this.scene.translate(1,0,0)
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,1)
        this.scene.rotate(-Math.PI/2,0,0,1)
        this.scene.translate(-1,0,0)
        this.triangle1.display();
        this.scene.popMatrix();
	}
}
