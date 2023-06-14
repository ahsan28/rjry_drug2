import React, { useEffect, useRef } from 'react';

const CanvasParticles2 = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        context.fillStyle = 'white';
        context.strokeStyle = '#EAEAEA';
        context.lineWidth = 1;
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

    const createParticles = () => {
      for(let i = 0; i < 2; i++) {
        particlesArray.push(new Particle(
          Math.random() * canvas.width, // random xPos
          Math.random() * canvas.height, // random yPos
          Math.random() * 20 + 5, // random size
          Math.random() * 0.75, // RANDOM SPEED
          Math.random() * Math.PI * 2 // random direction
        ));
      }
    };

    const animateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();

        // Remove particles once size below 0.5
        if (particlesArray[i].size <= 0.5) {
          particlesArray.splice(i, 1);
          i--;
        }
      }

      createParticles();

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();
    
    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", zIndex: -1, width: '100vw', height: '100vh' }} />;
}

export default CanvasParticles2;
