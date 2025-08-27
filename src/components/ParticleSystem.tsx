import { useEffect, useState } from 'react';

const ParticleSystem = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Create 20 particles
    setParticles(Array.from({ length: 20 }, (_, i) => i));
  }, []);

  return (
    <div className="particles pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;