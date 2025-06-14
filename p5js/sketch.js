let circles = [];               // All circles
let fallenCircles = [];         // dropped circles
let circleIndex = 0;            // Index of the current birth circle

let startTime;                  // Start time
let mouseXDirection;            // Direction of horizontal mouse movement(-1 is left and 1 is right)
let mouseXSpeed;                // Speed of horizontal mouse movement

let colorRed;                   
let colorGreen;                 
let colorYellow;                
let colorDarkLine;              
let colorLightLine;             


const DESIGN_WIDTH = 1140;                  
const DESIGN_HEIGHT = 1700;                 
const BORN_FREQUENCY = 10;                  
const LINEWEIGHT = 3;                       
const BOLD_LINE_WEIGHT = 5;               
const REFRESH_INTERVAL = 15;                


function setup()
{
    createCanvas(DESIGN_WIDTH, DESIGN_HEIGHT, P2D);
    colorMode(RGB);
    windowResized();
    initColor();
    initCircles();
    createBackgroundTexture();
    startTime = millis() / 1000;
    mouseXDirection = 1;
    mouseXSpeed = 1;
}

function draw()
{
    // Display the background
    image(textureImage, 0, 0, width, height);
    
    // Draw the colored blocks at the bottom
    drawColoredGrid();

    // Update the effects of all circles
    updateCircles();
    // Update the effects of the bouncing circle
    updateBouncingCircles();

    // CheckRefresh
    // detectRefresh();
}

// Resize the canvas to fit the window when the window size changes
function windowResized()
{
    let w, h;
    // Window adaptation:
    if (windowWidth > windowHeight * (DESIGN_WIDTH / DESIGN_HEIGHT))
    {
        h = windowHeight;
        w = h * (DESIGN_WIDTH / DESIGN_HEIGHT);
    }
    else
    {
        w = windowWidth;
        h = w / (DESIGN_WIDTH / DESIGN_HEIGHT);
    }
    resizeCanvas(w, h);
}

// Initialize the color values used for drawing
function initColor()
{
    colorRed = color(246, 82, 80);
    colorGreen = color(93, 172, 122);
    colorYellow = color(219, 187, 104);
    colorDarkLine = color(13, 18, 30);
    colorLightLine = color(215,182,103);
}

