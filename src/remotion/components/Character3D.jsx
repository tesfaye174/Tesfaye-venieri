import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './Character3D.css';

/**
 * Componente 3D basato su Three.js
 * Carica il modello Blender esportato in glTF
 * Supporta animazioni e interazioni
 */
const Character3D = ({
  x = 0,
  y = 0,
  scale = 1,
  emotion = 'neutral',
  gesture = 'idle',
  opacity = 1,
  showLaptop = false
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 1.5, 2.5);
    camera.lookAt(0, 1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp'
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load('/assets/models/character.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(0, -0.5, 0);

      // Setup shadows
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      scene.add(model);
      modelRef.current = model;
    });

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate based on gesture
      if (modelRef.current) {
        switch (gesture) {
          case 'wave':
            modelRef.current.rotation.y = Math.sin(Date.now() * 0.002) * 0.3;
            break;
          case 'typing':
            modelRef.current.rotation.x = Math.sin(Date.now() * 0.003) * 0.1;
            break;
          case 'celebrate':
            modelRef.current.position.y = -0.5 + Math.sin(Date.now() * 0.005) * 0.3;
            modelRef.current.rotation.z = Math.sin(Date.now() * 0.003) * 0.2;
            break;
          case 'pointing':
            modelRef.current.rotation.y = Math.sin(Date.now() * 0.002) * 0.2;
            break;
          default:
            modelRef.current.rotation.y += 0.005;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gesture]);

  return (
    <div
      ref={containerRef}
      className="character-3d-wrapper"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transition: 'all 0.3s ease-out'
      }}
    />
  );
};

export default Character3D;
