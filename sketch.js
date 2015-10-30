//============================
//  Paint
//============================

var drawingCanvas
var colorPicker;
var slider;
var clearButton;
var saveButton;
var brushPicker;
var brushType;

var pumpkin;
var flower;
var dabs;



function preload(){
    pumpkin = loadImage("images/pumpkin.png");
    flower = loadImage("images/flower.png");
    dabs = loadImage("images/dabs.png");
    imageMode(CENTER);
}


function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(800, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");
    
    //set up the color picker
    colorPicker = select("#ColorPicker");
    
    //set up the paintbrush width slider
    slider = createSlider(1, 50, 10);
    slider.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    //Clear button
    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush type
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('spray can');
    brushPicker.option('marks');
    brushPicker.option('random lines');
    brushPicker.option('dabs');
    brushPicker.option('pumpkin');
    brushPicker.option('flower');
    brushPicker.option('eraser');
    brushPicker.changed(changeBrush);
    brushType = brushPicker.value();
}

function draw() {
    
    if (mouseIsPressed) {
        if (brushType == "spray can"){
            sprayCan();
        } else if(brushType == "paint brush"){
            standardStroke(); 
        } else if(brushType == "random lines"){
            linesdrawing();
        } else if(brushType == "pumpkin"){
            drawImage(); 
        } else if(brushType == "flower"){
            drawImage2();
        } else if(brushType == "marks"){
            tinymarks();
        } else if(brushType == "eraser"){
            eraseMarks();
        } else if(brushType == "dabs"){
            paintDabs();
        }
        
    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }
}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255, 
    //         colorPicker.elt.color.rgb[1]*255, 
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function sprayCan(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );

    //draw points in a grid that is the size of the brush slider
    //and draw those points 4 pixes from each other

    for (var x = 0; x < sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            point(mouseX+x, mouseY+y);
        }
    }    
}

function drawImage(){
    //draw the image where the mouse is and set the size to the brush size
    image(pumpkin,mouseX,mouseY, slider.value(), slider.value());
}

function eraseMarks(){
    strokeWeight(slider.value());
    stroke("#FFFFFF");
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function drawImage2(){
    image(flower,mouseX+random(0,10),mouseY+random(0,10), slider.value(), slider.value());
}

function tinymarks(){
    strokeWeight(1);
    stroke("#"+ colorPicker.value());
    line(mouseX-slider.value(),mouseY-slider.value(),mouseX+slider.value(),mouseY+slider.value());
}

function linesdrawing(){
    for(var x = 0; x < 10; x ++){
      stroke("#" + colorPicker.value());
      strokeWeight(slider.value());
      line(mouseX+ x, mouseY*random(0,50), mouseX + x*100, mouseY*random(0,50));
    }
}

function paintDabs(){
    image(dabs,mouseX+random(0,20),mouseY+random(0,20),slider.value()*10,slider.value()*10);
}

//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    brushType = brushPicker.value();
}


function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction(){
    clear(drawingCanvas);
    background("white");

}
