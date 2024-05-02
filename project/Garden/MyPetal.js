import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene,angle) {
		super(scene,angle);
		this.triangle = new MyTriangle(this.scene);
		this.angle = angle;
	}
	
	display(){
		this.scene.pushMatrix();
        this.triangle.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0)
        this.triangle.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
		this.scene.rotate(this.angle,1,0,0);
        this.triangle.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,0,1);
		this.scene.rotate(this.angle,1,0,0);
		this.scene.rotate(Math.PI,1,0,0)
        this.triangle.display();
        this.scene.popMatrix();
	}
}
