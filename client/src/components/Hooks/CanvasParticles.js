import React, { useEffect, useRef } from 'react';

const CanvasParticles = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId;
    
    // Array to store particles
    const particlesArray = [];

    class Particle {
      constructor(x, y, size, speed, directionAngle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.directionX = Math.cos(directionAngle) * this.speed;
        this.directionY = Math.sin(directionAngle) * this.speed;
      }

      draw() {
        context.fillStyle = 'red';
        context.strokeStyle = 'blue';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
      }

      update() {
        this.x += this.directionX;
        this.y += this.directionY;

        if (this.size > 0.1) this.size -= 0.1;
        
        this.draw();
      }
    }

    const createParticles = (e) => {
      const xPos = e.x;
      const yPos = e.y;
      for(let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(
          xPos,
          yPos,
          Math.random() * 5 + 1, 
          Math.random() * 3,
          Math.random() * Math.PI * 2 // random direction
        ));
      }
    };

    const animateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();

        // Remove particles once size below 0.1
        if (particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Add event listener for canvas click to create particles
    canvas.addEventListener('click', createParticles);

    animateParticles();
    
    // Clean up function
    return () => {
      canvas.removeEventListener('click', createParticles);
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
}

export default CanvasParticles;
