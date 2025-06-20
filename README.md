# 9103-YanLi-Work
## Instructions
This project presents an interactive animation controlled by mouse movements. Moving the mouse vertically gradually reveals or hides the circles, while horizontal movements control their rotation direction. Clicking on the upper part of a circle triggers a falling animation.
## Individual approach
### Personal approach and animation driven
For my individual animation, I chose User Input (mouse interaction) as the driving method, based on our group animation framework. The vertical position of the mouse controls how many circles (representing leaves or fruits) appear on the tree, while the horizontal position controls their rotation direction. Additionally, clicking on the upper part of the tree (the canopy) triggers individual fruits to fall to the ground.

My inspiration comes from the symbolic representation of life in Shemza’s work “The Apple Tree”. I wanted users to take part in the growth of the tree—through their mouse movements, they influence the speed of its blooming and the direction it sways. The falling of the fruits back to the soil represents the cyclical nature of life, completing a poetic loop of growth and return.
![Areas where fruit can be dropped by clicking ]()Picture\canopy.png
In terms of animation, I implemented several key techniques to enrich the visual experience:

## Animation properties and technological innovation
1. Progressive Reveal Based on Mouse Y Position
The number of visible circles is dynamically controlled by the vertical position of the mouse. As the user moves the cursor upward, more circles gradually appear, creating a sense of the tree growing upward. This interaction simulates an organic emergence process.

2. Directional Rotation Controlled by Mouse X
The rotation direction of each circle is influenced by horizontal mouse movement. A variable mouseXDirection tracks whether the user is moving the mouse left or right, and applies corresponding rotation to the visible circles, making the tree responsive and reactive to user gestures.

3. Click-to-Fall Physics with Lifecycle
Users can click on upper tree segments (canopy area) to trigger the "fruit" to fall. These falling circles follow a physics simulation, including:

gravity acceleration

horizontal/vertical velocity

bounce with energy loss (damping)

lifecycle decay (isDead)
Once the circle hits the ground and bounces to rest, it disappears after a short delay, forming a complete loop of falling and vanishing.

4. Physics-Informed Bouncing Animation
Unlike simple easing, the bouncing animation is physics-driven: each falling circle carries independent vx, vy, gravity, and damping values, resulting in nuanced, realistic motion. This adds a tactile quality to the interaction.

5. Event-Driven State Management
Each SplitCircle object holds internal states (activatedRotation, hasFallen, isStopped, isDead), enabling layered animation control: a circle must be visible → activated → clicked → falling → stopped → disappeared. This hierarchical design supports complex yet smooth behavioral logic.

6. Group-Level Animation Unlocking
All circles begin rotating only when the full tree has emerged—a global condition checked using the circleIndex. This provides a moment of climax and completion, aligning interaction with storytelling structure.