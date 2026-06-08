import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function InteractiveTitle3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currMouse = useRef({ x: 0, y: 0 });
  const [fontsReady, setFontsReady] = useState(false);

  // Monitor font loading to guarantee pristine rendering
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsReady(true);
      });
    } else {
      const timer = setTimeout(() => setFontsReady(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 5, 8);
    scene.add(dirLight);

    // Smooth hover spotlight
    const mouseLight = new THREE.PointLight(0xf43f5e, 1.8, 12); // subtle rose spot
    scene.add(mouseLight);

    // Texture Generator helper
    const makeTextTexture = (text: string, font: string, color: string, width: number = 1024, height: number = 256) => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = width;
      texCanvas.height = height;
      const ctx = texCanvas.getContext("2d");
      if (ctx) {
        // Clear background
        ctx.clearRect(0, 0, width, height);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.fillText(text, width / 2, height / 2);
      }
      const texture = new THREE.CanvasTexture(texCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };

    // Initialize textures
    let ayushEnglishTexture = makeTextTexture("AYUSH", "900 220px 'Inter', sans-serif", "#000000");
    let ayushHindiTexture = makeTextTexture("आयुष", "900 220px 'Inter', sans-serif", "#000000");
    let uttamTexture = makeTextTexture("Uttam", "italic 300 200px 'Playfair Display', serif", "rgba(0, 0, 0, 0.85)");

    // Build planes for stereoscopic layered 3D
    // Width 9.5, height 2.4 units in 3D space
    const planeGeo = new THREE.PlaneGeometry(9.5, 2.4);

    const ayushMat = new THREE.MeshPhongMaterial({
      map: ayushEnglishTexture,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
      specular: 0x333333,
      shininess: 40,
    });

    const uttamMat = new THREE.MeshPhongMaterial({
      map: uttamTexture,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      specular: 0x222222,
      shininess: 30,
    });

    const ayushPlane = new THREE.Mesh(planeGeo, ayushMat);
    const uttamPlane = new THREE.Mesh(planeGeo, uttamMat);

    // Add them to a parenting group to handle coordinate scale resizing together easily
    const textGroup = new THREE.Group();
    textGroup.add(ayushPlane);
    textGroup.add(uttamPlane);
    scene.add(textGroup);

    // Dynamic responsive sizing calculations to guarantee optimal fitting
    const adjustScale = () => {
      const aspect = width / height;
      const vFOV = (camera.fov * Math.PI) / 180;
      const frustumHeight = 2 * Math.tan(vFOV / 2) * camera.position.z; // ~8.28 at z=10
      const frustumWidth = frustumHeight * aspect;

      // We want to fit 9.5 units width and around 4.8 units height in the viewport with a perfect padding safety margin
      const scaleX = (frustumWidth * 0.95) / 9.5;
      const scaleY = (frustumHeight * 0.85) / 4.8;

      const finalScale = Math.min(scaleX, scaleY, 1.4); // maximum scale multiplier bound
      textGroup.scale.set(finalScale, finalScale, finalScale);
    };
    adjustScale();

    // Spawn hit visual sparks locally inside the 3D text container
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 45;
    const sparkPositions = new Float32Array(particleCount * 3);
    const sparkVelocities = new Float32Array(particleCount * 3);
    const sparkColors = new Float32Array(particleCount * 3);

    const sparkPalette = [
      new THREE.Color(0xf43f5e), // rose
      new THREE.Color(0x6366f1), // violet
      new THREE.Color(0xeab308), // golden
      new THREE.Color(0x10b981), // emerald
    ];

    // Offscreen initialization for inactive sparks
    for (let i = 0; i < particleCount; i++) {
      sparkPositions[i * 3] = 999;
      sparkPositions[i * 3 + 1] = 999;
      sparkPositions[i * 3 + 2] = 0;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(sparkColors, 3));

    // Particle texture
    const makeSparkTexture = () => {
      const sc = document.createElement("canvas");
      sc.width = 16;
      sc.height = 16;
      const sCtx = sc.getContext("2d");
      if (sCtx) {
        const rad = sCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        rad.addColorStop(0, "rgba(255, 255, 255, 1)");
        rad.addColorStop(0.4, "rgba(255, 255, 255, 0.7)");
        rad.addColorStop(1, "rgba(255, 255, 255, 0)");
        sCtx.fillStyle = rad;
        sCtx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(sc);
    };

    const sparkMat = new THREE.PointsMaterial({
      size: 0.35,
      map: makeSparkTexture(),
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const sparkSystem = new THREE.Points(particleGeo, sparkMat);
    scene.add(sparkSystem);

    interface LocalSparkState {
      index: number;
      age: number;
      maxAge: number;
    }
    let activeLocalSparks: LocalSparkState[] = [];

    const triggerLocalClickSparks = (targetX: number, targetY: number) => {
      const positionAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const colorAttr = particleGeo.attributes.color as THREE.BufferAttribute;

      // Select next slot segment of sparks to trigger
      const countToSpawn = 15;
      for (let s = 0; s < countToSpawn; s++) {
        // Recycle oldest or randomly assign
        const index = Math.floor(Math.random() * particleCount);

        // Put coordinate at click source
        positionAttr.setXYZ(index, targetX, targetY, 0.6);

        // Forceful speed vector outwards
        const forceAngle = Math.random() * Math.PI * 2;
        const forceSpeed = 2 + Math.random() * 5.5;
        sparkVelocities[index * 3] = Math.cos(forceAngle) * forceSpeed;
        sparkVelocities[index * 3 + 1] = Math.sin(forceAngle) * forceSpeed;
        sparkVelocities[index * 3 + 2] = (Math.random() - 0.5) * 4;

        // Choose beautiful pastel coloring
        const col = sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
        colorAttr.setXYZ(index, col.r, col.g, col.b);

        // Clean out duplicates
        activeLocalSparks = activeLocalSparks.filter(sp => sp.index !== index);
        activeLocalSparks.push({
          index,
          age: 0,
          maxAge: 30 + Math.floor(Math.random() * 15),
        });
      }

      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    };

    // Listeners
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coords (-1 to 1) over the entire window
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetMouse.current.x = x;
      targetMouse.current.y = y;
    };

    const handleMouseLeave = () => {
      targetMouse.current.x = 0;
      targetMouse.current.y = 0;
    };

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Project into orthographic space equivalent
      const aspect = width / height;
      const vFOV = (camera.fov * Math.PI) / 180;
      const frustumH = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const frustumW = frustumH * aspect;

      const projX = clickX * (frustumW / 2);
      const projY = clickY * (frustumH / 2);

      triggerLocalClickSparks(projX, projY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        adjustScale();
      }
    });
    resizeObserver.observe(container);

    let lastSwitchTime = performance.now() * 0.001;
    let isEnglish = true;
    let fadeOpacity = 1.0;
    let isFading = false;
    let fadePhase: "out" | "in" = "out";

    let animationFrameId: number;

    // Rendering loop
    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      // Smooth mouse coordinate ease
      currMouse.current.x += (targetMouse.current.x - currMouse.current.x) * 0.12;
      currMouse.current.y += (targetMouse.current.y - currMouse.current.y) * 0.12;

      const time = performance.now() * 0.001;

      // Handle smooth text cycling every 5 seconds
      if (!isFading && time - lastSwitchTime > 5.0) {
        isFading = true;
        fadePhase = "out";
      }

      if (isFading) {
        if (fadePhase === "out") {
          fadeOpacity -= 0.04; // smooth fade speed
          if (fadeOpacity <= 0) {
            fadeOpacity = 0;
            fadePhase = "in";
            // Switch texture
            isEnglish = !isEnglish;
            ayushMat.map = isEnglish ? ayushEnglishTexture : ayushHindiTexture;
            ayushMat.needsUpdate = true;
          }
        } else if (fadePhase === "in") {
          fadeOpacity += 0.04;
          if (fadeOpacity >= 1.0) {
            fadeOpacity = 1.0;
            isFading = false;
            lastSwitchTime = time;
          }
        }
        ayushMat.opacity = fadeOpacity;
      }

      // Floating translation
      const floatVal = Math.sin(time * 1.5) * 0.08;

      // Rotate and position individual word planes to produce parallax depth
      ayushPlane.rotation.y = currMouse.current.x * 0.28;
      ayushPlane.rotation.x = -currMouse.current.y * 0.22;
      ayushPlane.position.x = currMouse.current.x * 0.55;
      ayushPlane.position.y = 1.05 + currMouse.current.y * 0.2 + floatVal;
      ayushPlane.position.z = 0.45;

      uttamPlane.rotation.y = currMouse.current.x * 0.18;
      uttamPlane.rotation.x = -currMouse.current.y * 0.14;
      uttamPlane.position.x = currMouse.current.x * 0.25;
      uttamPlane.position.y = -1.05 + currMouse.current.y * 0.1 - floatVal * 0.5;
      uttamPlane.position.z = -0.45;

      // Move the interactive highlight light to reflect specular shine directly on mouse active position
      mouseLight.position.set(currMouse.current.x * 4.5, currMouse.current.y * 2.5, 3.5);

      // Spark particle physics engine
      if (activeLocalSparks.length > 0) {
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;

        for (let j = activeLocalSparks.length - 1; j >= 0; j--) {
          const sp = activeLocalSparks[j];
          sp.age++;

          if (sp.age >= sp.maxAge) {
            // Hide offscreen
            posAttr.setXYZ(sp.index, 999, 999, 0);
            activeLocalSparks.splice(j, 1);
          } else {
            // physics calculation
            posArr[sp.index * 3] += sparkVelocities[sp.index * 3] * 0.016;
            posArr[sp.index * 3 + 1] += sparkVelocities[sp.index * 3 + 1] * 0.016;
            posArr[sp.index * 3 + 2] += sparkVelocities[sp.index * 3 + 2] * 0.016;

            // gravity fall and drag resistance
            sparkVelocities[sp.index * 3] *= 0.94;
            sparkVelocities[sp.index * 3 + 1] *= 0.94;
            sparkVelocities[sp.index * 3 + 1] -= 0.08; // light gravity fall
            sparkVelocities[sp.index * 3 + 2] *= 0.94;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Font changed / loaded listener update
    const refreshTextOnLoad = () => {
      ayushEnglishTexture.dispose();
      ayushHindiTexture.dispose();
      uttamTexture.dispose();

      ayushEnglishTexture = makeTextTexture("AYUSH", "900 220px 'Inter', sans-serif", "#000000");
      ayushHindiTexture = makeTextTexture("आयुष", "900 220px 'Inter', sans-serif", "#000000");
      uttamTexture = makeTextTexture("Uttam", "italic 300 200px 'Playfair Display', serif", "rgba(0, 0, 0, 0.85)");

      ayushMat.map = isEnglish ? ayushEnglishTexture : ayushHindiTexture;
      ayushMat.needsUpdate = true;
      uttamMat.map = uttamTexture;
      uttamMat.needsUpdate = true;
    };

    if (fontsReady) {
      refreshTextOnLoad();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
      resizeObserver.disconnect();
      ayushEnglishTexture.dispose();
      ayushHindiTexture.dispose();
      uttamTexture.dispose();
      ayushMat.dispose();
      uttamMat.dispose();
      planeGeo.dispose();
      particleGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, [fontsReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[480px] xl:h-[500px] select-none overflow-visible cursor-pointer z-30 flex items-center justify-center"
    >
      {/* Embedded CSS Styles for the wavy text background */}
      <style>{`
        @keyframes enterFadeSlide {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 0.65;
            filter: blur(0px);
            transform: translateY(0) scale(1);
          }
        }
        .wavy-text-wrapper {
          opacity: 0;
          animation: enterFadeSlide 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Wavy text layer behind the 3D text canvas */}
      <div className="wavy-text-wrapper absolute left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none select-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
        >
          {/* The visible curved guide path */}
          <path
            id="wavyPath"
            d="M -100,200 C 200,380 400,20 700,200 C 1000,380 1200,20 1500,200 C 1800,380 2000,20 2300,200"
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] fill-slate-500/80"
            dy="-6"
          >
            <textPath href="#wavyPath" startOffset="100%">
              Python — C++ — Java — DSA — OOPs — React — Firestore — JavaScript — IoT — Three.js — TailwindCSS — Vite — TypeScript — Motion — Python — C++ — Java — DSA — OOPs — React — Firestore — JavaScript — IoT — Three.js — TailwindCSS — Vite — TypeScript — Motion — Python — C++ — Java — DSA — OOPs — React — Firestore — JavaScript — IoT — Three.js — TailwindCSS — Vite — TypeScript — Motion
              <animate
                attributeName="startOffset"
                from="100%"
                to="-100%"
                dur="75s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block overflow-visible relative z-10" />
    </div>
  );
}
