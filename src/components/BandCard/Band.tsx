import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import ProceduralCard from "./ProceduralCard";
import {
  CARD_SCALE_MOBILE,
  CARD_SCALE_DESKTOP,
  GROUP_POS_MOBILE,
  GROUP_POS_DESKTOP,
  CARD_OFFSET,
  TEXTURE_PATH,
} from "./constants";

extend({ MeshLineGeometry, MeshLineMaterial });

function Band({
  isMobile,
  maxSpeed = 50,
  minSpeed = 10,
}: {
  isMobile: boolean;
  maxSpeed?: number;
  minSpeed?: number;
}) {
  const band = useRef<THREE.Mesh>(null);

  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);

  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState<THREE.Vector3 | null>(null);
  const [hovered, hover] = useState(false);

  const texture = useTexture(TEXTURE_PATH);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged !== null && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      const bodies = [card, j1, j2, j3, fixed] as const;
      for (const r of bodies) {
        r.current?.wakeUp();
      }

      const newX = vec.x - dragged.x;
      let newY = vec.y - dragged.y;

      if (isMobile) {
        vec.multiplyScalar(0.92);
      }

      const limit = isMobile ? -0.05 : -0.2;

      if (state.pointer.y < limit) {
        newY = card.current.translation().y;
      }

      card.current.setNextKinematicTranslation({
        x: newX,
        y: newY,
        z: 0,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      const joints = [j3, j2, j1] as const;

      for (const ref of joints) {
        const anyRef = ref as unknown as { current: { lerped?: THREE.Vector3; translation(): THREE.Vector3 } };
        if (!anyRef.current.lerped) {
          anyRef.current.lerped = new THREE.Vector3().copy(
            anyRef.current.translation()
          );
        }

        const d = Math.max(
          0.1,
          Math.min(
            1,
            anyRef.current.lerped.distanceTo(anyRef.current.translation())
          )
        );

        anyRef.current.lerped.lerp(
          anyRef.current.translation(),
          delta * (minSpeed + d * (maxSpeed - minSpeed))
        );
      }

      const j3Any = j3 as unknown as { current: { lerped: THREE.Vector3; translation(): THREE.Vector3 } };
      const j2Any = j2 as unknown as { current: { lerped: THREE.Vector3; translation(): THREE.Vector3 } };
      const j1Any = j1 as unknown as { current: { lerped: THREE.Vector3; translation(): THREE.Vector3 } };

      const p0 = j3Any.current.lerped;
      const p1 = j2Any.current.lerped;
      const p2 = j1Any.current.lerped;
      const p3 = fixed.current.translation();

      const moved = p0.distanceTo(curve.points[0]) > 0.001 ||
        p1.distanceTo(curve.points[1]) > 0.001 ||
        p2.distanceTo(curve.points[2]) > 0.001;

      if (moved) {
        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);
      }

      if (band.current?.geometry && moved) {
        const geom = band.current.geometry as unknown as { setPoints(points: THREE.Vector3[]): void };
        geom.setPoints(curve.getPoints(32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true
      );
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={isMobile ? GROUP_POS_MOBILE : GROUP_POS_DESKTOP}>
        <RigidBody ref={fixed} type="fixed" colliders={false} angularDamping={4} linearDamping={4} />

        <RigidBody ref={j1} position={[0.5, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} position={[1, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} position={[1.5, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          colliders={false}
          angularDamping={4}
          linearDamping={4}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={isMobile ? CARD_SCALE_MOBILE : CARD_SCALE_DESKTOP}
            position={CARD_OFFSET}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.stopPropagation();
              (e.target as unknown as { releasePointerCapture(id: number): void }).releasePointerCapture(e.pointerId);
              drag(null);
            }}
            onPointerDown={(e) => {
              if (!card.current) return;
              (e.target as unknown as { setPointerCapture(id: number): void }).setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy((e as unknown as { point: THREE.Vector3 }).point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <ProceduralCard />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[{ resolution: new THREE.Vector2(width, height) }]}
          transparent
          opacity={0.8}
          color="white"
          depthWrite={false}
          resolution={[width, height]}
          useMap={1}
          map={texture}
          repeat={[-3.9, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

export default Band;
