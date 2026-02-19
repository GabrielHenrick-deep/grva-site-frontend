import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const points = useRef<THREE.Points>(null!);
  const count = 2500;

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    // Suave movimento vertical
    points.current.position.y = Math.sin(time / 2) * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export const ParticlesBackground = () => (
  <div className="absolute inset-0 z-0 bg-slate-950">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Particles />
    </Canvas>
  </div>
);