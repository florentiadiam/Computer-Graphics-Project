import { CGFappearance, CGFaxis, CGFcamera, CGFscene, CGFtexture } from "../lib/CGF.js";
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


    //Objects connected to MyInterface
    this.selectedObject = 1;
    this.displayAxis = true;
    this.displayNormals = false;
    this.scaleFactor = 1;

   

    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture1 = new CGFtexture(this, "images/earth.png");
    this.appearance1 = new CGFappearance(this);
    this.appearance1.setTexture(this.texture1);
    this.appearance1.setTextureWrap('REPEAT', 'REPEAT');

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
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
    this.scale(100,100,100);
    this.panorama.display();
    this.popMatrix();


    this.pushMatrix();
    this.scale(10,10,10);
    this.rotate(-Math.PI/2,1,0,0);
    this.appearance.apply();
    this.plane.display();
    this.popMatrix();

    this.rockset.display();
   
  }
}