import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene)
        this.texture=texture;
        this.initBuffers();
    }

    initBuffers(){
        this.sphere = new MySphere(this.scene, 200, 200,true)
        this.material = new CGFappearance(this.scene)
        this.material.setTexture(this.texture)
   
    }

    display() {
        this.scene.pushMatrix()
        this.material.apply()
        
        if (this.scene.infinitePanorama)
            this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])

        this.sphere.display()
        this.scene.popMatrix()
    }
}
