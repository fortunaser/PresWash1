const canvases = document.querySelectorAll(".sprayCanvas");

console.log(canvases.length);
console.log(document.querySelectorAll(".sprayCanvas").length);

canvases.forEach(canvas => {

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

class Particle {
    constructor() {
        this.x = 100;
        this.y = canvas.height / 2;

        const angle = (Math.random() - 0.5) * 0.5;
        const speed = 8 + Math.random() * 10;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.life = 50 + Math.random() * 20;
        this.maxLife = this.life;

        this.size = 1 + Math.random() * 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.02;
        this.life--;
    }

    draw() {
        const alpha = this.life / this.maxLife;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle());
    }
}

function drawNozzle() {
    const y = canvas.height / 2;

    ctx.strokeStyle = "#888";
    ctx.lineWidth = 12;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(90, y);
    ctx.stroke();

    ctx.fillStyle = "#2cc02a";

    ctx.beginPath();
    ctx.arc(95, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    createParticles();

    drawNozzle();

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();

});

document.addEventListener("DOMContentLoaded", () => {
  const ctas = document.querySelectorAll(".cta");

  ctas.forEach(el => {
    let targetX = 50;
    let targetY = 50;

    let currentX = 50;
    let currentY = 50;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();

      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    });

    el.addEventListener("mouseleave", () => {
      targetX = 50;
      targetY = 50;
    });

    function animate() {
      // smooth follow (lower = more lag)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      el.style.setProperty("--x", `${currentX}%`);
      el.style.setProperty("--y", `${currentY}%`);

      requestAnimationFrame(animate);
    }

    animate();
  });
});