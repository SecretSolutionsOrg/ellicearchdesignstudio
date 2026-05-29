"use client";

import { useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { Design } from "@/data/designs";

type Props = {
  design: Design;
  position: [number, number, number];
  rotationY: number;
  active: boolean;
  onClick: (id: string) => void;
};

export function ArtworkFrame({ design, position, rotationY, active, onClick }: Props) {
  // Vanilla TextureLoader (not drei's useTexture / R3F useLoader) so we can
  // mutate colorSpace + anisotropy without the React Compiler immutability
  // rule flagging an intentional, well-known Three.js pattern.
  const configuredTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(design.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [design.image]);

  const aspect = useMemo(() => {
    const img = configuredTexture.image as { width?: number; height?: number } | null;
    const w = img?.width ?? 9;
    const h = img?.height ?? 11;
    return w / h;
  }, [configuredTexture]);

  const planeH = 3.6;
  const planeW = planeH * aspect;
  const frameThickness = 0.18;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick(design.id);
  };

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Spotlight glow plane behind frame */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[planeW + 2.4, planeH + 2.4]} />
        <meshBasicMaterial
          color={active ? "#d4a84b" : "#1a1a1a"}
          transparent
          opacity={active ? 0.12 : 0.08}
        />
      </mesh>

      {/* Frame border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[planeW + frameThickness * 2, planeH + frameThickness * 2, 0.12]} />
        <meshStandardMaterial
          color={active ? "#d4a84b" : "#3a2f1f"}
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      {/* Painting surface */}
      <mesh
        position={[0, 0, 0.065]}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial map={configuredTexture} roughness={0.7} metalness={0} />
      </mesh>

      {/* Label plaque under the frame */}
      <mesh position={[0, -(planeH / 2 + 0.45), 0.05]}>
        <planeGeometry args={[planeW * 0.7, 0.45]} />
        <meshStandardMaterial color="#11110f" roughness={0.9} />
      </mesh>
    </group>
  );
}
