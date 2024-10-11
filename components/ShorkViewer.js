import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function ShorkModel({ url }) {
    const modelRef = useRef();
    const { scene } = useGLTF(url);

    // Animation logic for spinning
    useFrame(() => {
        const mesh = modelRef.current;
        if (mesh) {
            // Rotate the model around the Y axis
            mesh.rotation.y += 0.02;  // Adjust speed as necessary
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

function ShorkSpinAnimation() {
    const modelUrl = '/shork.gltf'; // Ensure the path is correct

    return (
        <Canvas style={{ width: '150px', height: '150px' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ShorkModel url={modelUrl} />
        </Canvas>
    );
}

export default ShorkSpinAnimation;
