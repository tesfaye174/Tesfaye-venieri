import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * HeroCanvas - Three.js particle constellation background
 * Features:
 * - 180 golden particles positioned randomly in 3D space
 * - ~80 static line connections between nearby particles
 * - Subtle auto-rotation on Y axis
 * - Mouse parallax via camera position interpolation
 * - Optimized for 60fps performance with throttling
 * - Dynamic import for code splitting
 */
const HeroCanvas = () => {
    const containerRef = useRef(null);
    const particlesRef = useRef(null);
    const linesRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const rafRef = useRef(null);
    const scrollTickingRef = useRef(false);
    const canvasOpacityRef = useRef(1);
    const [webGLSupported, setWebGLSupported] = useState(true);

    const prefersReducedMotion = useCallback(() => 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches, 
        []
    );

    const checkWebGL = useCallback(() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion() || !checkWebGL()) {
            if (!checkWebGL()) {
                setWebGLSupported(false);
            }
            return;
        }

        let THREE;
        let scene, camera, renderer, particles, lines, geometry, material, lineGeometry, lineMaterial;

        const handleMouseMove = (e) => {
            mouseRef.current.targetX = (e.clientX / window.innerWidth) * 60 - 30;
            mouseRef.current.targetY = (e.clientY / window.innerHeight) * 60 - 30;
        };

        const handleScroll = () => {
            if (!scrollTickingRef.current) {
                scrollTickingRef.current = true;
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY || window.pageYOffset;
                    const heroHeight = window.innerHeight;
                    canvasOpacityRef.current = Math.max(0, 1 - scrollY / heroHeight);
                    if (containerRef.current) {
                        containerRef.current.style.opacity = canvasOpacityRef.current;
                    }
                    scrollTickingRef.current = false;
                });
            }
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        const initThree = async () => {
            THREE = await import('three');
            
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 80;
            cameraRef.current = camera;

            renderer = new THREE.WebGLRenderer({ 
                alpha: true, 
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            const particleCount = 180;
            geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 200;
                positions[i + 1] = (Math.random() - 0.5) * 200;
                positions[i + 2] = (Math.random() - 0.5) * 200;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            material = new THREE.PointsMaterial({
                color: 0xc89b3c,
                size: 0.22,
                sizeAttenuation: true,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
            particlesRef.current = particles;

            lineGeometry = new THREE.BufferGeometry();
            const linePositions = [];
            const connectionDistance = 60;

            for (let i = 0; i < particleCount; i++) {
                const x1 = positions[i * 3];
                const y1 = positions[i * 3 + 1];
                const z1 = positions[i * 3 + 2];

                for (let j = i + 1; j < particleCount; j++) {
                    const x2 = positions[j * 3];
                    const y2 = positions[j * 3 + 1];
                    const z2 = positions[j * 3 + 2];

                    const distance = Math.sqrt(
                        (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
                    );

                    if (distance < connectionDistance) {
                        linePositions.push(x1, y1, z1);
                        linePositions.push(x2, y2, z2);
                    }
                }
            }

            lineGeometry.setAttribute(
                'position',
                new THREE.BufferAttribute(new Float32Array(linePositions), 3)
            );

            lineMaterial = new THREE.LineBasicMaterial({
                color: 0xc89b3c,
                transparent: true,
                opacity: 0.06
            });

            lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lines);
            linesRef.current = lines;

            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            window.addEventListener('scroll', handleScroll, { passive: true });

            const animate = () => {
                rafRef.current = requestAnimationFrame(animate);

                if (canvasOpacityRef.current <= 0) return;

                particles.rotation.y += 0.0004;
                lines.rotation.y += 0.0004;

                mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
                mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

                camera.position.x = mouseRef.current.x;
                camera.position.y = mouseRef.current.y;

                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener('resize', handleResize);
        };

        initThree();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            geometry?.dispose();
            material?.dispose();
            lineGeometry?.dispose();
            lineMaterial?.dispose();
            renderer?.dispose();

            if (containerRef.current && renderer?.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [prefersReducedMotion, checkWebGL]);

    if (!webGLSupported) {
        return (
            <div
                ref={containerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default HeroCanvas;
