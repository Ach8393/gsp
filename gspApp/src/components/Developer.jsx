import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef();

  // Load the GLTF scene lazily
  const { scene } = useGLTF('/models/animations/developer.glb');
  const clone = React.useMemo(() => (scene ? SkeletonUtils.clone(scene) : null), [scene]);
  const { nodes, materials } = useGraph(clone || {});

  // Load animations lazily
  const idleFBX = React.useMemo(() => useFBX('/models/animations/idle.fbx'), []);
  const saluteFBX = React.useMemo(() => useFBX('/models/animations/salute.fbx'), []);
  const clappingFBX = React.useMemo(() => useFBX('/models/animations/clapping.fbx'), []);
  const victoryFBX = React.useMemo(() => useFBX('/models/animations/victory.fbx'), []);

  // Assign names to animations
  useEffect(() => {
    if (idleFBX?.animations?.[0]) idleFBX.animations[0].name = 'idle';
    if (saluteFBX?.animations?.[0]) saluteFBX.animations[0].name = 'salute';
    if (clappingFBX?.animations?.[0]) clappingFBX.animations[0].name = 'clapping';
    if (victoryFBX?.animations?.[0]) victoryFBX.animations[0].name = 'victory';
  }, [idleFBX, saluteFBX, clappingFBX, victoryFBX]);

  // Use animations
  const { actions } = useAnimations(
    [idleFBX.animations?.[0], saluteFBX.animations?.[0], clappingFBX.animations?.[0], victoryFBX.animations?.[0]].filter(Boolean),
    group,
  );

  // Effect to handle animation changes
  useEffect(() => {
    const action = actions?.[animationName];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    } else {
      console.warn(`Animation "${animationName}" not found.`);
    }
  }, [actions, animationName]);

  // Fallback for when the GLTF scene is not loaded
  if (!clone) {
    console.error('Failed to load GLTF scene.');
    return null;
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes?.Hips} />
      {/* Render other skinned meshes */}
      <skinnedMesh
        geometry={nodes?.Wolf3D_Hair?.geometry}
        material={materials?.Wolf3D_Hair}
        skeleton={nodes?.Wolf3D_Hair?.skeleton}
      />
      {/* ... Add other skinned meshes similarly */}
    </group>
  );
};

// Preload GLTF model
useGLTF.preload('/models/animations/developer.glb');

export default Developer;
