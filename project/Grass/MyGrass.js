import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import {MyLeaves} from './MyLeaves.js'

/**
* MyGrass
* @constructor
 * @param scene - Reference to MyScene object
*/

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


