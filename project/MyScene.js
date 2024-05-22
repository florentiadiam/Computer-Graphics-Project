import { CGFappearance, CGFaxis, CGFcamera, CGFlight, CGFscene, CGFtexture } from "../lib/CGF.js";
import { MyFlower } from "./Garden/MyFlower.js";
import { MyGarden } from "./Garden/MyGarden.js";
import { MyHive } from "./MyHive.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyPollen } from "./MyPollen.js";
import { MySphere } from "./MySphere.js";
import { MyRock } from "./Rocks/MyRock.js";
import { MyRockSet } from "./Rocks/MyRockSet.js";
import { MyBee } from "./bee/MyBee.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.setUpdatePeriod(16);
    this.previousPosition = { x: 0, z: 0 }; // Assuming initial position is (0, 0)
    this.previousAngle = 0; // Assuming initial position is (0, 0)
    this.angle = 0; // Initial angle
    this.speed = 0; // Initial speed
    this.velocity = [Math.cos(this.angle), Math.sin(this.angle)]; // Initial velocity vector
    this.speedFactor = 0; // Initial speed factor
    this.scaleFactor = 0; // Initial speed factor
    this.numofFlowers = 100;
    this.move=true;
    //this.bee.display(isPollen)
    
}

initLights() {
  // Light 0 (Main light)
  this.lights[0] = new CGFlight(this, 0);
  this.lights[0].setPosition(50, 50, 50, 1); 
  this.lights[0].setDiffuse(1.5, 1.3, 1.0, 1.0); 
  this.lights[0].setSpecular(1.5, 1.3, 1.0, 1.0); 
  this.lights[0].setLinearAttenuation(0.0); 
  this.lights[0].setQuadraticAttenuation(0.0001); 
  this.lights[0].enable();
  this.lights[0].update();

  // Light 1 (Fill light)
  this.lights[1] = new CGFlight(this, 1); 
  this.lights[1].setPosition(0, 20, 20, 1); 
  //this.lights[1].setDiffuse(0.6, 0.8, 1.0, 1.0); 
  this.lights[1].setSpecular(0.6, 0.8, 1.0, 1.0);
  this.lights[1].setLinearAttenuation(0.1); 
  this.lights[1].setQuadraticAttenuation(0.01); 
  this.lights[1].enable(); 
  this.lights[1].update(); 

  // Light 2 (Spotlight)
  this.lights[2] = new CGFlight(this, 2);
  this.lights[2].setPosition(5, 5, 5, 1);
  this.lights[2].setDiffuse(1.2, 0.7, 0.6, 1.0); 
  this.lights[2].setSpecular(1.2, 0.7, 0.6, 1.0); 
  this.lights[2].setLinearAttenuation(0.3); 
  this.lights[2].setQuadraticAttenuation(0.1); 
  this.lights[2].enable();
  this.lights[2].update();
}



  init(application) {
    super.init(application);
    this.speedFactor=0.1
    this.previousTime=0;
    this.isDescending =false;
    this.isInitialHeight =false;
    this.isHiveHeight =false;
    this.isPollen=false

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

  
    this.enableTextures(true);
    this.texturePanorama = new CGFtexture(this, 'images/panorama8.png');

    //Initialize scene objects
    this.objects = [this.axis,this.panorama, this.sphere];
    this.objectIDs = { 'Axis': 0 , 'Panorama': 1, 'Sphere': 2};
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this,this.texturePanorama)
    this.plane = new MyPlane(this,30);
    this.sphere=new MySphere(this,50,50,false);
    this.rockset = new MyRockSet(this);
    this.pollen = new MyPollen(this);
    this.pollen1 = new MyPollen(this);
    this.flower = new MyFlower(this, 2, 5,2,2,2,1,1,1,1,1,1,1);
    this.hive = new MyHive(this);
    this.garden=new MyGarden(this,this.numofFlowers)
    this.bee = new MyBee(this);
    this.rock = new MyRock(this,5,5,5);

    //Objects connected to MyInterface
    this.selectedObject = 1;
    this.displayAxis = true;
    this.displayNormals = false;
    this.scaleFactor = 0.5;

    this.grassTexture = new CGFtexture(this, "images/grass.jpg");
    this.terainMaterial = new CGFappearance(this);
    this.terainMaterial.setTexture(this.grassTexture);
    this.terainMaterial.setTextureWrap('REPEAT', 'REPEAT');
  

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


update(t) {
  const amplitude = 1; 
  const frequency = 2 * Math.PI / 1000;  //1000ms=1s
  const phase = Math.PI / 2; 

  //console.log("t:", t); // Log current time
  //console.log("Previous Time:", this.previousTime); // Log previous time
  const currentTime = t
  const verticalPosition = amplitude * Math.sin(frequency * currentTime + phase);
  var delta = t - this.previousTime; // Calculate delta time

  this.checkkeyes(delta);

  this.previousTime = t;
  
  // if(this.gui.isKeyPressed("KeyP") ){
  if(this.move){
    this.bee.y = verticalPosition;
  }  
  // }else if(this.gui.isKeyPressed("KeyO")){
  //   this.bee.y = verticalPosition;
  // }else if(this.gui.isKeyPressed("KeyF")){
  //   this.bee.y = verticalPosition;
  
}


