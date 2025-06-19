// Split the circle object
class SplitCircle 
{
    constructor(nx, ny, nRadius, angle, greenRatio) 
    {
        this.nx = nx;                       // Normalized x-coordinate of the circle center
        this.ny = ny;                       // Normalized y-coordinate of the circle center
        this.nRadius = nRadius;             // Normalized radius of the circle
        this.angle = angle;                 // Initial rotation of the circle
        this.greenRatio = greenRatio;       // Proportion of the green segment

        this.rotatedSpeed = random(1, 4);   // Rotation speed
        this.activatedRotation = false;     // Flag indicating whether rotation is enabled
        
        this.hasFallen = false;             // Flag indicating whether the circle has fallen
        this.vy = 0;                        // Vertical falling speed
        this.vx = 0;                        // Horizontal falling speed
        this.gravity = 0.6;                 // Gravitational acceleration
        this.damping = 0.8;                 // Energy decay coefficient per bounce
        this.isStopped = false;             // Flag indicating whether it has completely stopped
        this.stoppedTime = 0;               // Time when it completely stopped
        this.isDead = false;                // Flag indicating whether it is dead
    }

    // Update
    update(dir)
    {
        if (!this.activatedRotation) return;
        this.angle += this.rotatedSpeed * dir;

        if (this.hasFallen && !this.isStopped)
        {
            // When triggered to fall, initialize the horizontal speed based on the direction
            if (this.vx === 0 && this.vy === 0)
            {
                this.vx = random(0.1, 1) * dir;
            }
            // Increase the vertical speed
            this.vy += this.gravity;

            // Calculate the circle's position and radius
            let xpos = this.nx * width;
            let ypos = this.ny * height;
            let radius = this.nRadius * width;

            // Update position based on horizontal and vertical speed
            xpos += this.vx;
            ypos += this.vy;

            // Check for collision with the ground
            let floor = height * 0.81;
            if (ypos + radius > floor)
            {
                ypos = floor - radius;
                // Reverse and dampen the velocity
                this.vy *= -this.damping;
                // Dampen the horizontal velocity as well
                this.vx *= 0.95; 
                // Determine whether the object has come to a complete stop
                if (abs(this.vy) < 1 && !this.isStopped)
                {
                    this.isStopped = true;
                    this.vy = 0;
                    this.vx = 0;

                    // Record the time when the object comes to a complete stop
                    this.stoppedTime = millis() / 1000;
                }
            }
            
            // Update the normalized coordinates
            this.nx = xpos / width;
            this.ny = ypos / height;
        }

        // Determine whether it has disappeared
        if (this.isStopped)
        {
            if (millis()/1000 - this.stoppedTime > 2)
            {
                this.isDead = true;
            }
        }
    }

    // Display Circle

    display() 
    {
        // Calculate position on the canvas
        let xpos = width * this.nx;
        let ypos = height * this.ny;
        let radius = width * this.nRadius;
        drawSplitCircle(xpos, ypos, radius, this.angle, this.greenRatio);
    }
}