// Initialize the circles
function initCircles()
{
    circles = [];
    fallenCircles = [];
    circleIndex = 0;
    circles.push(new SplitCircle(0.349, 0.766, 0.100, 90, 0.5));
    circles.push(new SplitCircle(0.426, 0.768, 0.056, -90, 0.6));
    circles.push(new SplitCircle(0.484, 0.742, 0.090, 0, 0.3));
    circles.push(new SplitCircle(0.564, 0.763, 0.075, 90, 0.4));
    circles.push(new SplitCircle(0.658, 0.772, 0.110, -90, 0.5));
    circles.push(new SplitCircle(0.525, 0.701, 0.062, 180, 0.34));
    circles.push(new SplitCircle(0.509, 0.658, 0.075, 180, 0.5));
    circles.push(new SplitCircle(0.504, 0.576, 0.174, 0, 0.45));
    circles.push(new SplitCircle(0.538, 0.483, 0.121, 180, 0.45));
    circles.push(new SplitCircle(0.566, 0.415, 0.090, 90, 0.55));
    circles.push(new SplitCircle(0.525, 0.371, 0.057, 0, 0.5));
    circles.push(new SplitCircle(0.530, 0.323, 0.088, 180, 0.5));
    circles.push(new SplitCircle(0.473, 0.291, 0.064, 270, 0.5));
    circles.push(new SplitCircle(0.414, 0.292, 0.044, 90, 0.55));
    circles.push(new SplitCircle(0.448, 0.259, 0.044, 180, 0.4));
    circles.push(new SplitCircle(0.592, 0.292, 0.059, 90, 0.5));
    circles.push(new SplitCircle(0.624, 0.266, 0.047, 180, 0.55));
    circles.push(new SplitCircle(0.637, 0.408, 0.060, 90, 0.5));
    circles.push(new SplitCircle(0.705, 0.405, 0.083, -90, 0.55));
    circles.push(new SplitCircle(0.496, 0.405, 0.059, -90, 0.55));
    circles.push(new SplitCircle(0.434, 0.409, 0.070, 90, 0.56));
    circles.push(new SplitCircle(0.360, 0.403, 0.077, -90, 0.5));
    circles.push(new SplitCircle(0.285, 0.357, 0.145, 180, 0.46));
    circles.push(new SplitCircle(0.264, 0.280, 0.095, 0, 0.43));
    circles.push(new SplitCircle(0.282, 0.232, 0.056, 185, 0.5));
    circles.push(new SplitCircle(0.732, 0.355, 0.086, 5, 0.4));
    circles.push(new SplitCircle(0.750, 0.302, 0.072, 180, 0.55));
    circles.push(new SplitCircle(0.756, 0.239, 0.123, 0, 0.5));
    circles.push(new SplitCircle(0.750, 0.182, 0.057, 180, 0.6));
    circles.push(new SplitCircle(0.802, 0.171, 0.044, 100, 0.6));
    circles.push(new SplitCircle(0.861, 0.179, 0.087, 280, 0.5));
    circles.push(new SplitCircle(0.926, 0.196, 0.059, 110, 0.55));
    circles.push(new SplitCircle(0.961, 0.166, 0.049, 180, 0.45));
    circles.push(new SplitCircle(0.252, 0.190, 0.074, 270, 0.5));
    circles.push(new SplitCircle(0.185, 0.168, 0.080, 180, 0.5));
    circles.push(new SplitCircle(0.165, 0.108, 0.110, -10, 0.45));
    circles.push(new SplitCircle(0.185, 0.037, 0.106, 180, 0.45));
}

// Create the background texture
function createBackgroundTexture()
{
    textureImage = createGraphics(DESIGN_WIDTH, DESIGN_WIDTH);

    // Dark blue background
    textureImage.background(37, 53, 93);

    // Draw the green grid
    textureImage.stroke(colorDarkLine);
    textureImage.strokeWeight(BOLD_LINE_WEIGHT);
    textureImage.fill(57, 125, 82);
    let middleLen = textureImage.width * 0.75;
    let leftLen = (textureImage.width - middleLen) / 2;
    let rightLen = leftLen;

    let y = textureImage.height * 0.82;
    let rectH = textureImage.width * 0.1;
    textureImage.rectMode(CENTER);
    textureImage.rect(textureImage.width / 2, y, middleLen, rectH);
    textureImage.rect(leftLen / 2, y, leftLen, rectH);
    textureImage.rect(textureImage.width - rightLen / 2, y, rightLen, rectH);
    
    // Draw the scratch texture
    let numLines = 50000;
    textureImage.strokeWeight(0.5);
    textureImage.stroke(180, 190, 220, 30);
    for (let i = 0; i < numLines; i++)
    {
        let x1 = textureImage.random(textureImage.width);
        let y1 = textureImage.random(textureImage.height);
        let angle = textureImage.random(TWO_PI);
        let len = textureImage.random(10, 30);
        let x2 = x1 + cos(angle) * len;
        let y2 = y1 + sin(angle) * len;
        textureImage.line(x1, y1, x2, y2);
    }
}