//Method to turn the bee
turn(delta) {
  this.delta=delta;
    const rotationAngle = this.speedFactor * this.delta;
    this.bee.angle += rotationAngle * (Math.PI / 180);
    
   
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
    const acceleration = 0.007*this.speedFactor;
    const deceleration = 0.007*this.speedFactor; 
  
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
    this.bee.z += this.speed;
  
    // Update norm of velocity vector while maintaining direction
    const norm = Math.sqrt(this.velocity[0] ** 2 + this.velocity[1] ** 2);
    if (norm !== 0) {
        this.velocity = [
            (this.velocity[0] / norm) * this.speed,
            (this.velocity[1] / norm) * this.speed
        ];
    }
  }
  
  //need to find how to retrieve the pollen coordinates 
  BeeDescend(delta){
    this.delta=delta;
    const acceleration = 0.001*this.speedFactor;
    // Update speed with acceleration
    this.speed += acceleration * this.delta;

  // Update speed with acceleration
  this.speed += acceleration * this.delta;

 // let nearestFlower=this.NearestFlower()
    let nearestx =this.garden.pos_z[3]*0.37; 
    let nearesty=(-30+(this.garden.stemSize[3])*this.garden.flowerSize[3]*0.1)*0.37;
    let nearestz = -this.garden.pos_x[3]*0.37;

    console.log("nearest x:", nearestx);
    console.log("nearest y:", nearesty);
    console.log("nearestz:", nearestz);

    // if(nearestFlower){
      let dx=nearestx-this.bee.x
     let  dy=nearesty-this.bee.y
      let dz=nearestz-this.bee.z
  
      this.bee.angle =  Math.atan2(dx,dz)
      
      let d=Math.sqrt(dx*dx+dy*dy+dz*dz) //distance to the flower 
      //console.log("d", d);
      if (d>0.8){
        this.bee.x+=this.speed*dx*0.1
        this.bee.y+=this.speed*dy*0.1
        this.bee.z+=this.speed*dz*0.1
        this.isDescending=true;
      }
      else{
        this.bee.x=nearestx
        this.bee.y=nearesty
        this.bee.z=nearestz
        this.isPollen=true
  
        this.isDescending=false;
      }
  
    // }
    // // Log current state for debugging
    console.log("Bee Position x:", this.bee.x);
    console.log("Bee Position y:", this.bee.y);
    console.log("Bee Position z:", this.bee.z);
    // console.log("Bee Position dx:", dx);
    // console.log("Bee Position dy:", dy);
    // console.log("Bee Position dz:", dz);
    // console.log("ddd", this.isDescending)
    // console.log("d", d);
    // console.log("Speed:", this.speed);
  }

  BeeInitalHeight(delta) {

    console.log("Bee Position x:", this.bee.x);
    console.log("Bee Position y:", this.bee.y);
    console.log("Bee Position z:", this.bee.z);
    this.delta=delta;
    const acceleration = 0.01*this.speedFactor;
    this.speed += acceleration * this.delta;

    let Height0y = 0;

    // if(nearestFlower){
      let dx=0-this.bee.x
      let dy=Height0y-this.bee.y
      let dz=0-this.bee.z
  
      this.bee.angle =  Math.atan2(dx,dz)
   

     if (Math.abs(dx) > acceleration && Math.abs(dy) > acceleration && Math.abs(dz) > acceleration) {
      this.bee.x += dx * this.speed * acceleration * 20;
      this.bee.y += dy * this.speed * acceleration * 20;
      this.bee.z += dz* this.speed * acceleration * 20;
      this.isInitialHeight =true;
      //console.log("Bee Position y:", this.bee.y);
     }else{
      this.bee.x=0
      this.bee.y = Height0y;
      this.bee.z=0
      this.isInitialHeight =false;
     }
        
    return 0;
}

BeeToHive(delta) {
  this.delta=delta;
  const acceleration = 0.05*this.speedFactor;
  this.speed += acceleration * this.delta;

      let hivex=-3
      let hivey=-6  //13
      let hivez=4
      const dx = hivex - this.bee.x;
      const dy = hivey - this.bee.y;
      const dz = hivez - this.bee.z;

      this.bee.angle = Math.atan2(dx, dz);

      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

      //console.log("Distance:", d);
      if (d > 0.8) {
          this.bee.x += dx * this.speed * acceleration;
          this.bee.y +=dy*this.speed*acceleration;
          this.bee.z += dz * this.speed * acceleration;
       
          this.isHiveHeight=true
      } else {
          this.bee.x = hivex;
          this.bee.y = hivey;
          this.bee.z = hivez;
          this.isHiveHeight=false
          this.isPollen=false
      }
    }
    
      

