import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

import { api } from '../lib/api';
import { Publication } from '../types/publications';
import { Model } from '../components/model';
import { Research } from './Research';
import { ProjectsSection } from './ProjectsSection';
import { FooterSection } from './FooterSection';

// --- COMPONENTE DO MODELO QUE REAGE AO SCROLL ---
// Repare que as partículas não estão mais aqui, pois assumimos que 
// você as colocou globalmente no arquivo App.tsx!
export function ScrollReactiveScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // 1. Calcula a porcentagem do scroll (de 0.0 a 1.0)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    // Evita divisão por zero e garante que o valor fique entre 0 e 1
    const scrollPercent = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

    // 2. Define onde o modelo começa (topo) e onde termina (rodapé)
    const isMobile = viewport.width < 5;
    const startX = isMobile ? 0 : 2.5;  // Começa na DIREITA
    const endX = isMobile ? 0 : -3.0;   // Termina na ESQUERDA

    // 3. Calcula a posição Alvo (Target X) baseada no scroll atual
    const targetX = startX + (endX - startX) * scrollPercent;
    
    // 4. Move o modelo suavemente (Lerp) para a posição Alvo
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

    // 5. Mantém a rotação e a flutuação
    groupRef.current.rotation.y = (state.clock.elapsedTime * 0.2) + (scrollY * 0.002);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Environment preset="city" />
      <group ref={groupRef} scale={1.2}>
        <Model />
      </group>
    </>
  );
}

export function HomePage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  
  useEffect(() => {
    async function fetchPublication() {
      try {
        const response = await api.get('/publications');
        setPublications(response.data);
      } catch (err) {
        console.error('Erro ao buscar publicações:', err);
      }
    }
    fetchPublication();
  }, []);

  return (
    // bg-transparent garante que o fundo global de estrelas do App.tsx apareça!
    <div className="relative min-h-screen bg-transparent text-white selection:bg-blue-500/30">
      
      {/* CAMADA 1: BACKGROUND 3D DO MODELO FIXO (Mova de um lado para o outro) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ScrollReactiveScene />
        </Canvas>
      </div>

      {/* CAMADA 2: CONTEÚDO HTML (Rola por cima do 3D) */}
      <div className="relative z-10 w-full">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 pb-12">
          {/* Slider de fundo sutil no Hero (Textura leve de imagens) */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <Slider fade autoplay speed={2000} arrows={false}>
              {publications.map((img, index) => (
                <div key={index} className="h-screen w-full">
                  <img src={img.image_url} className="w-full h-full object-cover grayscale" alt="slide" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
                Bem-vindo ao <br />
                <span className="text-blue-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                   GRVA
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-400 max-w-lg">
                Grupo de Pesquisa em Realidade Virtual e Aumentada
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/members" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20">
                  Nossa Equipe
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full font-semibold transition-all">
                  Fale Conosco
                </Link>
              </div>
            </motion.div>
            
            {/* Div vazia na direita apenas para ocupar o espaço inicial do modelo no grid */}
            <div className="hidden lg:block h-[500px]"></div>
          </div>
        </section>

        {/* OUTRAS SEÇÕES */}
        {/* Obs: Lembre-se de colocar bg-slate-900/60 (com transparência) na raiz desses componentes! */}
        <Research />
        <ProjectsSection />
        <FooterSection />
      </div>
    </div>
  );
}