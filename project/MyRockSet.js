import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene); 

        this.scene = scene;
        this.RockAngle = [];
        this.RockScale = [];
        this.RockPos_x = [];
        this.RockPos_y = [];
        this.numRocks = Math.random() * (20 - 5) + 5;
        for (var i = 0; i <= this.numRocks; i++) {
            this.RockScale.push(Math.random() * (1 - 0.5) + 0.5);
            this.RockAngle.push(Math.random() * (Math.PI / 4 + Math.PI / 4)-Math.PI / 4);
            this.RockPos_x.push(Math.random()*(15+15)-15)
            this.RockPos_y.push(Math.random()*(15+15)-15)
        }
        this.plane = new MyPlane(this.scene,30);
        this.initMaterials();
    }
    initMaterials(){
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.rockMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rockMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.rockMaterial.setShininess(10.0);
        this.rockMaterial.loadTexture("images/rock.jpg");
        this.rockMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.terainMaterial = new CGFappearance(this.scene);
        this.terainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terainMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.terainMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.terainMaterial.setShininess(10.0);
        this.terainMaterial.loadTexture("images/grass.jpg");
        this.terainMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.scene.pushMatrix();
        this.terainMaterial.apply();
        this.scene.scale(30, 30, 30);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();
            this.rockMaterial.apply();
            this.scene.translate(this.RockPos_x[i],0.4,this.RockPos_y[i]);
            this.scene.scale(this.RockScale[i], this.RockScale[i], this.RockScale[i]);
            this.scene.rotate(this.RockAngle[i], 0, 0, 1);
            this.rock = new MyRock(this.scene, 10, 10, false);
            this.rock.display();
            this.scene.popMatrix();
        }
    }
}