//Check if keyes are pressed
  checkkeyes(delta){
    //console.log("Delta:", delta);
    //console.log("Bee before translation - X:", this.bee.x, "Y:", this.bee.y, "Z:", this.bee.z);

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
      this.move=true;
    } 

//Brake if S is pressed
    if (this.gui.isKeyPressed("KeyS"))        {
      text+=" S ";
      keysPressed=true;
      console.log("Bee Translation with A:", this.bee.x);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.accelerate(-delta);
      this.move=true;
    }
    
    //Left Rotation if A is pressed
    if (this.gui.isKeyPressed("KeyA"))        {
      text+=" A ";
      keysPressed=true;
      console.log("Bee left Rotation with A:", this.bee.angle);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
     this.accelerate(0);
      this.turn(delta);
      this.move=true;

    }

   //Right Rotation  if D is pressed   
    if (this.gui.isKeyPressed("KeyD"))        {
      text+=" D ";
      keysPressed=true;
      console.log("Bee Right Rotation with D:", this.bee.angle);
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle= this.bee.angle
      this.accelerate(0);
      this.turn(-delta);
      this.move=true;

    }

       //Reset bee is R is pressed    
       if (this.gui.isKeyPressed("KeyR"))        {
        text+=" R ";
        keysPressed=true;
        this.bee.x=0;
        this.bee.y=0
        this.bee.z=0
        this.accelerate.speed=0;
        this.bee.angle=0;
        this.move=true;
      }

       //Reset bee is R is pressed    
       if (this.gui.isKeyPressed("KeyF"))        {
        text+=" F ";
        keysPressed=true;
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle= this.bee.angle
       this.BeeDescend(delta)
       this.move=false;
      }

      if (this.gui.isKeyPressed("KeyP"))        {
        text+=" P ";
        keysPressed=true;
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle= this.bee.angle
        this.BeeInitalHeight(delta)
        this.move=false;
      }
      if (this.gui.isKeyPressed("KeyO"))        {
        text+=" O ";
        keysPressed=true;
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle= this.bee.angle
        this.BeeToHive(delta)
        this.move=false;
      }

      //If a key is not pressed mantain the previous position of the bee
     if (!keysPressed) {
      // Restore previous position if no keys are pressed
      this.previousPosition = { x: this.bee.x, z: this.bee.z };
      this.previousAngle=this.bee.angle;
      //this.move=true;

      //if the bee is descending then beedescend
      if(this.isDescending ){
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle=this.bee.angle;
        this.BeeDescend(delta)
        this.move=false;
      }
      else if(this.isInitialHeight){
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle=this.bee.angle;
        this.BeeInitalHeight(delta)
        this.move=false;
      }
      else if(this.isHiveHeight){
        this.previousPosition = { x: this.bee.x, z: this.bee.z };
        this.previousAngle=this.bee.angle;
        this.BeeToHive(delta)
        this.move=false;
      }
      else{
        this.bee.x = this.previousPosition.x;
        this.bee.z = this.previousPosition.z;
        this.bee.angle= this.previousAngle;
      }
      
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
    for (let i = 0; i < this.lights.length; i++) {
      this.lights[i].enable();
      this.lights[i].update();
  }
   
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

    
  this.pushMatrix();
  this.terainMaterial.apply();
  this.scale(85, 30, 85);
  this.rotate(-Math.PI / 2.0, 1, 0, 0);
  this.translate(0,0,-0.6);
  this.plane.display();
  this.popMatrix();

  //rocks display
   this.pushMatrix()
   this.translate(-5.5,-18,4);
   this.rockset.display() 
   this.popMatrix()
  
   //Hive display
   this.pushMatrix();
   this.translate(-5.5,-13,4)
   this.rotate(Math.PI/2,0,1,0)
   this.hive.display();
   this.popMatrix()

  //garden display
   this.pushMatrix()
   this.translate(0,-18,0)
   this.rotate(Math.PI/2,0,1,0)
   this.scale(0.37,0.37,0.37)
   this.garden.display();
   this.popMatrix();

  //bee dsplay
  this.pushMatrix();
  //updating coordinates of bee
  this.translate(this.bee.x,this.bee.y-5,this.bee.z)
  this.rotate(this.bee.angle, 0, 1, 0); // Rotate around YY axis
  this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
  this.bee.display();
  this.popMatrix();

this.pushMatrix();
this.scale(45,45,45);
this.panorama.display();
this.popMatrix();

if(this.isPollen==true){
  this.pushMatrix();
  this.translate(this.bee.x+0.3,this.bee.y-5.5,this.bee.z+0.8)
  this.rotate(this.bee.angle, 0, 1, 0); 
  this.scale(1,0.5,1)
  //console.log(this.bee.x)
  this.pollen1.display()

 this.popMatrix();
}


  }
}