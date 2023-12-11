import React, { useState, useEffect } from 'react';
import AspectRatioDefiner from '../components/AspectRatioDefiner';
import AspectRatioVisualizerHorizontal from '../components/AspectRatioVisualizerHorizontal';
import AspectRatioVisualizerVertical from '../components/AspectRatioVisualizerVertical';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const [ratio, setRatio] = useState(16 / 9);
  const [orientation, setOrientation] = useState('horizontal'); 

  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return (
    <div>
      <br />
      <h1 className="big-header text-center">Aspect Ratio Tool</h1>
      <br />
      {/* Updated structure for the dropdown */}
      <div className="orientation-selector text-center">
        <select 
          id="orientationSelector" 
          value={orientation} 
          onChange={(e) => setOrientation(e.target.value)}
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>
      <br />

      {orientation === 'horizontal' ? (
        !isMobile && <AspectRatioVisualizerHorizontal ratio={ratio} />
      ) : (
        !isMobile && <AspectRatioVisualizerVertical ratio={ratio} />
      )}

      <AspectRatioDefiner onRatioChange={setRatio} />
    </div>
  );
};

export default Home;