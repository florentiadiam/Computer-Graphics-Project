import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from '../MyTriangle.js';

export class MyWings extends CGFobject {
    constructor(scene) {
        super(scene);
        this.wing = new MyTriangle(this.scene);

    }
    display(){
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5)
        this.scene.scale(-1,-1,-1)
        this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.translate(-1,-2,1)
        this.scene.rotate(-Math.PI/6,1,0,0)
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5)
        this.scene.scale(-1,-1,-1)
        this.scene.rotate(-Math.PI/2,0,1,0)
        this.scene.translate(1,-2,-1)
        this.scene.rotate(Math.PI/6,1,0,0)
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5)
        this.scene.scale(-1,-1,-1)
        this.scene.rotate(Math.PI/2,0,1,0)
        this.scene.translate(-1,-2,-1)
        this.scene.rotate(Math.PI/6,1,0,0)
        this.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5)
        this.scene.scale(-1,-1,-1)
        this.scene.rotate(-Math.PI/2,0,1,0)
        this.scene.translate(1,-2,1)
        this.scene.rotate(-Math.PI/6,1,0,0)
        this.wing.display();
        this.scene.popMatrix();
    }
}
