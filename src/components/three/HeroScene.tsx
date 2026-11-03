import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import type { Group } from 'three';

/** Abstract original equipment-inspired sculpture. Replace with licensed GLB assets later. */
function EquipmentSculpture() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += Math.min(delta, 0.05) * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.035;
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.11} floatIntensity={0.25}>
      <group ref={group} rotation={[0.08, -0.35, 0]}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.15, 2.65, 0.32]} />
          <meshStandardMaterial color="#d9e6e8" metalness={0.58} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.42, 0.18]}>
          <boxGeometry args={[1.78, 1.3, 0.035]} />
          <meshStandardMaterial color="#102c34" metalness={0.34} roughness={0.14} emissive="#0a3434" emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0, -0.63, 0.2]}>
          <boxGeometry args={[1.53, 0.3, 0.04]} />
          <meshStandardMaterial color="#47d8c2" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.59, 0]}>
          <cylinderGeometry args={[0.10, 0.10, 0.58, 16]} />
          <meshStandardMaterial color="#b5c3ca" metalness={0.75} roughness={0.24} />
        </mesh>
        <mesh position={[0, -1.94, 0]}>
          <boxGeometry args={[1.28, 0.13, 0.74]} />
          <meshStandardMaterial color="#607982" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 380 }} role="img" aria-label="Interactive abstract medical monitor concept, not a specific product">
      <Suspense fallback={<div style={{ color: '#8fd9cf', padding: 24 }}>Loading 3D preview…</div>}>
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.5], fov: 39 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.8} />
          <directionalLight position={[3, 6, 5]} intensity={3} color="#d7f6f2" />
          <pointLight position={[-4, -2, 2]} intensity={15} color="#47d8c2" />
          <EquipmentSculpture />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.8} />
        </Canvas>
      </Suspense>
    </div>
  );
}
