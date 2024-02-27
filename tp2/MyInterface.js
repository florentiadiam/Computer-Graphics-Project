import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        
        //Checkbox elemment for diamond
        this.gui.add(this.scene, 'MyDiamond').name('Display Diamond');

        //Checkbox elemment for triangle
        this.gui.add(this.scene, 'MyTriangle').name('Display Triangle');

        //Checkbox elemment for parallelogram
        this.gui.add(this.scene, 'MyParallelogram').name('Display Paral/gram');

        //Checkbox elemment for parallelogram
        this.gui.add(this.scene, 'MyTriangleSmall').name('Display Triangle S');

        //Checkbox elemment for parallelogram
        this.gui.add(this.scene, 'MyTriangleBig').name('Display Triangle B');

         //Checkbox elemment for Unit Cube
         this.gui.add(this.scene, 'MyUnitCube').name('Display Unit cube');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}