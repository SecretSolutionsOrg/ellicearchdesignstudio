"use client";

import { useMemo, useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { designs } from "@/data/designs";
import { ArtworkFrame } from "./ArtworkFrame";

const RADIUS = 8;
const EYE_HEIGHT = 0;

type Props = {
  activeIndex: number;
  onSelect: (id: string) => void;
};

// Wrap an angle delta into the (-π, π] range so we always rotate the short way.
// JavaScript's `%` keeps the sign of the dividend, which is what made our previous
// shortest-path math fail for targets like -3π/2.
function shortestAngleDelta(target: number, current: number) {
  const two = Math.PI * 2;
  let d = (target - current) % two;
  if (d > Math.PI) d -= two;
  if (d <= -Math.PI) d += two;
  return d;
}

export function GalleryRoom({ activeIndex, onSelect }: Props) {
  const ringRef = useRef<THREE.Group>(null);
  const targetRingY = useRef(0);
  const { camera } = useThree();

  // Local artwork positions on the ring. The active artwork is brought to the
  // forward (-Z) position by rotating the ring group around Y — not by moving
  // the camera. This avoids fighting OrbitControls (whose setAzimuthalAngle
  // re-wraps angles, causing the previous "loops non-stop on design 6" bug).
  const placements = useMemo(
    () =>
      designs.map((design, i) => {
        const angle = (i / designs.length) * Math.PI * 2;
        return {
          design,
          angle,
          position: [
            Math.sin(angle) * RADIUS,
            EYE_HEIGHT,
            -Math.cos(angle) * RADIUS,
          ] as [number, number, number],
          // Each frame's +Z normal must point at the origin. After the parent
          // group rotates by `angle`, this local -angle keeps the world-space
          // normal pointing inward.
          rotationY: -angle,
        };
      }),
    [],
  );

  // Update the ring's target rotation when activeIndex changes.
  useEffect(() => {
    targetRingY.current = (activeIndex / designs.length) * Math.PI * 2;
  }, [activeIndex]);

  useFrame((_, delta) => {
    const ring = ringRef.current;
    if (!ring) return;
    const current = ring.rotation.y;
    const delta_ = shortestAngleDelta(targetRingY.current, current);
    const stepped = THREE.MathUtils.damp(0, delta_, 4, delta);
    ring.rotation.y = current + stepped;
  });

  // Camera fixed at origin looking down -Z; OrbitControls only handles free look.
  useEffect(() => {
    camera.position.set(0, 0, 0.01);
    camera.lookAt(0, 0, -1);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.35} color="#fff5e6" />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#fff0d0" distance={20} />

      {/* Surrounding gallery shell */}
      <mesh>
        <sphereGeometry args={[30, 64, 64]} />
        <meshBasicMaterial side={THREE.BackSide} color="#0c0a07" />
      </mesh>

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position-y={-2.4}>
        <circleGeometry args={[14, 64]} />
        <meshStandardMaterial color="#1c140a" roughness={0.95} />
      </mesh>

      {/* Ceiling glow */}
      <mesh rotation-x={Math.PI / 2} position-y={4.2}>
        <circleGeometry args={[14, 64]} />
        <meshBasicMaterial color="#1a120a" />
      </mesh>

      {/* The ring of artworks — rotates as a single unit */}
      <group ref={ringRef}>
        {placements.map(({ position }, i) => {
          // Spotlight ~2 units toward the centre from each painting, ceiling-height.
          const [px, , pz] = position;
          const len = Math.hypot(px, pz) || 1;
          const fx = px - (px / len) * 2;
          const fz = pz - (pz / len) * 2;
          return (
            <spotLight
              key={`spot-${i}`}
              position={[fx, 3, fz]}
              target-position={position}
              angle={0.5}
              penumbra={0.6}
              intensity={i === activeIndex ? 1.4 : 0.5}
              color="#ffd9a0"
              distance={12}
            />
          );
        })}

        {placements.map(({ design, position, rotationY }, i) => (
          <ArtworkFrame
            key={design.id}
            design={design}
            position={position}
            rotationY={rotationY}
            active={i === activeIndex}
            onClick={onSelect}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={-0.4}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.65}
      />
    </>
  );
}

export const totalArtworks = designs.length;
