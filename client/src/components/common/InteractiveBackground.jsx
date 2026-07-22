import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom Shader Source for Flowing Glowing Lines
const LineShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseStrength: { value: 2.2 },
    uRadius: { value: 4.5 },
    uColorEmerald: { value: new THREE.Color("#10b981") },
    uColorCyan: { value: new THREE.Color("#06b6d4") },
    uColorGlow: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseStrength;
    uniform float uRadius;

    attribute float aLineIndex;
    attribute float aPointIndex;

    varying float vPointIndex;
    varying float vLineIndex;
    varying vec3 vWorldPosition;

    void main() {
      vPointIndex = aPointIndex;
      vLineIndex = aLineIndex;

      // Base layout in 3D: spread lines horizontally and vertically
      // X spans from -16 to 16, Y spans from -8 to 8
      float x = -16.0 + aPointIndex * 32.0;
      float y = -8.0 + (aLineIndex / 80.0) * 16.0;
      
      // Calculate flowing wave shapes dynamically using sine combinations
      float wave1 = sin(x * 0.15 + uTime * 0.4 + aLineIndex * 0.25) * 1.5;
      float wave2 = cos(x * 0.35 - uTime * 0.7 + aLineIndex * 0.15) * 0.6;
      float wave3 = sin(x * 0.05 + uTime * 0.2) * 1.0;
      
      float finalY = y + wave1 + wave2 + wave3;
      float finalZ = cos(x * 0.25 + uTime * 0.5 + aLineIndex * 0.3) * 1.2;

      vec3 pos = vec3(x, finalY, finalZ);

      // Mouse displacement (Bending effect)
      // Project mouse coordinates to match the screen scale
      vec2 mousePos3D = uMouse * vec2(15.0, 9.0);
      float dist = distance(pos.xy, mousePos3D);
      
      if (dist < uRadius) {
        // Falloff curves for smooth spring-like feel
        float force = (1.0 - dist / uRadius);
        force = pow(force, 2.5); // Sharp transition
        vec2 dir = normalize(pos.xy - mousePos3D);
        pos.xy += dir * force * uMouseStrength;
      }

      vWorldPosition = pos;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColorEmerald;
    uniform vec3 uColorCyan;
    uniform vec3 uColorGlow;
    
    varying float vPointIndex;
    varying float vLineIndex;
    varying vec3 vWorldPosition;

    void main() {
      // Create a gradient across the screen (emerald to cyan)
      float mixFactor = (vWorldPosition.x + 16.0) / 32.0;
      mixFactor = clamp(mixFactor, 0.0, 1.0);
      
      // Dynamic shift based on line index
      float lineShift = sin(vLineIndex * 0.1) * 0.2 + 0.5;
      vec3 baseColor = mix(uColorEmerald, uColorCyan, clamp(mixFactor + lineShift - 0.25, 0.0, 1.0));

      // Fade out lines gracefully at the left/right viewport edges
      float edgeFade = sin(vPointIndex * 3.14159265);
      edgeFade = pow(edgeFade, 1.5);

      // Add soft white glow at peak heights
      float glowFactor = abs(sin(vWorldPosition.y * 0.4 + vWorldPosition.x * 0.1)) * 0.2;
      vec3 finalColor = mix(baseColor, uColorGlow, glowFactor);

      gl_FragColor = vec4(finalColor, edgeFade * 0.38);
    }
  `,
};

// Custom Shader Source for Flowing Particles
const ParticleShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMouseStrength: { value: 2.2 },
    uRadius: { value: 4.5 },
    uColorEmerald: { value: new THREE.Color("#10b981") },
    uColorCyan: { value: new THREE.Color("#06b6d4") },
    uColorGlow: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseStrength;
    uniform float uRadius;

    attribute float aLineIndex;
    attribute float aSpeed;
    attribute float aOffset;

    varying float vProgress;
    varying vec3 vWorldPosition;

    void main() {
      // Flow progress along the X axis
      float progress = fract(uTime * aSpeed * 0.05 + aOffset);
      vProgress = progress;

      // Base layout matching lines
      float x = -16.0 + progress * 32.0;
      float y = -8.0 + (aLineIndex / 80.0) * 16.0;

      // Match the exact wave equations of the lines
      float wave1 = sin(x * 0.15 + uTime * 0.4 + aLineIndex * 0.25) * 1.5;
      float wave2 = cos(x * 0.35 - uTime * 0.7 + aLineIndex * 0.15) * 0.6;
      float wave3 = sin(x * 0.05 + uTime * 0.2) * 1.0;
      
      float finalY = y + wave1 + wave2 + wave3;
      float finalZ = cos(x * 0.25 + uTime * 0.5 + aLineIndex * 0.3) * 1.2;

      vec3 pos = vec3(x, finalY, finalZ + 0.1); // Slightly in front

      // Mouse displacement (Bending effect)
      vec2 mousePos3D = uMouse * vec2(15.0, 9.0);
      float dist = distance(pos.xy, mousePos3D);
      
      if (dist < uRadius) {
        float force = (1.0 - dist / uRadius);
        force = pow(force, 2.5);
        vec2 dir = normalize(pos.xy - mousePos3D);
        pos.xy += dir * force * uMouseStrength;
      }

      vWorldPosition = pos;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Responsive sizing (perspective size attenuation)
      gl_PointSize = (12.0 / -mvPosition.z) * (1.2 + sin(uTime * 3.0 + aOffset * 10.0) * 0.3);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorEmerald;
    uniform vec3 uColorCyan;
    uniform vec3 uColorGlow;
    
    varying float vProgress;
    varying vec3 vWorldPosition;

    void main() {
      // Circular smooth particles (anti-aliasing)
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;

      // Color matching based on position
      float mixFactor = (vWorldPosition.x + 16.0) / 32.0;
      mixFactor = clamp(mixFactor, 0.0, 1.0);
      vec3 color = mix(uColorEmerald, uColorCyan, mixFactor);
      
      // Interpolate with white for bright glowing core
      color = mix(color, uColorGlow, 0.4);

      // Fade out particles near borders
      float edgeFade = sin(vProgress * 3.14159265);
      float alpha = smoothstep(0.5, 0.2, dist) * edgeFade * 0.85;

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

// Scene logic wrapper
function AnimationScene({ mouse, isMobile }) {
  const lineMeshRef = useRef(null);
  const particleMeshRef = useRef(null);
  
  // Interpolated mouse target for smooth spring damping
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  // Determine line and particle counts based on mobile flag
  const config = useMemo(() => {
    const numLines = isMobile ? 32 : 75;
    const pointsPerLine = isMobile ? 40 : 65;
    const particleCount = isMobile ? 80 : 250;
    return { numLines, pointsPerLine, particleCount };
  }, [isMobile]);

  // Build buffers for flowing lines
  const lineData = useMemo(() => {
    const { numLines, pointsPerLine } = config;
    const positions = [];
    const lineIndices = [];
    const pointIndices = [];
    const indexArray = [];

    let vertexOffset = 0;
    for (let l = 0; l < numLines; l++) {
      for (let p = 0; p < pointsPerLine; p++) {
        // Mock initial positions (will be fully computed on GPU)
        positions.push(0, 0, 0);
        lineIndices.push(l);
        pointIndices.push(p / (pointsPerLine - 1));

        if (p < pointsPerLine - 1) {
          indexArray.push(vertexOffset + p, vertexOffset + p + 1);
        }
      }
      vertexOffset += pointsPerLine;
    }

    return {
      positions: new Float32Array(positions),
      lineIndices: new Float32Array(lineIndices),
      pointIndices: new Float32Array(pointIndices),
      indices: new Uint32Array(indexArray),
    };
  }, [config]);

  // Build buffers for flowing particles
  const particleData = useMemo(() => {
    const { particleCount, numLines } = config;
    const positions = [];
    const lineIndices = [];
    const speeds = [];
    const offsets = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(0, 0, 0);
      lineIndices.push(Math.floor(Math.random() * numLines));
      speeds.push(0.3 + Math.random() * 0.7);
      offsets.push(Math.random());
    }

    return {
      positions: new Float32Array(positions),
      lineIndices: new Float32Array(lineIndices),
      speeds: new Float32Array(speeds),
      offsets: new Float32Array(offsets),
    };
  }, [config]);

  // Update loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Lerp mouse coordinates for custom spring damping feel
    targetMouse.current.set(mouse.x, mouse.y);
    currentMouse.current.lerp(targetMouse.current, 0.08);

    // Update uniform values in materials
    if (lineMeshRef.current) {
      const uniforms = lineMeshRef.current.material.uniforms;
      uniforms.uTime.value = time;
      uniforms.uMouse.value.copy(currentMouse.current);
    }

    if (particleMeshRef.current) {
      const uniforms = particleMeshRef.current.material.uniforms;
      uniforms.uTime.value = time;
      uniforms.uMouse.value.copy(currentMouse.current);
    }
  });

  return (
    <>
      {/* Wave Lines */}
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aLineIndex"
            args={[lineData.lineIndices, 1]}
          />
          <bufferAttribute
            attach="attributes-aPointIndex"
            args={[lineData.pointIndices, 1]}
          />
          <bufferAttribute
            attach="index"
            args={[lineData.indices, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          args={[LineShaderMaterial]}
        />
      </lineSegments>

      {/* Floating Glowing Particles */}
      <points ref={particleMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aLineIndex"
            args={[particleData.lineIndices, 1]}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            args={[particleData.speeds, 1]}
          />
          <bufferAttribute
            attach="attributes-aOffset"
            args={[particleData.offsets, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          args={[ParticleShaderMaterial]}
        />
      </points>
    </>
  );
}

export function InteractiveBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Track mouse moves relative to viewport center (-1 to 1)
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0d14] z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          pixelRatio: Math.min(window.devicePixelRatio, 2), // Cap device pixel ratio at 2 for performance
        }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <color attach="background" args={["#0a0d14"]} />
        <ambientLight intensity={1.5} />
        <AnimationScene mouse={mouse} isMobile={isMobile} />
      </Canvas>
      {/* Premium dark grid overlay effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Soft gradient vignetting for premium background feel */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,#0a0d14_95%] pointer-events-none" />
    </div>
  );
}

export default InteractiveBackground;
