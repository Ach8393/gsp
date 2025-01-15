import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

const HackerRoom = (props) => {
  const { nodes, materials } = useGLTF('/models/hacker-room.glb');
  
  const monitortxt = useTexture('textures/desk/monitor.png');
  const screenTxt = useTexture('textures/desk/screen.png');

  if (!nodes || !materials) {
    console.error("Failed to load GLTF data or materials.");
    return null; // Prevent rendering if resources are unavailable
  }

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes?.screen_screens_0?.geometry} material={materials?.screens}>
        <meshMatcapMaterial map={screenTxt} />
      </mesh>
      <mesh geometry={nodes?.screen_glass_glass_0?.geometry} material={materials?.glass} />
      <mesh geometry={nodes?.table_table_mat_0_1?.geometry} material={materials?.table_mat} />
      <mesh geometry={nodes?.table_table_mat_0_2?.geometry} material={materials?.computer_mat}>
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      {/* Repeat for other mesh components */}
    </group>
  );
};

useGLTF.preload('/models/hacker-room.glb');
export default HackerRoom;
