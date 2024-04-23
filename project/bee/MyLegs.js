import { CGFobject } from '../../lib/CGF.js';
import { MyStem } from '../MyStem.js';

export class MyLegs extends CGFobject {
    constructor(scene) {
        super(scene);
        this.legs = new MyStem(this.scene, 50, 20);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0)
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0)
        this.legs.display();
        this.scene.popMatrix();
    }
}
