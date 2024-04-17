import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene,petal_r, petal_num, circle_r, stem_r, stem_s, petal_c1, petal_c2, petal_c3,
                stem_c1, stem_c2, stem_c3, circle_c1, circle_c2, circle_c3, petal_angle) {
		super(scene,petal_r, petal_num, circle_r, stem_r, stem_s, petal_c1, petal_c2, petal_c3,
                stem_c1, stem_c2, stem_c3, circle_c1, circle_c2, circle_c3,  petal_angle);
        this.petal_r = petal_r;
        this.petal_num = petal_num;
        this.circle_r = circle_r;
        this.stem_r = stem_r;
        this.stem_s = stem_s;
        this.petal_c1 = petal_c1;
        this.petal_c2 = petal_c2;
        this.petal_c3 = petal_c3;
        this.stem_c1 = stem_c1;
        this.stem_c2 = stem_c2;
        this.stem_c3 = stem_c3;
        this.circle_c1 = circle_c1;
        this.circle_c2 = circle_c2;
        this.circle_c3 = circle_c3;
        this.petal_angle = petal_angle;
        this.petal = new MyPetal(this.scene, this.petal_angle);
        this.stem = new MyStem(this.scene,20,10);
        this.receptacle = new MyReceptacle(this.scene,100,10);
        //this.leaf = new MyLeaf(this,1,0,0);
        this.initMaterials();
        this.enableNormalViz();
        this.disableNormalViz();
	}

    initMaterials() {
        // Green material for diamond
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setAmbient(this.petal_c1, this.petal_c2, this.petal_c3, 1.0);
        this.petalMaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial.setShininess(5.0);

        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(this.stem_c1, this.stem_c2, this.stem_c3, 1.0);
        this.stemMaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial.setShininess(5.0);
        
        this.circleMaterial = new CGFappearance(this.scene);
        this.circleMaterial.setAmbient(this.circle_c1, this.circle_c2, this.circle_c3, 1.0);
        this.circleMaterial.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial.setShininess(5.0);
    }
	
	display() {
        //Receptacle
        this.scene.pushMatrix();
        this.scene.scale(this.circle_r,this.circle_r,this.circle_r)
        this.circleMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();
        

        //Stem
        this.scene.pushMatrix();
        this.scene.scale(this.stem_r, this.stem_s, this.stem_r)
        this.scene.rotate(Math.PI/2,1,0,0)
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
        
        //Petals
        for(var i=Math.PI/4; i<=7*Math.PI/4; i+=3*Math.PI/(2*this.petal_num)){
            this.scene.pushMatrix();
            this.scene.scale(this.petal_r/4,this.petal_r/4,1);
            this.scene.rotate(i,0,0,1);
            this.scene.translate(0,-(this.petal_r/2) / (this.petal_r / 5) ,0)
            this.petalMaterial.apply();
            this.petal.display();
            this.scene.popMatrix();
        }
	}

    enableNormalViz(){
        //this.petal.enableNormalViz();
        this.stem.enableNormalViz();
      }
  
      disableNormalViz(){
        //this.petal.disableNormalViz();
        this.stem.disableNormalViz();
      }
}
