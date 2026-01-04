import { useEffect, useState } from 'react';
import './RainAnimation.css';

const RainAnimation = () => {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    // Generate raindrops
    const drops = [];
    const dropCount = 120;

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 1 + Math.random() * 1.5,
        animationDelay: Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    setRaindrops(drops);
  }, []);

  return (
    <div className="rain-container">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.animationDelay}s`,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default RainAnimation;
