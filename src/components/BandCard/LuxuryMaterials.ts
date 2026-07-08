import * as THREE from "three";

export const cardBodyMaterial = new THREE.MeshPhysicalMaterial({
  color: "#0d0d0d",
  roughness: 0.3,
  metalness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  reflectivity: 0.7,
  envMapIntensity: 0.8,
});

export const goldMaterial = new THREE.MeshPhysicalMaterial({
  color: "#d4af37",
  metalness: 1,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  reflectivity: 1,
  envMapIntensity: 1.5,
  emissive: "#d4af37",
  emissiveIntensity: 0.02,
});

export const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  roughness: 0,
  metalness: 0,
  transparent: true,
  opacity: 0.08,
  transmission: 0.85,
  thickness: 0.5,
  ior: 1.45,
  envMapIntensity: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  side: THREE.DoubleSide,
  reflectivity: 1,
});

export const chromeMaterial = new THREE.MeshPhysicalMaterial({
  color: "#c8b060",
  metalness: 0.9,
  roughness: 0.15,
  envMapIntensity: 0.8,
  reflectivity: 0.9,
});

export const backPatternMaterial = new THREE.MeshPhysicalMaterial({
  color: "#d4af37",
  metalness: 0.8,
  roughness: 0.3,
  transparent: true,
  opacity: 0.1,
  envMapIntensity: 0.4,
});
