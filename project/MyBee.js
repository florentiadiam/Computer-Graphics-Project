import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
	constructor(scene, abdoment_color,legs_color,wings_color) {
		super(scene,abdoment_color,legs_color,wings_color);
        this.abdoment_color=abdoment_color;
        this.legs_color=legs_color;
        this.wings_color=wings_color;

        this.abdomen = new MySphere(this.scene, 50,50,false);
      
        this.initMaterials();
	}

    initMaterials() {
        this.petalMaterial_red = new CGFappearance(this.scene);
        this.petalMaterial_red.setAmbient(1, 0, 0, 1.0);
        this.petalMaterial_red.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_red.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_red.setShininess(5.0);

    }
	
	display() {
        /*
        this.scene.pushMatrix();
        this.scene.scale(this.circle_radius,this.circle_radius,this.circle_radius)
        this.circleMaterials[this.circle_color].apply();
        this.receptacle.display();
        this.scene.popMatrix();
        */
       this.abdomen.display();
        

            }
        }
        
    
	