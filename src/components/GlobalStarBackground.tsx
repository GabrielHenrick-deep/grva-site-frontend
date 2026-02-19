import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarParticles() {
  const points = useRef<THREE.Points>(null!);
  const count = 3000; // Quantidade de estrelas

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      // Espalhando as estrelas por um raio maior
      pos[i] = (Math.random() - 0.5) * 20; 
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    // Rotação suave contínua
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.02;
    points.current.rotation.x = time * 0.01;
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
        color="#60a5fa" // Azul claro
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
}

export function GlobalStarBackground() {
  return (
    // Fixo na tela, z-index 0, e pointer-events-none para não bloquear cliques
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <StarParticles />
      </Canvas>
    </div>
  );
}