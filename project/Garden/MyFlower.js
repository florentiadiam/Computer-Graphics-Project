import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyPollen } from './MyPollen.js';
import { MyLeaf } from './MyLeaf.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';


/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene,petal_r, petal_num, circle_radius, stem_radius, stem_size, petal_color,
                stem_color, circle_color, petal_angle1, petal_angle2, stem_angle, leaf_color) {
		super(scene);
        this.petal_r = petal_r;
        this.petal_num = petal_num;
        this.circle_radius = circle_radius;
        this.stem_radius = stem_radius; 
        this.stem_size = stem_size; 
        this.petal_color = petal_color;
        this.stem_color = stem_color;
        this.circle_color = circle_color;
        this.petal_angle1 = petal_angle1; 
        this.petal_angle2 = petal_angle2; 
        this.leaf_color = leaf_color;
        this.stem_angle = stem_angle; 
        this.petal = new MyPetal(this.scene, this.petal_angle1);
        this.stem = new MyStem(this.scene,20,10);
        this.receptacle = new MyReceptacle(this.scene,100,10);
        this.leaf = new MyLeaf(this.scene, 1, 0, 0);
        this.pollen = new MyPollen(this.scene);
        this.initMaterials();
	}

    initMaterials() {
        this.petalMaterial_red = new CGFappearance(this.scene);
        this.petalMaterial_red.setAmbient(1, 0, 0, 1.0);
        this.petalMaterial_red.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_red.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_red.setShininess(5.0);

        this.petalMaterial_pink = new CGFappearance(this.scene);
        this.petalMaterial_pink.setAmbient(1, 0, 1, 1.0);
        this.petalMaterial_pink.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_pink.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_pink.setShininess(5.0);

        this.petalMaterial_blue = new CGFappearance(this.scene);
        this.petalMaterial_blue.setAmbient(0, 0, 1, 1.0);
        this.petalMaterial_blue.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_blue.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.petalMaterial_blue.setShininess(5.0);

        this.petalMaterials= [this.petalMaterial_red, this.petalMaterial_pink, this.petalMaterial_blue];

        this.stemMaterial1 = new CGFappearance(this.scene);
        this.stemMaterial1.setAmbient(0, 1, 0, 1.0);
        this.stemMaterial1.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial1.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial1.setShininess(5.0);

        this.stemMaterial2 = new CGFappearance(this.scene);
        this.stemMaterial2.setAmbient(0.007, 0.22, 0.02, 1.0);
        this.stemMaterial2.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial2.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial2.setShininess(5.0);
        
        this.stemMaterial3 = new CGFappearance(this.scene);
        this.stemMaterial3.setAmbient(0.4, 0.96, 0.44, 1.0);
        this.stemMaterial3.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial3.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.stemMaterial3.setShininess(5.0);

        this.stemMaterials= [this.stemMaterial1, this.stemMaterial2, this.stemMaterial3];
        
        this.circleMaterial1 = new CGFappearance(this.scene);
        this.circleMaterial1.setAmbient(0.94, 1, 0, 1.0);
        this.circleMaterial1.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial1.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial1.setShininess(5.0);

        this.circleMaterial2 = new CGFappearance(this.scene);
        this.circleMaterial2.setAmbient(0.3, 0.14, 0.007, 1.0);
        this.circleMaterial2.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial2.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial2.setShininess(5.0);

        this.circleMaterial3 = new CGFappearance(this.scene); 
        this.circleMaterial3.setAmbient(0.4, 0.96, 0.44, 1.0);
        this.circleMaterial3.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial3.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.circleMaterial3.setShininess(5.0);

        this.circleMaterials=[this.circleMaterial1, this.circleMaterial2, this.circleMaterial3];

    }
	
	display() {
        //Receptacle
        this.scene.pushMatrix();
        this.scene.scale(this.circle_radius,this.circle_radius,this.circle_radius)
        this.circleMaterials[this.circle_color].apply();
        this.receptacle.display();
        this.scene.translate(0,0,1)
        this.pollen.display()
        this.scene.popMatrix();
        

        //Stem
        this.scene.pushMatrix();
        this.scene.scale(this.stem_radius, 1, this.stem_radius);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.stemMaterials[this.stem_color].apply();
        this.stem.display();
        this.scene.popMatrix();
        
        for(let j=0; j<=this.stem_size; j++){
            this.scene.pushMatrix();
            this.scene.scale(this.stem_radius, 1, this.stem_radius);
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.translate(0,0,j+3);
            this.stemMaterials[this.stem_color].apply();
            this.stem.display();
            this.scene.popMatrix();
            if(j<this.stem_size-9){
                this.scene.pushMatrix();
                this.scene.translate(0,j-20,0);
                this.scene.translate(0,j*2,0);
                this.scene.rotate(Math.PI/6,0,0,1);
                this.stemMaterials[this.leaf_color].apply();
                this.leaf.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.translate(0,j-19,0);
                this.scene.translate(0,j*2,0);
                this.scene.rotate(-Math.PI/6,0,0,1);
                this.stemMaterials[this.leaf_color].apply();
                this.leaf.display();
                this.scene.popMatrix();
            }
        }
        
        //Petals
        for(var i=Math.PI/4; i<=7*Math.PI/4; i+=3*Math.PI/(2*this.petal_num)){
            this.scene.pushMatrix();
            this.scene.scale(this.petal_r/4,this.petal_r/4,1);
            this.scene.rotate(i,0,0,1);
            this.scene.rotate(this.petal_angle2, 1, 0, 0);
            this.scene.translate(0,-(this.petal_r/2) / (this.petal_r / 5) ,0)
            this.petalMaterials[this.petal_color].apply();
            this.petal.display();
            this.scene.popMatrix();
        }
        //pollen
        // this.scene.pushMatrix();
        // this.scene.translate(0,0,-this.circle_radius+2);
        // this.pollen.display();
        // this.scene.popMatrix();

      
	}

    getCentrePollen(){
       
     this.pollen.x = this.circle_radius; 
     this.pollen.y = this.circle_radius; 
     this.pollen.z = this.circle_radius; 
        
     }
    
 // NearestFlower(){
  //   //calculating the displacement dx from the pollen to the b
  //  let dx=this.flower.getCentrePollen.x-this.bee.x
  //  let dy=this.flower.getCentrePollen.y-this.bee.y
  //  let dz=this.flower.getCentrePollen.z-this.bee.z
    
  //  console.log("dx in myBee:", dx);
  //   //calculating the distance according to Pythagorean theorem
  
  //   let d=Math.sqrt(dx^2+dy^2+dz^2)
  
  //   //initalizing the distances
  //   let nearestflower 
  //   let nearestdistance=Infinity 
  
  //   //if closest distance is bigger than the distance of the nearest flower then nearest distance is equal to distance and nearest flower equals to pollen
  //   if(nearestdistance>nearestflower){
  //       nearestdistance=d
  //       nearestflower=this.flower.getCentrePollen
  //   }
  //   return nearestflower
  // }
}
