import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ShoeModel from './Scene3D';

const HeroSection = () => {
  const performanceRef = useRef<HTMLHeadingElement | null>(null);
  const packRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const performanceEl = performanceRef.current;
    const packEl = packRef.current;
    const canvasEl = canvasRef.current;
    
    if (!performanceEl || !packEl || !canvasEl) return;

    let ticking = false;

    const onScroll = () => {
      if (!performanceEl || !packEl || !canvasEl) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Parallax effect - each element moves at different speeds
          // PERFORMANCE moves slower (background layer)
          performanceEl.style.transform = `translateY(${scrollY * 0.15}px)`;
          
          // Canvas/3D model moves at medium speed (middle layer)
          canvasEl.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.25}px)`;
          
          // PACK moves faster (foreground layer)
          packEl.style.transform = `translateY(${scrollY * 0.4}px)`;
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // initial position
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
  <section className="relative min-h-screen flex flex-col justify-center overflow-x-hidden overflow-y-auto grid-background pt-15 bg-[#0d0d0d]">
      
      {/* === BACKGROUND LAYERS START === */}
      
      {/* 1. Grid lines (Changed to 80px width and 40px height for a rectangle) */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] "></div> */}

      {/* 2. Diagonal dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 mix-blend-multiply bg-[size:80px_40px]"></div>

      {/* 3. Noise overlay (optional) - Make sure you have this image in /images/ */}
      <div className="absolute inset-0 bg-[url('/images/noise-texture.png')] opacity-10"></div>
      
      {/* === BACKGROUND LAYERS END === */}


      {/* Main Content (z-10 makes it sit on top of the background) */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        <div className="relative">
          {/* Large Italic Text with 3D Model */}
          <div className="relative">
            <h1 
              ref={performanceRef}
              className="text-[8rem] md:text-[8rem] lg:text-[8rem] font-black italic leading-none text-foreground text-center select-none will-change-transform"
            >
              PERFORMANCE
            </h1>
            <div 
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] h-[600px] z-20 will-change-transform"
            >
              <Canvas
                className="w-full h-full"
                shadows
                gl={{ outputEncoding: (THREE as any).sRGBEncoding, toneMapping: (THREE as any).ACESFilmicToneMapping, physicallyCorrectLights: true } as any}
              >
                {/* Move camera back to accommodate larger model and relax controls */}
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={(10 as any)}
                  maxDistance={(12 as any)}
                  autoRotate={false}
                />
                <ambientLight intensity={1.2} />
                <hemisphereLight intensity={0.8} groundColor="#444444" />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
                <spotLight position={[-10, 10, 5]} angle={0.15} penumbra={1} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={1.2} />
                <pointLight position={[10, 5, -5]} intensity={0.8} color="#ffffff" />
                <Suspense fallback={null}>
                  <Environment preset="studio" />
                  <ShoeModel />
                </Suspense>
              </Canvas>
            </div>
            <h2 
              ref={packRef}
              className="text-[8rem] md:text-[8rem] lg:text-[8rem] font-black italic leading-none text-foreground text-center select-none will-change-transform"
            >
              PACK
            </h2>
          </div>

          {/* Bottom Left Text */}
         
        </div>
      </div>
       <div className="absolute bottom-8 left-8 text-left max-w-xs space-y-2">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase leading-relaxed font-mono">
              EXPLORE THE LATEST DROP<br />
              IN OUR 3D SHOP<br />
              POWERED BY VELOCITY<br />
              <span className="text-accent text-[0.65rem]">DRAG TO ROTATE • SCROLL TO ZOOM</span>
            </p>
          </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase font-mono">
          SCROLL DOWN
        </p>
      </div>
    </section>
  );
};

export default HeroSection;