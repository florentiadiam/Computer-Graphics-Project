import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyPlane } from '../MyPlane.js';
import { MyFlower } from './MyFlower.js';
/**
* MyGarden
* @constructor
 * @param scene - Reference to MyScene object
*/

//Math.random() * (max - min) + min;

export class MyGarden extends CGFobject {
	constructor(scene, numofFlowers) {
        super(scene);
        this.numofFlowers = numofFlowers;
        this.pos_x = [];
        this.pos_z = [];
        this.flowerSize = [];
        this.petalColor = [];
        this.stemColor = [];
        this.circleColor = [];
        this.leafColor = [];
        this.petalRadius = [];
        this.petalNumber = [];
        this.circleRadius = [];
        this.petalAngle1 = [];
        this.petalAngle2 = [];
        this.stemSize = [];
        this.stemRadius =[];
        this.flowers = [];
        for (let i = 0; i < numofFlowers; i++) {
            this.pos_x.push(Math.random() * (100 + 100) - 100);
            this.pos_z.push(Math.random() * (100 + 100) - 100);
            this.flowerSize.push(Math.random() * (7 -3) + 3);
            this.petalColor.push(Math.floor(Math.random() * 3));
            this.stemColor.push(Math.floor(Math.random() * 3));
            this.circleColor.push(Math.floor(Math.random() * 3));
            this.leafColor.push(Math.floor(Math.random() * 3));
            this.petalRadius.push(Math.floor(Math.random() * (10 -5) +5));
            this.petalNumber.push(Math.floor(Math.random() * (8 -4) +4));
            this.circleRadius.push(Math.random() * (2 -0.5) +0.5);
            this.petalAngle1.push(Math.random() * (Math.PI/6 + Math.PI/6) - Math.PI/6);
            this.petalAngle2.push(Math.random() * (Math.PI/6 + Math.PI/6) - Math.PI/6);
            this.stemSize.push(Math.floor(Math.random()* (15 - 1) + 1))
            this.stemRadius.push(Math.random()* (1.5 - 0.5) + 0.5)
        }

        for(let i = 0; i<numofFlowers; i++){
            this.flower = new MyFlower(this.scene, this.petalRadius[i], this.petalNumber[i], this.circleRadius[i], this.stemRadius[i], this.stemSize[i], this.petalColor[i], this.stemColor[i], this.circleColor[i], -Math.PI / 6, this.petalAngle1[i], this.petalAngle2[i], this.leafColor[i]);
            this.flowers.push(this.flower);
        }

        this.plane = new MyPlane(this.scene,30);

        this.groundMaterial = new CGFtexture(this.scene, "images/ground.jpg");
        this.groundMaterial1 = new CGFappearance(this.scene);
        this.groundMaterial1.setTexture(this.groundMaterial);
        this.groundMaterial1.setTextureWrap('REPEAT', 'REPEAT');
	}

    display(){

        for (let i = 0; i < this.numofFlowers-1; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.pos_x[i], 0, this.pos_z[i]);
            this.scene.scale(0.1, 0.1, 0.1);
            this.scene.scale(this.flowerSize[i], this.flowerSize[i], this.flowerSize[i])
            this.scene.translate(0, this.stemSize[i]+6,0);
            this.flowers[i].display();
            //this.flowers[i].getCentre();
            this.scene.popMatrix();
        }
    }
}


