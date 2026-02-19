import { useGLTF, Float, Stage } from '@react-three/drei';

export function Model() {
  // Caminho para o arquivo na pasta public
  const { scene } = useGLTF('public/meta_quest_3.glb');

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={10} />
    </Float>
  );
}