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

    this.previousPosition = { x: 0, z: 0 }; // Assuming initial position is (0, 0)
    this.previousAngle = 0; // Assuming initial position is (0, 0)
    this.angle = 0; // Initial angle
    this.speed = 0; // Initial speed
    this.velocity = [Math.cos(this.angle), Math.sin(this.angle)]; // Initial velocity vector
    this.speedFactor = 0; // Initial speed factor
    this.scaleFactor = 0; // Initial speed factor
}
    
  

turn(delta) {
  this.delta=delta

  const rotationAngle = this.speedFactor * this.delta;
  this.bee.angle += rotationAngle * (Math.PI / 180);
 
  // Normalize the angle to keep it within 0 to 2*PI range
  while (this.bee.angle < 0) {
      this.bee.angle += 2 * Math.PI;
  }

  // Update velocity vector while maintaining direction
  const norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2);
  this.velocity = [
      Math.cos(this.bee.angle) * norm,
      Math.sin(this.bee.angle) * norm
  ];
}
// Method to accelerate the bee
accelerate(delta) {
  this.delta=delta;
  // Define acceleration and deceleration constants
  const acceleration = 0.1*this.speedFactor;
  const deceleration = 0.05*this.speedFactor; 

  // Accelerate
  if(this.delta>0){
    this.speed += acceleration * this.delta;
  }else 
  {
    // Decelerate
    this.speed += deceleration * this.delta;
  }

  //if speed goes negative go to 0,0,0
  if (this.speed < 0) {
    this.speed = 0;
  }
  
  // Clamp speed to prevent it from becoming negative
  this.speed = Math.max(0, this.speed);

  // Update position based on speed
  this.bee.x += this.speed;

  // Update norm of velocity vector while maintaining direction
  const norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2);
  if (norm !== 0) {
      this.velocity = [
          (this.velocity[0] / norm) * this.speed,
          (this.velocity[1] / norm) * this.speed
      ];
  }
}

  init(application) {
    super.init(application);
    this.speedFactor=1
    this.previousTime=0;

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



update(t) {
  
  this.setUpdatePeriod(16);
  //console.log("t:", t); // Log current time
  //console.log("Previous Time:", this.previousTime); // Log previous time

    var delta = t - this.previousTime; // Calculate delta time
    this.checkkeyes(delta);

  this.previousTime = t;
}

//Check if keyes are pressed
  checkkeyes(delta){
    //console.log("Delta:", delta);
    //console.log("Bee before translation - X:", this.bee.x, "Y:", this.bee.y, "Z:", this.bee.z);
    this.delta=delta;

    var text="Keys pressed: ";
    var keysPressed=false;

    //Accelerate forward if W is pressed
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      console.log("Bee Translation with W:",this.bee.x)
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.accelerate(delta); // Accelerate when "W" is pressed  
    } 

//Brake if S is pressed
    if (this.gui.isKeyPressed("KeyS"))        {
      text+=" S ";
      keysPressed=true;
      console.log("Bee Translation with A:", this.bee.x);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.accelerate(-delta);
    }
    
    //Left Rotation if A is pressed
    if (this.gui.isKeyPressed("KeyA"))        {
      text+=" A ";
      keysPressed=true;
      console.log("Bee left Rotation with A:", this.bee.angle);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.turn(delta);

    }

   //Right Rotation  if D is pressed   
    if (this.gui.isKeyPressed("KeyD"))        {
      text+=" D ";
      keysPressed=true;
      console.log("Bee Right Rotation with D:", this.bee.angle);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.turn(-delta);

    }

       //Reset bee is R is pressed    
       if (this.gui.isKeyPressed("KeyR"))        {
        text+=" R ";
        keysPressed=true;
        this.accelerate.speed=0;
      }

      //If a key is not pressed mantain the previous position of the bee
     if (!keysPressed) {
      // Restore previous position if no keys are pressed
      this.bee.x = this.previousPosition.x;
      this.bee.z = this.previousPosition.z;
      this.bee.angle= this.previousAngle;
  } else 
  {
      // Update previous position if keys are pressed
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle=this.bee.angle;
  }

        if (keysPressed)
        console.log(text);

  }

  updateSpeedFactor(value) {
    this.speedFactor = value;
}
  
  display() {
   
    var currentTime = Date.now();

    // Call the update function with the current time
    this.update(currentTime);
    
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
  this.rotate(this.bee.angle, 0, 1, 0); // Rotate around YY axis
  this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
  this.bee.display();
  //this.sphere.display();
 this.popMatrix();

  }
}