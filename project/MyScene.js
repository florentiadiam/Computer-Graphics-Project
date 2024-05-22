import { CGFappearance, CGFaxis, CGFcamera, CGFlight, CGFscene, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyGarden } from "./Garden/MyGarden.js";
import { MyPollen } from "./Garden/MyPollen.js";
import { MyHive } from "./MyHive.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyRockSet } from "./Rocks/MyRockSet.js";
import { MyBee } from "./bee/MyBee.js";
import { MyGrass } from './Grass/MyGrass.js'


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
    this.numofFlowers = 100; //Number of Flowers
    this.move=true; //Movement of the bee
    this.showshaderCode=false;
    
    
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

   
    this.objects = [this.sphere, this.rockset, this.bee, this.grass,this.garden, this.hive];
    this.objectIDs = { 
      'Sphere': 0,
      'Rockset': 1,
      'Bee': 2,
      'Grass': 3,
      'Garden': 4,
      'Everything': 5
    };
    //Objects connected to MyInterface
    this.selectedObject = 5;
    this.displayAxis = false;
    this.displayNormals = false;
    this.scaleFactor = 0.5;
    
    
    //Textures
    this.texturePanorama = new CGFtexture(this, 'images/panorama8.png');

    this.texture = new CGFtexture(this, "images/grass.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.texture1 = new CGFtexture(this, "images/earth.png");
    this.appearance1 = new CGFappearance(this);
    this.appearance1.setTexture(this.texture1);
    this.appearance1.setTextureWrap('REPEAT', 'REPEAT');

    this.grassTexture = new CGFtexture(this, "images/grass.jpg");
    this.terainMaterial = new CGFappearance(this);
    this.terainMaterial.setTexture(this.grassTexture);
    this.terainMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.textureLeaf = new CGFtexture(this, "images/grasstex.jpg");
		this.appearanceLeaf = new CGFappearance(this);
    this.appearanceLeaf.setTexture(this.textureLeaf);
		this.appearanceLeaf.setTextureWrap('REPEAT', 'REPEAT');

    this.grassmovement = new CGFshader(this.gl, "Grass/grass.vert", "Grass/grass.frag");
  
    this.grassmovement.setUniformsValues({ timeFactor: 0 });

     //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this,this.texturePanorama)
    this.plane = new MyPlane(this,30);
    this.sphere=new MySphere(this,50,50,false);
    this.rockset = new MyRockSet(this);
    this.pollen = new MyPollen(this);
    this.pollen1 = new MyPollen(this);
    this.hive = new MyHive(this);
    this.garden=new MyGarden(this,this.numofFlowers)
    this.bee = new MyBee(this);
    this.grass = new MyGrass(this,1000);


		// set the scene update period 
		this.setUpdatePeriod(50);
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

  const currentTime = t
  const verticalPosition = amplitude * Math.sin(frequency * currentTime + phase);
  var delta = t - this.previousTime; // Calculate delta time

  this.checkkeyes(delta);

  this.previousTime = t;

  this.grassmovement.setUniformsValues({ timeFactor: t / 100 % 100, frequency:0.4});
  
  if(this.move){
    this.bee.y = verticalPosition;
  }  
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
  
  //First animation move bee goes to the flower
  BeeDescend(delta){
    this.delta=delta;
    const acceleration = 0.001*this.speedFactor;
    // Update speed with acceleration
    this.speed += acceleration * this.delta;

    // Update speed with acceleration
    this.speed += acceleration * this.delta;

    //Get the position of a flower
    let FlowerPosx =this.garden.pos_z[3]*0.37; 
    let FlowerPosy=(-30+(this.garden.stemSize[3])*this.garden.flowerSize[3]*0.1)*0.37;
    let FlowerPosz = -this.garden.pos_x[3]*0.37;

    //Distance Flower from bee
    let dx=FlowerPosx-this.bee.x
    let dy=FlowerPosy-this.bee.y
    let dz=FlowerPosz-this.bee.z

    //Angle so the bee face the flower
    this.bee.angle = Math.atan2(dx,dz)
    
    let d=Math.sqrt(dx*dx+dy*dy+dz*dz) //distance to the flower 
    if (d>0.8){
      this.bee.x+=this.speed*dx*0.1
      this.bee.y+=this.speed*dy*0.1
      this.bee.z+=this.speed*dz*0.1
      this.isDescending=true;
    }
    else{
      this.bee.x=FlowerPosx
      this.bee.y=FlowerPosy
      this.bee.z=FlowerPosz
      this.isPollen=true

      this.isDescending=false;
    }
  }

  BeeInitalHeight(delta) {
    this.delta=delta;
    const acceleration = 0.01*this.speedFactor;
    this.speed += acceleration * this.delta;

    let Height0y = 0;

    let dx=0-this.bee.x
    let dy=Height0y-this.bee.y
    let dz=0-this.bee.z

    this.bee.angle =  Math.atan2(dx,dz)
  

    if (Math.abs(dx) > acceleration && Math.abs(dy) > acceleration && Math.abs(dz) > acceleration) {
      this.bee.x += dx * this.speed * acceleration * 20;
      this.bee.y += dy * this.speed * acceleration * 20;
      this.bee.z += dz* this.speed * acceleration * 20;
      this.isInitialHeight =true;
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

       //Reset bee if R is pressed
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

       //First animation if F is pressed
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

    if(this.selectedObject==0){
      this.pushMatrix();
      this.appearance1.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if(this.selectedObject==1){
      //ground display
      this.pushMatrix();
      this.terainMaterial.apply();
      this.scale(15, 15, 15);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
      
      //rocks display
      this.pushMatrix()
      this.rockset.display() 
      this.popMatrix()
    }

    if(this.selectedObject==2){      
      //bee dsplay
      this.pushMatrix();
      //updating coordinates of bee
      this.translate(this.bee.x,this.bee.y,this.bee.z)
      this.rotate(this.bee.angle, 0, 1, 0); // Rotate around YY axis
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.bee.display();
      this.popMatrix();
    }

    if(this.selectedObject==3){
      //ground display
      this.pushMatrix();
      this.terainMaterial.apply();
      this.scale(60, 60, 60);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();

      this.setDefaultAppearance();
      //grass display
      this.pushMatrix();
      this.setActiveShader(this.grassmovement);
      this.appearanceLeaf.apply()
      this.grass.display();
      this.popMatrix();
      this.setActiveShader(this.defaultShader);
    }

    if(this.selectedObject==4){
      //ground display
      this.pushMatrix();
      this.terainMaterial.apply();
      this.scale(60, 60, 60);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();

      //garden display
      this.pushMatrix()
      this.rotate(Math.PI/2,0,1,0)
      this.scale(0.37,0.37,0.37)
      this.garden.display();
      this.popMatrix();
    }

    if(this.selectedObject==5){
      this.setDefaultAppearance();
      //ground display
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

      //panorama display
      this.pushMatrix();
      this.scale(45,45,45);
      this.panorama.display();
      this.popMatrix();

      if(this.isPollen==true){
        this.pushMatrix();
        this.translate(this.bee.x+0.3,this.bee.y-5.5,this.bee.z+0.8)
        this.rotate(this.bee.angle, 0, 1, 0); 
        this.scale(1,0.5,1)
        this.pollen1.display()
        this.popMatrix();
      }

      //grass display
      this.pushMatrix();
      this.translate(0,-18,0)
      this.setActiveShader(this.grassmovement);
      this.appearanceLeaf.apply()
      this.grass.display();
      this.popMatrix();
      this.setActiveShader(this.defaultShader);
    }
  }
}