// Draw the colored grid at the bottom
function drawColoredGrid()
{
    let gridW = width * 0.10;
    let gridH = height * 0.10;
    let cornerY = height * 0.76;

    rectMode(CORNER);
    strokeWeight(LINEWEIGHT);
    stroke(colorLightLine);
    fill(colorYellow);
    rect(width/2 - gridW*3, cornerY, gridW, gridH);
    fill(colorRed);
    rect(width/2 - gridW*2, cornerY, gridW, gridH);
    fill(colorGreen);
    rect(width/2 - gridW*1, cornerY, gridW, gridH);
    fill(colorYellow);
    rect(width/2 + gridW*0, cornerY, gridW, gridH);
    fill(colorGreen);
    rect(width/2 + gridW*1, cornerY, gridW, gridH);
    fill(colorYellow);
    rect(width/2 + gridW*2, cornerY, gridW, gridH);
    
    angleMode(RADIANS);
    stroke(colorLightLine);
    fill(colorGreen);
    arc(width/2 - gridW*3 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.1, -PI, 0, OPEN);
    fill(colorYellow);
    arc(width/2 - gridW*2 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.6, -PI, 0, OPEN);
    fill(colorRed);
    arc(width/2 - gridW*1 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.2, -PI, 0, OPEN);
    fill(colorRed);
    arc(width/2 + gridW*0 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.12, -PI, 0, OPEN);
    fill(colorYellow);
    arc(width/2 + gridW*1 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.3, -PI, 0, OPEN);
    fill(colorGreen);
    arc(width/2 + gridW*2 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.7, -PI, 0, OPEN);

    stroke(colorDarkLine);
    noFill();
    rect(width/2 - gridW*3, cornerY, gridW * 6, gridH);
}

// Update all circles
function updateCircles()
{
    // The vertical displacement of the mouse controls the number of visible circles
    let circlesNumbers = circles.length;
    let mouseYPos = constrain(mouseY, height * 0.1, height * 0.9);
    circleIndex = map(mouseYPos, height * 0.9, height * 0.1, 0, circlesNumbers);

    // Calculate the horizontal displacement of the mouse
    let dx = mouseX - pmouseX;
    if (dx > 0)
    {
        mouseXDirection = 1;
    }
    else if(dx < 0)
    {
        mouseXDirection = -1;
    }
    

    for (let i = 0; i < circleIndex; i++)
    {
        let circle = circles[i];
        circle.update(mouseXDirection);
        circle.display();
    }

    if (circleIndex >= circles.length)
    {
        for (let i = 0; i < circleIndex; i++)
        {
            circles[i].activatedRotation = true;
        }
    }
}

function updateBouncingCircles()
{
    // Update the drawing of the falling circles
    if (fallenCircles.length > 0)
    {
        for (let i = fallenCircles.length - 1; i >= 0; i--)
        {
            let circle = fallenCircles[i];
            circle.update(mouseXDirection);
            circle.display();
            if (circle.isDead)
            {
                fallenCircles.splice(i, 1);
            }
        }
    }
}

// Draw the split circle
function drawSplitCircle(cx, cy, size, rotation, redRatio)
{
    angleMode(DEGREES);
    push();
    translate(cx, cy);
    rotate(rotation);
    stroke(colorDarkLine);
    fill(colorGreen);
    circle(0, 0, size);
    fill(colorRed);
    arc(0, 0, size, size, 180 * redRatio, -180 * redRatio, OPEN);
    pop();
}

// Check if it's time to refresh the canvas
function detectRefresh()
{
    let currentTime = millis() / 1000;
    if (currentTime - startTime > REFRESH_INTERVAL)
    {
        initCircles();
        startTime = currentTime;
    }
}

// Mouse click event
function mousePressed()
{
    for (let i = 0; i < circles.length; i++)
    {
        let circle = circles[i];
        // Only allow clicking on the upper half of the tree
        if (i <= 8 || !circle.activatedRotation) continue;
        // Get the coordinates and radius of the circle
        let xpos = circle.nx * width;
        let ypos = circle.ny * height;
        let radius = circle.nRadius * width * 0.5;
        // Calculate the distance between the mouse click position and the center of the circle
        let distance = dist(mouseX, mouseY, xpos, ypos);

        // Check if the distance is less than the radius; if so, it means the circle was clicked
        if (distance <= radius)
        {
            // Create a new falling effect circle
            let fallenCircle = new SplitCircle(circle.nx, circle.ny, circle.nRadius, circle.angle, circle.greenRatio);
            fallenCircle.hasFallen = true;
            fallenCircle.activatedRotation = true;
            fallenCircles.push(fallenCircle);
            break; 
        }
    }
}