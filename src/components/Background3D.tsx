import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Background3DProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
}

export default function Background3D({ scrollProgress, activeSection }: Background3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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
    scene.fog = new THREE.FogExp2(0xffffff, 0.015);

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

    // Create custom particle texture (feathered circular overlay)
    const createParticleTexture = () => {
      const size = 32;
      const particleCanvas = document.createElement("canvas");
      particleCanvas.width = size;
      particleCanvas.height = size;
      const ctx = particleCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2,
          size / 2,
          0,
          size / 2,
          size / 2,
          size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.85)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(particleCanvas);
    };

    const particleTexture = createParticleTexture();

    // Interactive burst particle engine group
    const burstGroup = new THREE.Group();
    scene.add(burstGroup);

    interface BurstSystem {
      points: THREE.Points;
      positions: Float32Array;
      velocities: Float32Array;
      age: number;
      maxAge: number;
    }
    const activeBursts: BurstSystem[] = [];

    const spawnHitExplosion = (targetX: number, targetY: number, targetZ: number) => {
      const burstCount = 80;
      const burstPositions = new Float32Array(burstCount * 3);
      const burstColors = new Float32Array(burstCount * 3);
      const velocities = new Float32Array(burstCount * 3);

      const colorPalette = [
        new THREE.Color(0xf43f5e), // vibrant rose
        new THREE.Color(0x6366f1), // indigo/violet
        new THREE.Color(0x0ea5e9), // sky blue
        new THREE.Color(0xeab308), // warm core gold
        new THREE.Color(0x10b981), // emerald
      ];

      for (let i = 0; i < burstCount; i++) {
        burstPositions[i * 3] = targetX;
        burstPositions[i * 3 + 1] = targetY;
        burstPositions[i * 3 + 2] = targetZ;

        // Physical vectors outwards
        const angle = Math.random() * Math.PI * 2;
        const verticalAngle = Math.acos(Math.random() * 2 - 1);
        const speed = 3.0 + Math.random() * 7.0;

        velocities[i * 3] = Math.sin(verticalAngle) * Math.cos(angle) * speed;
        velocities[i * 3 + 1] = Math.sin(verticalAngle) * Math.sin(angle) * speed;
        velocities[i * 3 + 2] = Math.cos(verticalAngle) * speed;

        const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        burstColors[i * 3] = col.r;
        burstColors[i * 3 + 1] = col.g;
        burstColors[i * 3 + 2] = col.b;
      }

      const bGeometry = new THREE.BufferGeometry();
      bGeometry.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));
      bGeometry.setAttribute("color", new THREE.BufferAttribute(burstColors, 3));

      const bMaterial = new THREE.PointsMaterial({
        size: 0.45,
        sizeAttenuation: true,
        map: particleTexture,
        transparent: true,
        opacity: 1.0,
        vertexColors: true,
        depthWrite: false,
      });

      const bPoints = new THREE.Points(bGeometry, bMaterial);
      burstGroup.add(bPoints);

      activeBursts.push({
        points: bPoints,
        positions: burstPositions,
        velocities,
        age: 0,
        maxAge: 35,
      });
    };

    // Event handlers
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coords (-1 to 1)
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (event: MouseEvent) => {
      // Precise frustum rendering projection coordinate mapping at camera depth
      const aspect = width / height;
      const vFOV = (camera.fov * Math.PI) / 180;
      const planeHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const planeWidth = planeHeight * aspect;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      const targetX = mouseX * (planeWidth / 2);
      const targetY = mouseY * (planeHeight / 2);

      spawnHitExplosion(targetX, targetY, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

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
    let elapsedTime = 0;
    let previousTime = performance.now() * 0.001;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now() * 0.001;
      const deltaTime = currentTime - previousTime;
      previousTime = currentTime;
      elapsedTime += deltaTime;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update active explosions
      for (let b = activeBursts.length - 1; b >= 0; b--) {
        const burst = activeBursts[b];
        burst.age++;

        if (burst.age >= burst.maxAge) {
          burstGroup.remove(burst.points);
          burst.points.geometry.dispose();
          if (Array.isArray(burst.points.material)) {
            burst.points.material.forEach((m) => m.dispose());
          } else {
            burst.points.material.dispose();
          }
          activeBursts.splice(b, 1);
        } else {
          // Add velocity displacement to spark coordinates
          const bPos = burst.points.geometry.attributes.position as THREE.BufferAttribute;
          const bPosArray = bPos.array as Float32Array;
          const burstSize = bPosArray.length / 3;

          for (let k = 0; k < burstSize; k++) {
            bPosArray[k * 3] += burst.velocities[k * 3] * 0.016;
            bPosArray[k * 3 + 1] += burst.velocities[k * 3 + 1] * 0.016;
            bPosArray[k * 3 + 2] += burst.velocities[k * 3 + 2] * 0.016;

            // Apply air resistance drag
            burst.velocities[k * 3] *= 0.95;
            burst.velocities[k * 3 + 1] *= 0.95;
            burst.velocities[k * 3 + 2] *= 0.95;
          }
          bPos.needsUpdate = true;

          // Fade out over lifecycle
          const currentMat = burst.points.material as THREE.PointsMaterial;
          currentMat.opacity = Math.max(0, 1.0 * (1.0 - burst.age / burst.maxAge));
        }
      }

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      resizeObserver.disconnect();
      particleTexture.dispose();
      renderer.dispose();
      // Dispose remaining explosions
      activeBursts.forEach((b) => {
        burstGroup.remove(b.points);
        b.points.geometry.dispose();
        if (Array.isArray(b.points.material)) {
          b.points.material.forEach((m) => m.dispose());
        } else {
          b.points.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-white/10"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
