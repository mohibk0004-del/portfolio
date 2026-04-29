import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { AsciiEffect } from 'three-stdlib';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

type AsciiRendererProps = {
  fgColor: string;
  bgColor: string;
  characters: string;
  bInvert: boolean;
};

function AsciiRenderer({ fgColor, bgColor, characters, bInvert }: AsciiRendererProps) {
  const { gl, size, scene, camera } = useThree();
  const frameAccumulator = useRef(0);
  const targetFrame = 1 / 24;
  
  const effect = useMemo(() => {
    const ef = new AsciiEffect(gl, characters, { invert: bInvert, color: false, resolution: 0.18 });
    ef.domElement.style.position = 'absolute';
    ef.domElement.style.top = '0px';
    ef.domElement.style.left = '0px';
    ef.domElement.style.width = '100%';
    ef.domElement.style.height = '100%';
    ef.domElement.style.color = fgColor;
    ef.domElement.style.backgroundColor = bgColor;
    ef.domElement.style.pointerEvents = 'none';
    ef.domElement.style.fontFamily = 'monospace';
    return ef;
  }, [characters, bInvert, fgColor, bgColor, gl]);

  // Bind effect on size change
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Use render pass inside request animation frame
  useFrame((_, delta) => {
    frameAccumulator.current += delta;
    if (frameAccumulator.current < targetFrame) return;
    frameAccumulator.current = 0;
    effect.render(scene, camera);
  }, 1);

  // Append effect node to parent
  useEffect(() => {
    gl.domElement.style.display = 'none';
    const parent = gl.domElement.parentNode;
    if (parent) {
      parent.appendChild(effect.domElement);
    }
    return () => {
      if (parent) parent.removeChild(effect.domElement);
      gl.domElement.style.display = 'block';
    };
  }, [gl, effect]);

  return null;
}

function CameraDrift() {
  const { camera, clock } = useThree();

  useFrame(() => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.28) * 0.28;
    camera.position.y = Math.cos(t * 0.33) * 0.18;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

type CPUProps = {
  setNearHovered: (hovered: boolean) => void;
  setDirectHovered: (hovered: boolean) => void;
};

function CPU({ setNearHovered, setDirectHovered }: CPUProps) {
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const isNearRef = useRef(false);
  const isDirectRef = useRef(false);
  const worldCenter = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(worldCenter);
      const distanceToRay = state.raycaster.ray.distanceToPoint(worldCenter);
      const nearHovered = distanceToRay < 1.2;

      if (isNearRef.current !== nearHovered) {
        isNearRef.current = nearHovered;
        setNearHovered(nearHovered);
      }

      const ySpeed = isDirectRef.current ? 2.1 : nearHovered ? 1.2 : 0.42;
      const xSpeed = isDirectRef.current ? 0.82 : nearHovered ? 0.45 : 0.18;
      groupRef.current.rotation.y += delta * ySpeed;
      groupRef.current.rotation.x += delta * xSpeed;

      if (moonRef.current) {
        const t = state.clock.getElapsedTime();
        moonRef.current.position.x = Math.cos(t * 0.9) * 2.15;
        moonRef.current.position.z = Math.sin(t * 0.9) * 2.15;
      }

      if (ringRef.current) {
        ringRef.current.rotation.z += delta * (nearHovered ? 0.35 : 0.18);
      }
    }
  });

  const onDirectOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDirectRef.current = true;
    setDirectHovered(true);
  };

  const onDirectOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDirectRef.current = false;
    setDirectHovered(false);
  };

  return (
    <group ref={groupRef} scale={1.45}>
      <mesh onPointerOver={onDirectOver} onPointerOut={onDirectOut}>
        <sphereGeometry args={[1.25, 24, 24]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.7} wireframe />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2.9, 0.3, 0]} onPointerOver={onDirectOver} onPointerOut={onDirectOut}>
        <torusGeometry args={[1.9, 0.13, 10, 48]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.5} />
      </mesh>

      <mesh ref={moonRef} position={[2.15, 0.25, 0]} onPointerOver={onDirectOver} onPointerOut={onDirectOut}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#d7d7d7" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}

export function AsciiCpuCanvas() {
  const [nearHovered, setNearHovered] = useState(false);
  const [directHovered, setDirectHovered] = useState(false);

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <Canvas
        dpr={[1, 1.2]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 40 }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[8, 9, 10]} intensity={1.7} />
        <directionalLight position={[-6, -4, 6]} intensity={0.8} />
        <CameraDrift />
        <CPU setNearHovered={setNearHovered} setDirectHovered={setDirectHovered} />
        <AsciiRenderer
          fgColor="#ffffff"
          bgColor="#000000"
          characters={' .,:;i1tfLCG08@'}
          bInvert={false}
        />
      </Canvas>
      
      <AnimatePresence>
        {directHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-1/4 right-8 bg-black border border-primary text-primary px-3 py-1 font-status-bar text-status-bar isolate z-10 shadow-[2px_2px_0px_#ffffff]"
            style={{ pointerEvents: 'none' }}
          >
            Planet Telemetry...
          </motion.div>
        )}
      </AnimatePresence>

      {nearHovered && !directHovered && (
        <div className="absolute left-3 top-3 text-[10px] font-status-bar text-surface-tint border border-outline px-2 py-[2px] bg-black/70 pointer-events-none">
          proximity: orbital lock
        </div>
      )}
    </div>
  );
}