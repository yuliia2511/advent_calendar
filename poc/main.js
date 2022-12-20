const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth; // Set the canvas width to 500 pixels
canvas.height = innerHeight; // Set the canvas height to 500 pixels
document.body.appendChild(canvas); // Add the canvas to the HTML document

// Define an array to store the snowflakes
let snowflakes = [];

startSnowAnimation();


// Generate a random snowflake and add it to the canvas
function generateSnowflake() {
    // Create a new snowflake using a geometric shape
    // and fill it with a white color
    const snowflake = new Path2D();
    // Position the snowflake at a random location at the top of the canvas
    const x = Math.random() * canvas.width;
    const y = 0;
    const r = Math.random() * 5;

    const vx = (Math.random() * r) * 2 - r;
    const vy = Math.random() * r;

    snowflake.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill(snowflake);

    // Add the snowflake to the snowflakes array
    snowflakes.push({ x, y, r, vx, vy, shape: snowflake});
}

// Animate the snowflakes by moving them downwards
function animateSnowflakes() {
    generateSnowflake();
    // Move each snowflake downwards
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        snowflake.y += snowflake.vy; // Increment the y position of the snowflake by 10 pixels
        snowflake.x += snowflake.vx; // Randomly change the x position of the snowflake
        snowflake.vy = Math.abs(snowflake.vy);

        snowflake.vy += Math.random() * snowflake.r / snowflake.vy / 2 - snowflake.r / 7;

        snowflake.vx += Math.random() * snowflake.r / snowflake.vx - snowflake.vx / 2;

        ctx.save();
        ctx.translate(snowflake.x, snowflake.y);
        ctx.fill(snowflake.shape);
        ctx.restore();
    }

    // Check if a snowflake has reached the bottom of the canvas
    // If it has, remove it from the snowflakes array and generate a new snowflake
    let w = canvas.width;
    let h = canvas.height;
    snowflakes = snowflakes.filter(function (snowflake) {
        return snowflake.y + snowflake.r <= h;
    });
    
}

// Generate the initial snowflakes and start animating them
function startSnowAnimation() {
    // for (let i = 0; i < 50; i++) {
    //     generateSnowflake();
    // }

    setInterval(animateSnowflakes, 100);
}

