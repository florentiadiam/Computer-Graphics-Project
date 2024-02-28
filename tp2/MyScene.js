import { CGFaxis, CGFcamera, CGFscene } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyQuad } from "./MyQuad.js";
import { MyTangram } from "./MyTangram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram= new MyParallelogram(this);
    this.trianglesmall = new MyTriangleSmall(this);
    this.trianglebig = new MyTriangleBig(this);
    this.tangram = new MyTangram(this);
    this.quad= new MyQuad(this);
    this.cube= new MyUnitCubeQuad(this);
    this.unitcube= new MyUnitCube(this);
    


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.MyDiamond =true;
    this.MyTriangle=true;
    this.MyParallelogram=true;
    this.MyTriangleBig=true;
    this.MyTriangleSmall=true;
    this.MyQuad=true;
    this.MyTangram=true;
    this.MyUnitCubeQuad=true;
    this.MyUnitCube=true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0); //Ambient num=Diffuse nums
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  setItPink(){
    this.setAmbient(1.0, 0.75, 0.8, 1.0);
    this.setDiffuse(1.0, 0.75, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor, 0.0, 0.0, 0.0,
      0.0, this.scaleFactor, 0.0, 0.0,
      0.0, 0.0, this.scaleFactor, 0.0,
      0.0, 0.0, 0.0             , 1.0,
    ];
  
    
    if (this.MyUnitCubeQuad) this.cube.display();

    // this.multMatrix(sca);

    // this.pushMatrix();
    // this.rotate(-Math.PI/2,1,0,0);
    // this.translate(2.5,-5,0);
    // this.tangram.display();

    // this.pushMatrix();
    // this.translate(1,0,-0.6);
    // this.scale(7,10,1)
    // this.setItPink();
    // this.unitcube.display();
    // this.popMatrix();
    // this.popMatrix();
    // this.popMatrix


    // ---- BEGIN Primitive drawing section

    //if (this.MyTriangle) this.triangle.display();
    //if (this.MyParallelogram) this.parallelogram.display();
    //if (this.MyTriangleSmall) this.trianglesmall.display();
    //if (this.MyTriangleBig) this.trianglebig.display();    
    //if (this.MyUnitCube) this.unitcube.display();    
    //this.quad.display();

    // ---- END Primitive drawing section
  }
}
