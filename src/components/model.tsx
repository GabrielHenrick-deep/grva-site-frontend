import { useGLTF, Float } from '@react-three/drei';
import { useMemo } from 'react';

// Array com os caminhos dos modelos
const modelos = [
  '/public/meta_quest_3.glb',
  '/public/Quest2.glb',
  '/public/htc_vive_pro.glb',
  '/public/holo_lens.glb'
];



export function Model() {
  // O useMemo garante que o índice seja escolhido apenas uma vez por carregamento
  const randomPath = useMemo(() => {
    const index = Math.floor(Math.random() * modelos.length);
    return modelos[index];
  }, []);

  const { scene } = useGLTF(randomPath);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={10} />
    </Float>
  );
}