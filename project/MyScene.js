import { CGFappearance, CGFaxis, CGFcamera, CGFscene, CGFtexture } from "../lib/CGF.js";
import { MyBee } from "./bee/MyBee.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MySphere } from "./MySphere.js";


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
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama=new MyPanorama(this,this.texturePanorama);
    this.sphere=new MySphere(this,50,50,false);
    this.objects = [this.axis,this.panorama, this.sphere];
    this.objectIDs = { 'Axis': 0 , 'Panorama': 1, 'Sphere': 2};
    this.rock = new MyRock(this,10,10,false);
    this.rockset = new MyRockSet(this);
    this.bee = new MyBee(this);


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

  updateObjectComplexity(){
    this.objects[this.selectedObject].updateBuffers(this.objectComplexity);
}

update(t){
  console.log("t:", t); // Log current time
  console.log("Previous Time:", this.previousTime); // Log previous time
  var delta  = t - this.previousTime
  console.log("Delta:", delta); // Log delta value
   this.checkkeyes(delta);
   this.previousTime = t
 }

  checkkeyes(delta){
    //console.log("Delta:", delta);
    //console.log("Bee before translation - X:", this.bee.x, "Y:", this.bee.y, "Z:", this.bee.z);
  
    this.delta=delta;
   
    this.bee.y=0 //Math.cos(this.delta) 
    this.bee.z+=1*this.delta

    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.bee.x+=1*this.delta //+delta=t2-t1
      
    }

    if (this.gui.isKeyPressed("KeyS"))        {
      text+=" S ";
      keysPressed=true;
      console.log("Bee Translation with w:", this.bee.x);
      this.bee.x-=1*this.delta //+delta=t2-t1
    }

        if (keysPressed)
        console.log(text);

  }


  
  display() {
    this.update();
    
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

  

this.popMatrix();



  //this.rock.display();
  //this.rockset.display();

      this.pushMatrix();
    this.scale(200,200,200);
    this.panorama.display();
    this.popMatrix();

  this.pushMatrix();
  //this.scale(5,5,5);
  //console.log("Bee Translation:", this.bee.x, this.bee.y, this.bee.z);
this.translate(this.bee.x,this.bee.y,this.bee.z)

  this.bee.display();
  //this.sphere.display();
 this.popMatrix();

  }
}