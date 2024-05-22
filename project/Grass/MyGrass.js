import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import {MyLeaves} from './MyLeaves.js'

/**
* MyGarden
* @constructor
 * @param scene - Reference to MyScene object
*/

//Math.random() * (max - min) + min;

export class MyGrass extends CGFobject {
	constructor(scene, numofleaves) {
        super(scene);
        this.numofleaves = numofleaves;
        this.pos_x = [];
        this.pos_z = [];
        this.leaves = [];
        for (let i = 0; i < this.numofleaves; i++) {
            this.pos_x.push(Math.random() * (30 + 30) - 30);
            this.pos_z.push(Math.random() * (30 + 30) - 30);
            this.leaf = new MyLeaves(this.scene)
            this.leaves.push(this.leaf)
        }

        this.groundMaterial = new CGFtexture(this.scene, "images/ground.jpg");
        this.groundMaterial1 = new CGFappearance(this.scene);
        this.groundMaterial1.setTexture(this.groundMaterial);
        this.groundMaterial1.setTextureWrap('REPEAT', 'REPEAT');
	}

    display(){

        for (let i = 0; i <=this.numofleaves; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.pos_x[i], 0, this.pos_z[i]);
            this.leaf.display();
            this.scene.popMatrix();
        }
        this.x=0;
        this.y=0;
        this.z=0;
    }
}


