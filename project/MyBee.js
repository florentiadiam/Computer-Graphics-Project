import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 50, 10,false);
    }

    display(){
        // this.scene.pushMatrix();
        // this.sphere.display();
        // this.scene.popMatrix();

        // this.scene.pushMatrix();
        // this.scene.scale(1,0.8,2);
        // this.scene.translate(0,0,-1)
        // this.sphere.display();
        // this.scene.popMatrix();

        this.scene.pushMatrix();
        this.sphere.display();
        this.scene.popMatrix();




    }
}
