import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AspectRatioVisualizer = ({ ratio, width, height }) => {
  const canvasRef = useRef(null);
  const hueRef = useRef(180); // Initialize hue value
  const hueIncrement = .03; // Adjust this value for slower or faster hue shift

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions based on the provided width and height props
    canvas.width = width || 400; // Default width
    canvas.height = height || 168; // Default height

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create an animation loop using requestAnimationFrame
    const animate = () => {
      hueRef.current += hueIncrement; // Increment the hue value
      if (hueRef.current >= 360) {
        hueRef.current = 0; // Reset hue when it reaches 360
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set the fill color with a shifting hue
      ctx.fillStyle = `hsl(${hueRef.current}, 100%, 50%)`;

      // Calculate the width of the rectangle based on the aspect ratio and canvas height
      const rectWidth = canvas.height * ratio;
      const rectX = centerX - rectWidth / 2;
      ctx.fillRect(rectX, 0, rectWidth, canvas.height);

      // Request the next animation frame
      requestAnimationFrame(animate);
    };

    animate(); // Start the animation loop
  }, [ratio, width, height]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Center horizontally by setting width to 100%
        height: '100%',
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

AspectRatioVisualizer.propTypes = {
  ratio: PropTypes.number.isRequired,
  width: PropTypes.number, // Optional width prop
  height: PropTypes.number, // Optional height prop
};

export default AspectRatioVisualizer;