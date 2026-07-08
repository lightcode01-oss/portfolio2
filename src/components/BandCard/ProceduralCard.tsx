import * as THREE from "three";
import { useMemo } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_THICKNESS,
  CARD_RADIUS,
  GOLD_FRAME_HEIGHT,
  PORTRAIT_PATH,
  PORTRAIT_WIDTH,
  PORTRAIT_HEIGHT,
  PORTRAIT_Y,
} from "./constants";
import {
  cardBodyMaterial,
  goldMaterial,
  glassMaterial,
  chromeMaterial,
  backPatternMaterial,
} from "./LuxuryMaterials";

const halfW = CARD_WIDTH / 2;
const halfH = CARD_HEIGHT / 2;

function CornerAccents() {
  return (
    <group position={[0, 0, CARD_THICKNESS / 2 + 0.002]}>
      {([[-1, 1], [1, 1], [-1, -1], [1, -1]] as const).map(([sx, sy]) => (
        <group key={`c${sx}${sy}`}>
          {/* L-shaped corner line */}
          <mesh position={[sx * (halfW - 0.03), sy * (halfH - 0.08), 0]}>
            <planeGeometry args={[0.04, 0.12]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
          <mesh position={[sx * (halfW - 0.08), sy * (halfH - 0.03), 0]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.04, 0.12]} />
            <primitive object={goldMaterial} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BackPlate() {
  return (
    <group position={[0, 0, -CARD_THICKNESS / 2 - 0.001]}>
      {[-2, 0, 2].map((i) => (
        <mesh key={i} position={[i * 0.3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <planeGeometry args={[0.005, CARD_HEIGHT * 0.55]} />
          <primitive object={backPatternMaterial} attach="material" />
        </mesh>
      ))}
      {[-1, 1].map((i) => (
        <mesh key={`c${i}`} position={[i * 0.3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <planeGeometry args={[0.005, CARD_HEIGHT * 0.4]} />
          <primitive object={backPatternMaterial} attach="material" />
        </mesh>
      ))}
      <mesh position={[0, 0.2, 0.002]}>
        <planeGeometry args={[0.35, 0.002]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -0.2, 0.002]}>
        <planeGeometry args={[0.2, 0.002]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[0.03, 0.05, 24]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
    </group>
  );
}

export default function ProceduralCard() {
  const portrait = useTexture(PORTRAIT_PATH);

  const aspect = useMemo(() => {
    const img = portrait.image as HTMLImageElement | null;
    if (img && img.naturalWidth && img.naturalHeight) {
      return img.naturalWidth / img.naturalHeight;
    }
    return 1;
  }, [portrait]);

  const portraitScale = useMemo(() => {
    const pw = PORTRAIT_WIDTH;
    const ph = pw / aspect;
    if (ph > PORTRAIT_HEIGHT) {
      const r = PORTRAIT_HEIGHT / ph;
      return [pw * r, PORTRAIT_HEIGHT] as [number, number];
    }
    return [pw, ph] as [number, number];
  }, [aspect]);

  const glassSize: [number, number] = useMemo(
    () => [portraitScale[0] + 0.08, portraitScale[1] + 0.1],
    [portraitScale]
  );

  const portraitBottom = PORTRAIT_Y - portraitScale[1] / 2;

  return (
    <group>
      {/* Card body */}
      <RoundedBox
        args={[CARD_WIDTH, CARD_HEIGHT, CARD_THICKNESS]}
        radius={CARD_RADIUS}
        smoothness={4}
      >
        <primitive object={cardBodyMaterial} attach="material" />
      </RoundedBox>

      {/* Gold perimeter border on front face */}
      <mesh position={[0, 0, CARD_THICKNESS / 2 + 0.0005]}>
        <planeGeometry args={[CARD_WIDTH - 0.04, CARD_HEIGHT - 0.04]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0} />
      </mesh>

      {/* Metal clip - luxury brushed gold */}
      <group position={[-halfW + 0.12, halfH - 0.06, 0.02]}>
        <mesh>
          <boxGeometry args={[0.14, 0.04, 0.01]} />
          <primitive object={chromeMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0, 0.007]}>
          <cylinderGeometry args={[0.02, 0.02, 0.005, 16]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0, -0.007]}>
          <cylinderGeometry args={[0.015, 0.015, 0.005, 16]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
      </group>

      {/* Metal clamp - brushed gold bar */}
      <group position={[0, -halfH + 0.05, 0.02]}>
        <mesh>
          <boxGeometry args={[0.18, 0.03, 0.01]} />
          <primitive object={chromeMaterial} attach="material" />
        </mesh>
      </group>



      {/* Portrait */}
      <mesh position={[0, PORTRAIT_Y, CARD_THICKNESS / 2 + 0.0015]}>
        <planeGeometry args={portraitScale} />
        <meshBasicMaterial map={portrait} toneMapped={false} />
      </mesh>

      {/* Subtle gold frame around portrait */}
      <mesh position={[0, PORTRAIT_Y, CARD_THICKNESS / 2 + 0.001]}>
        <planeGeometry args={[portraitScale[0] + 0.03, portraitScale[1] + 0.03]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Glass overlay */}
      <mesh position={[0, PORTRAIT_Y, CARD_THICKNESS / 2 + 0.003]}>
        <planeGeometry args={glassSize} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Gold divider below portrait area */}
      <mesh position={[0, portraitBottom - 0.04, CARD_THICKNESS / 2 + 0.002]}>
        <planeGeometry args={[CARD_WIDTH * 0.55, 0.005]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Corner L-accents */}
      <CornerAccents />

      {/* Chrome edge frame */}
      <mesh position={[0, halfH + CARD_THICKNESS / 2, 0]}>
        <boxGeometry args={[CARD_WIDTH, GOLD_FRAME_HEIGHT, CARD_THICKNESS + 0.006]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -halfH - CARD_THICKNESS / 2, 0]}>
        <boxGeometry args={[CARD_WIDTH, GOLD_FRAME_HEIGHT, CARD_THICKNESS + 0.006]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
      <mesh position={[-halfW - CARD_THICKNESS / 2, 0, 0]}>
        <boxGeometry args={[GOLD_FRAME_HEIGHT, CARD_HEIGHT, CARD_THICKNESS + 0.006]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>
      <mesh position={[halfW + CARD_THICKNESS / 2, 0, 0]}>
        <boxGeometry args={[GOLD_FRAME_HEIGHT, CARD_HEIGHT, CARD_THICKNESS + 0.006]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>

      {/* Back plate */}
      <BackPlate />
    </group>
  );
}
