let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
let particleSettings = {
    count: 500,
    gravity: 0.05,
    wave: 0,
};

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createConfetti() {
    while (particles.length < particleSettings.count) {
        let particle = new Particle();

        particle.color =
            `rgb( ${randomNumberGenerator(0, 255)}, 
            ${randomNumberGenerator(0, 255)}, 
            ${randomNumberGenerator(0, 255)}`;

        particles.push(particle);
    }
}

const startConfetti = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    createConfetti();
    for (let i in particles) {
        particleSettings.wave += 0.4;
        particles[i].tiltAngle += randomNumberGenerator(0.01, 2);
        particles[i].y +=
            (Math.sin(particleSettings.wave) +
                particles[i].area +
                particleSettings.gravity) *
            0.2;

        particles[i].tilt = Math.cos(particles[i].tiltAngle) * 0.3;
        particles[i].draw();

        if (particles[i].y > height) {
            particles[i] = new Particle();
            particles[i].color =
                `rgb( ${randomNumberGenerator(0, 255)}, 
        ${randomNumberGenerator(0, 255)}, 
        ${randomNumberGenerator(0, 255)}`;
        }
    }
    animationTimer = requestAnimationFrame(startConfetti);
};

function Particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.area = randomNumberGenerator(10, 15);
    this.tilt = randomNumberGenerator(-4, 4);
    this.tiltAngle = 0;
}

Particle.prototype = {
    draw: function () {
        context.beginPath();
        context.lineWidth = this.area;
        context.strokeStyle = this.color;
        this.x = this.x + this.tilt;
        context.moveTo(this.x + this.area / 2, this.y);
        context.lineTo(this.x, this.y + this.tilt + this.area / 2);
        context.stroke();
    },
};

window.onload = () => {
    canvas.width = width;
    canvas.height = height;
    window.requestAnimationFrame(startConfetti);
};