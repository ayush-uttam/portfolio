import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Background3DProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
  isDarkMode?: boolean;
}

export default function Background3D({ scrollProgress, activeSection, isDarkMode = false }: Background3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync scrollProgress and activeSection to refs to prevent effect re-triggering on scroll
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x050505 : 0xffffff, 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 24;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Anim loop
    let previousTime = performance.now() * 0.001;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now() * 0.001;
      previousTime = currentTime;

      // Smooth camera depth and positional shifts based on active sections
      let targetCameraX = 0;
      let targetCameraY = 0;
      let targetCameraZ = 24 + scrollProgressRef.current * 6;

      if (activeSectionRef.current === "about") {
        targetCameraX = -5;
      } else if (activeSectionRef.current === "projects") {
        targetCameraX = 6;
      } else if (activeSectionRef.current === "contact") {
        targetCameraY = -3;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-white/10 dark:bg-black/10 transition-colors duration-300"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
