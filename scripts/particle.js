let config;
const particles = [];
let ctx;

class Particle extends Path2D {
  nConnections = 0;
  xPos;
  yPos;

  setCoordinates(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  setPosition(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.moveTo(this.xPos, this.yPos)
  }
}

async function initCanvas(canvasID, configPath) {
  try {
    // Load the config file
    response = await fetch(configPath);
    // Handle errors in retrieveing the file
    if (response.status !== 200) {
      if (response.status === 404) {
        throw new Error(`Error 404: getting the config file please check that the path is correct.\nPath: ${configPath}`);
      } else {
        throw new Error("Error: Something unexpected happened and the config file could not be retrieved");
      }
    }
    config = await response.json();
  } catch (e) {
    console.error(`Error loading Config: ${e}`)
    return;
  }

  const canvas = document.getElementById(canvasID);
  canvas.setAttribute('width', canvas.clientWidth);
  canvas.setAttribute('height', canvas.clientHeight);
  console.log(`New Height: ${canvas.clientHeight}`);

  
  ctx = canvas.getContext("2d");
  ctx.fillStyle = config.particleColor;
  ctx.lineWidth = config.lineWidth;
  ctx.strokeStyle = config.lineColor;



  // const observeCanvas = new ResizeObserver(resizeElement(canvas));
  // observeCanvas.observe(canvas);

  // Create the partcles, draw the connections, and finally draw the particles over the connections to prevent lines being drawn over particles
  createParticles(config, canvas, ctx);
  drawConnections(ctx, particles);
  drawParticles();
}

/**
 * Fills the canvas with particles
 * @param {*} config 
 * @param {*} canvas 
 * @param {*} ctx 
 */
function createParticles(config, canvas, ctx) {
  const canvasWidth = canvas.getAttribute('width');
  const canvasHeight = canvas.getAttribute('height');

  for (let i = 0; i < config.nParticles; i++) {
    randomX = Math.random() * canvasWidth;
    randomY = Math.random() * canvasHeight;
    createCircle(ctx, randomX, randomY, config.particleRadius);
  }
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    ctx.fill(particles[i]);
  }
}

function resizeElement(element) {
  element.setAttribute('width', element.clientWidth);
  element.setAttribute('height', element.clientHeight);
  console.log(`New Height: ${element.clientHeight}`);
}

function createCircle(ctx, xPos, yPos, radius) {
  const particle = new Particle();
  particle.arc(xPos, yPos, radius, 0, Math.PI * 2);
  particle.setCoordinates(xPos, yPos);
  particles.push(particle);
}

function drawConnections(canvas, particles) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      const mainParticle = particles[i];
      const comparorParticle = particles[j];

      if (mainParticle === comparorParticle) continue;

      // Check if the particles are close enought to add a connection
      if (isInConnectionDist(mainParticle.xPos, comparorParticle.xPos, mainParticle.yPos, comparorParticle.yPos)) {

        if (mainParticle.nConnections >= config.maxConnections) continue;
        mainParticle.nConnections++;

        // Connect the particles if they are close enough
        ctx.beginPath();
        ctx.moveTo(mainParticle.xPos, mainParticle.yPos);
        ctx.lineTo(comparorParticle.xPos, comparorParticle.yPos);
        ctx.stroke();
      }
    }
  }

}

function isInConnectionDist(xPos1, xPos2, yPos1, yPos2) {
  const xDist = xPos1 - xPos2;
  const yDist = yPos1 - yPos2;
  return (xDist**2 + yDist**2) <= config.lineDistance**2; 
}