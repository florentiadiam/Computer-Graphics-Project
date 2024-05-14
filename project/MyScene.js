import { CGFappearance, CGFaxis, CGFcamera, CGFlight, CGFscene, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./Garden/MyFlower.js";
import { MyGarden } from "./Garden/MyGarden.js";
import { MyHive } from "./MyHive.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyRockSet } from "./Rocks/MyRockSet.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  initLights() {
    // Light 0 
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    // Light 1
    this.lights[1] = new CGFlight(this, 1); 
    this.lights[1].setPosition(10, 10, 10, 1); 
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0); 
    this.lights[1].setLinearAttenuation(0.2); 
    this.lights[1].enable(); 
    this.lights[1].update(); 

    // Light 2 
    this.lights[2] = new CGFlight(this, 2);
    this.lights[2].setPosition(0, 15, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
    this.lights[2].update();
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

    this.enableTextures(true);
    this.texturePanorama = new CGFtexture(this, 'images/panorama4.jpg');

    //Initialize scene objects
    this.objects = [this.axis,this.panorama, this.sphere];
    this.objectIDs = { 'Axis': 0 , 'Panorama': 1, 'Sphere': 2};
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this,this.texturePanorama)
    this.plane = new MyPlane(this,30);
    this.sphere=new MySphere(this,50,50,false);
    this.rockset = new MyRockSet(this);
    this.pollen = new MyPollen(this);
    this.flower = new MyFlower(this, 2, 5,2,2,2,1,1,1,1,1,1,1);
    this.hive = new MyHive(this);
    this.garden=new MyGarden(this,10)

    //Objects connected to MyInterface
    this.selectedObject = 1;
    this.displayAxis = true;
    this.displayNormals = false;
    this.scaleFactor = 1;

   

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture1 = new CGFtexture(this, "images/earth.png");
    this.appearance1 = new CGFappearance(this);
    this.appearance1.setTexture(this.texture1);
    this.appearance1.setTextureWrap('REPEAT', 'REPEAT');

  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateObjectComplexity() {
    const selectedObject = this.objects[this.selectedObject];
    if (selectedObject && typeof selectedObject.updateBuffers === 'function') {
        selectedObject.updateBuffers(this.objectComplexity);
    }
}

  display() {
    for (let i = 0; i < this.lights.length; i++) {
      this.lights[i].enable();
      this.lights[i].update();
  }
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

      this.pushMatrix();

      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

  

   this.rockset.display() 
   this.pushMatrix();
   this.translate(10,2.1,10)
   this.rotate(Math.PI,0,1,0)
   this.hive.display();
   this.popMatrix()

   this.pushMatrix()
   this.translate(0,3.5,0)
   this.scale(0.37,0.37,0.37)

   this.garden.display();
   this.popMatrix();
  }
}