import { CGFobject } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene,angle) {
		super(scene,angle);
		this.triangle1 = new MyTriangle(this.scene);
		this.triangle2 = new MyTriangle(this.scene);
		this.angle = angle;
	}
	
	display(){
		this.scene.pushMatrix();
        this.triangle1.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
		this.scene.rotate(this.angle,1,0,0);
        this.triangle2.display();
        this.scene.popMatrix();
	}
}
