import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';
import { MyStem } from '../MyStem.js';
import { MyLegs } from './MyLegs.js';
import { MyWings } from './MyWings.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, 50, 10, false);
        this.wings = new MyWings(this.scene);
        this.legs = new MyLegs(this.scene);
        this.sting = new MyStem(this.scene,50,6);
        this.initMaterials();
    }
    initMaterials() {
        this.blackcolor = new CGFappearance(this.scene);
        this.blackcolor.setAmbient(0, 0, 0, 1.0); 
        this.blackcolor.setDiffuse(0, 0, 0, 1.0); 
        this.blackcolor.setSpecular(0, 0, 0, 1.0); 
        this.blackcolor.setShininess(5.0); 

        // Set the texture for body
        this.appearance = new CGFappearance(this.scene);
        this.beebodytexture = new CGFtexture(this.scene, "images/beebody2.jpg");
        this.appearance.setTexture(this.beebodytexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.appearance.setShininess(5.0);

        // Set the texture for head
        this.appearance1 = new CGFappearance(this.scene);
        this.beeheadtexture = new CGFtexture(this.scene, "images/head2.png");
        this.appearance1.setTexture(this.beeheadtexture);
        this.appearance1.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance1.setAmbient(1, 1, 1, 1.0);
        this.appearance1.setDiffuse(1, 1, 1, 1.0);
        this.appearance1.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.appearance1.setShininess(5.0);

         // Set the texture for eyes
         this.appearance2 = new CGFappearance(this.scene);
         this.beeeyestexture = new CGFtexture(this.scene, "images/beeeyes2.jpg");
         this.appearance2.setTexture(this.beeeyestexture);
         this.appearance2.setTextureWrap('REPEAT', 'REPEAT');
         this.appearance2.setAmbient(1, 1, 1, 1.0);
         this.appearance2.setDiffuse(1, 1, 1, 1.0);
         this.appearance2.setSpecular(0.1, 0.1, 0.1, 1.0);
         this.appearance2.setShininess(5.0);

         // Set the texture for wings
         this.appearance3 = new CGFappearance(this.scene);
         this.beewingstexture = new CGFtexture(this.scene, "images/wingscolor.png");
         this.appearance3.setTexture(this.beewingstexture);
         this.appearance3.setTextureWrap('REPEAT', 'REPEAT');
         this.appearance3.setAmbient(1, 1, 1, 1.0);
         this.appearance3.setDiffuse(1, 1, 1, 1.0);
         this.appearance3.setSpecular(0.1, 0.1, 0.1, 1.0);
         this.appearance3.setShininess(5.0);
     
    }

    display(){
        //Head
        this.scene.pushMatrix();
        this.appearance1.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Body
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0)
        this.scene.scale(1,2,0.8);
        this.scene.translate(0,-1,0)
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

 
    

        //Legs1
        this.scene.pushMatrix();
        this.scene.translate(0,0,-1.3);
        this.blackcolor.apply();
        this.legs.display();
        this.scene.popMatrix();

        //Legs2
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2.3);
        this.blackcolor.apply();
        this.legs.display();
        this.scene.popMatrix();

        //Legs3
        this.scene.pushMatrix();
        this.scene.translate(0,0,-3.3);
        this.blackcolor.apply();
        this.legs.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.7,0,0.7)
        this.scene.scale(0.3,0.3,0.3);
        this.appearance2.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.7,0,0.7);
        this.scene.scale(0.3,0.3,0.3);
        this.sphere.display();
        this.scene.popMatrix();

        //Sting
        this.scene.pushMatrix();
        this.blackcolor.apply()
        this.scene.translate(0,0,-4.2);
        this.scene.scale(0.2,0.2,0.2);
        this.sting.display();
        this.scene.popMatrix();

        //wings
        this.scene.pushMatrix();
         //this.appearance3.apply()
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.colorMask(true, true, true, true); // Enable writing to alpha channel
         this.gl.uniform4f(uColorLocation, r, g, b, a); // Set color with alpha
        this.wings.display();
        this.scene.popMatrix();
    }
}