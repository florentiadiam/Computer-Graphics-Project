import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleBig2 } from "./MyTriangleBig2.js";
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { MyTriangleSmall2 } from './MyTriangleSmall2.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.parallelogram= new MyParallelogram(this.scene);
    this.trianglesmall= new MyTriangleSmall(this.scene);
    this.trianglesmall2= new MyTriangleSmall2(this.scene);
    this.trianglebig= new MyTriangleBig(this.scene);
    this.trianglebig2= new MyTriangleBig2(this.scene);
    this.initMaterials();
    this.enableNormalViz();
    this.disableNormalViz();
    //this.enableTextures(true);
    
	}

  initMaterials() {
    // Green material for diamond
    this.greenMaterial = new CGFappearance(this.scene);
    this.greenMaterial.setAmbient(0, 1, 0, 1.0);
    this.greenMaterial.setDiffuse(0, 1, 0, 1.0);
    this.greenMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.greenMaterial.setShininess(10.0);

    // Blue material for big triangles
    this.blueMaterial = new CGFappearance(this.scene);
    this.blueMaterial.setAmbient(0, 0, 1, 1.0);
    this.blueMaterial.setDiffuse(0, 0, 1, 1.0);
    this.blueMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.blueMaterial.setShininess(10.0);

    // Orange material for big triangles
    this.orangeMaterial = new CGFappearance(this.scene);
    this.orangeMaterial.setAmbient(1, 0.5, 0, 1.0);
    this.orangeMaterial.setDiffuse(1, 0.5, 0, 1.0);
    this.orangeMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.orangeMaterial.setShininess(10.0);

    // Pink material for small triangles
    this.pinkMaterial = new CGFappearance(this.scene);
    this.pinkMaterial.setAmbient(1, 0, 1, 1.0);
    this.pinkMaterial.setDiffuse(1, 0, 1, 1.0);
    this.pinkMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.pinkMaterial.setShininess(10.0);

    // Red material for small triangles
    this.redMaterial = new CGFappearance(this.scene);
    this.redMaterial.setAmbient(1, 0, 0, 1.0);
    this.redMaterial.setDiffuse(1, 0, 0, 1.0);
    this.redMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.redMaterial.setShininess(10.0);

    // Purple material for small triangles
    this.purpleMaterial = new CGFappearance(this.scene);
    this.purpleMaterial.setAmbient(0.5, 0, 0.5, 1.0);
    this.purpleMaterial.setDiffuse(0.5, 0, 0.5, 1.0);
    this.purpleMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.purpleMaterial.setShininess(10.0);

    // Yellow material for parallelogram
    this.yellowMaterial = new CGFappearance(this.scene);
    this.yellowMaterial.setAmbient(1, 1, 0, 1.0);
    this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
    this.yellowMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.yellowMaterial.setShininess(10.0);

    //Diamond Texture Material
    this.diamondMaterial = new CGFappearance(this.scene);
    this.diamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.diamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.diamondMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.diamondMaterial.setShininess(10.0);
    this.diamondMaterial.loadTexture('images/tangram.png');
    //this.diamondMaterial.setTextureWrap('REPEAT', 'REPEAT');
}



	display() {

    debugger 

    var DiamondScale=[
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]

    var DiamondTran=[
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.5, 2*Math.sqrt(2)+1,  0.0,  1.0
    ]

    //Diamond green
    this.scene.pushMatrix();
    this.scene.multMatrix(DiamondTran);
    this.scene.multMatrix(DiamondScale);
    this.diamondMaterial.apply();
    this.diamond.display();
    this.scene.popMatrix();

    //blue triangle
    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4,0,0,1);
    this.diamondMaterial.apply();
    this.trianglebig.display();
    this.scene.popMatrix();
    

    //orange triangle
    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2),Math.sqrt(2),0);
    this.scene.rotate(Math.PI/4,0,0,1);
    this.diamondMaterial.apply();
    this.trianglebig2.display();
    this.scene.popMatrix();
    
    //pink triangle
    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2), -Math.sqrt(2) ,0.0);
    this.scene.rotate(3*Math.PI/4,0,0,1);
    this.diamondMaterial.apply();
    this.triangle.display();
    this.scene.popMatrix();
    
    //Red Triangle
    this.scene.pushMatrix();
    this.scene.translate(1.8,-3.45,0);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.diamondMaterial.apply();
    this.trianglesmall.display();
    this.scene.popMatrix();
    
    //Purple triangle
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), -2.12,0.0);
    this.scene.rotate(Math.PI/4,0,0,1);
    this.diamondMaterial.apply();
    this.trianglesmall2.display();
    this.scene.popMatrix();
    
    //Paralilogramo Yellow
    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4,0,0,1);
    this.scene.scale(-1,1,1);
    this.scene.translate(2, 0, 0 );
    this.diamondMaterial.apply();
    this.parallelogram.display();
    this.scene.popMatrix();
    }

    enableNormalViz(){
      this.diamond.enableNormalViz();
      this.triangle.enableNormalViz();
      this.trianglesmall.enableNormalViz();
      this.trianglebig.enableNormalViz();
      this.parallelogram.enableNormalViz();
    }

    disableNormalViz(){
      this.diamond.disableNormalViz();
      this.triangle.disableNormalViz();
      this.trianglesmall.disableNormalViz();
      this.trianglebig.disableNormalViz();
      this.parallelogram.disableNormalViz();
    }
}
