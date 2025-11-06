import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShoeModel = () => {
  const { scene } = useGLTF('/shoe/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Auto-center and auto-scale the GLTF scene so it fits the camera/frustum.
    if (!scene) return;

  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

  // Desired size (world units) for the largest dimension of the model.
  // Increased so the shoe appears larger in the hero canvas. Tweak this
  // value if you want a different default scale.
  const desiredSize = 12;
    const scale = desiredSize / maxDim;

    // Center the model at the origin, then scale the parent group.
    scene.position.sub(center);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
    }

    // Preserve the model's original PBR materials but ensure texture encoding is
    // correct so colors appear as intended. GLTF base color (albedo) textures
    // must be interpreted in sRGB color space; other maps (normal, metalness,
    // roughness) must remain linear.
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const applyEncoding = (tex: any) => {
          if (!tex) return;
          // Some three versions use sRGBEncoding constant; set it when present.
          try {
            if ('encoding' in tex && 'sRGBEncoding' in THREE) tex.encoding = (THREE as any).sRGBEncoding;
            // Mark for update
            tex.needsUpdate = true;
          } catch (e) {
            // ignore if encoding isn't supported in this runtime
          }
        };

        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat: any) => {
          if (!mat) return;
          // base color / albedo
          applyEncoding(mat.map);
          // emissive map (if present)
          applyEncoding(mat.emissiveMap);
          // don't change normal/metalness/roughness encodings (keep linear)

          // small sensible defaults if missing
          if ('metalness' in mat && mat.metalness == null) mat.metalness = 0.0;
          if ('roughness' in mat && mat.roughness == null) mat.roughness = 1.0;

          mat.needsUpdate = true;
        });
      }
    });

    // Debug info to help troubleshoot visibility issues in the browser console.
    // Open the devtools console and look for "ShoeModel bbox" when the model loads.
    // If it's still not visible, the numbers here will help adjust camera/lighting.
    // eslint-disable-next-line no-console
    console.debug('ShoeModel bbox', { center, size, maxDim, scale });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} castShadow receiveShadow />
    </group>
  );
};

export default ShoeModel;
